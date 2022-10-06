"""Server for virtual pet app."""

from multiprocessing.dummy import active_children
from flask import (Flask, render_template, request,
                   flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
import helper
from data_attributes.create_attributes import (ACTIVITY)
from random import sample
from jinja2 import StrictUndefined
import requests
import os
from craiyon import Craiyon

# create Flask app
app = Flask(__name__)
# create secret_key (req for session object)
app.secret_key = "lkdhjfasiop89ryweq23809"
# throw error for undefined variables
app.jinja_env.undefined = StrictUndefined


# ------------------------------------ #


@app.route('/')
def show_homepage():
    """Show homepage."""

    # Check if user is logged in. If yes, redirect to pet page.
    if helper.check_for_login():
        return redirect('/user/pet')
    else:
        return render_template("index.html")


@app.route('/user/create', methods=['POST'])
def create_user():
    """Create new user.

    Checks if user with provided email or username already exists."""

    user_data = request.json

    # Get email, username, password from create account form
    username = user_data["username"]
    email = user_data["email"]
    password = user_data["password"]
    password2 = user_data["password2"]

    valid_account = helper.check_new_account(
        email, username, password, password2)

    return jsonify(valid_account)


@app.route('/user/login', methods=['POST'])
def login():
    """Log user in."""

    user_data = request.json

    # Get username and password from login form
    username = user_data["username"]
    password = user_data["password"]

    valid_account = helper.check_login(username, password)

    return jsonify(valid_account)


@app.route("/user/logout", methods=["POST"])
def logout():
    """Log user out."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    # Check if current user has pet. If so, update pet stats in db
    if session["current_pet"]:
        current_stats = request.json

        current_energy = current_stats["currentEnergy"]
        current_happiness = current_stats["currentHappiness"]

        crud.update_pet_stats(session["current_user_id"],
                              current_energy, current_happiness)

    session.pop("current_pet", None)
    session.pop("current_user_id", None)
    session.pop("current_username", None)
    msg = "You are now logged out."

    return jsonify(msg)


@app.route("/user/delete")
def delete_user():
    """Delete current user's account."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    msg = "Your account has been deleted."

    # If user has a pet, delete pet
    if session["current_pet"]:
        crud.delete_pet(session["current_user_id"])
        msg = "Your account has been deleted and your pet has been released into the wild."

    crud.delete_user(session["current_user_id"])
    db.session.commit()

    # Remove all user info from session
    session.pop("current_pet", None)
    session.pop("current_user_id", None)
    session.pop("current_username", None)

    return jsonify(msg)


@app.route('/user/pet')
def view_pet():
    """Take user to main app page."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    return render_template('pet.html')


@app.route("/user/pet/info")
def get_user_info():
    """Get current user's pet information from database."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    pet = session.get("current_pet", None)

    return jsonify(pet)


@app.route("/pet/new")
def generate_rand_pet():
    """Generate a random pet."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    pet = helper.generate_pet()

    return jsonify(pet)


@app.route("/user/pet/new", methods=["POST"])
def adopt_pet():
    """Create pet in database and assign to user."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    pet_data = request.json

    # Add current user ID to pet_data dictionary
    pet_data["user_id"] = session["current_user_id"]

    # Ensure pet species is in title case (Craiyon keywords used for species name are lowercase)
    pet_data["species_name"] = pet_data["species_name"].title()

    # Create pet
    crud.create_pet_from_dict(pet_data)

    # Get newly created pet from database
    pet = crud.get_pet(session["current_user_id"])

    # Recreate object as dictionary
    pet = pet.convert_to_dict()

    session["current_pet"] = pet

    return jsonify(pet)


@app.route("/user/pet/custom", methods=["POST"])
def create_custom_pet():
    """Create a custom pet species."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    # Receive string of keywords
    pet_prompt = request.json
    print(pet_prompt)
    # Append "synthwave high resolution 4k"
    pet_prompt.append("synthwave high resolution 4k")
    print(pet_prompt)
    # Join list items to form a string
    pet_prompt_str = ' '.join(pet_prompt)

    print()
    print(pet_prompt_str)
    print()

    user_id = session["current_user_id"]
    # Pass keywords into generate_craiyon_img()
    helper.generate_craiyon_img(pet_prompt_str, user_id)
    species_img_path = (f"/static/images/custom-pets/{user_id}.jpg")

    print()
    print(species_img_path)
    print()

    # Update pet object in db with new img
    # Get updated pet as dict and update session
    session["current_pet"] = crud.update_pet_attr(user_id, "species_img_path", species_img_path)
    
    # # Return updated pet dict
    # return jsonify(session["current_pet"])

    return "success"


@app.route("/user/pet/rename", methods=["POST"])
def rename_user_pet():
    """Rename current user's pet."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    new_name = request.json

    # Update pet's name in db and update session with new pet name
    session["current_pet"] = crud.update_pet_name(
        session["current_user_id"], new_name)

    # Return updated pet data
    return jsonify(session["current_pet"])


@app.route("/user/pet/delete")
def delete_user_pet():
    """Delete current user's pet."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    crud.delete_pet(session["current_user_id"])
    db.session.commit()
    session["current_pet"] = None

    return jsonify("Your pet has been released into the wild.")


@app.route("/pet/play")
def get_activities():
    """Randomly pick 3 activities and return a dictionary
    with their associated point value and the pet's response.
    """

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    activities = sample(ACTIVITY, k=3)

    results = helper.evaluate_interaction(
        session["current_pet"],
        activities,
        "activity")

    return jsonify(results)


@app.route("/pet/feed")
def get_food():
    """Get user's item inventory and return a dictionary
    with associated point value and pet response for each item.
    """

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    foods = crud.get_user_items(session["current_user_id"])

    results = helper.evaluate_interaction(
        session["current_pet"],
        foods,
        "food")

    return jsonify(results)


@app.route("/user/inventory/update", methods=["POST"])
def update_inventory():
    """Update user's inventory by removing a food item and adding a new one."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    food = request.json
    response = crud.remove_item_from_user(session["current_user_id"], food)

    response = crud.add_item_to_user(session["current_user_id"])

    db.session.commit()

    return "complete"


@app.route("/user/location")
def get_user_loc():
    """Use the user's IP address to get information about their location.

    Makes API request to ip-api.com"""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    url = "http://ip-api.com/json/?fields=status,country,regionName,city,zip,lat,lon,timezone,query"
    # Make GET request
    res = requests.get(url)
    # parse JSON
    user_data = res.json()
    print(user_data)

    # Check for error
    if user_data["status"] == "fail":
        error_msg = user_data["message"]
        print("ERROR: Location API request failed.")
        print("Error message:", error_msg)
        return jsonify(f"Encountered an error retrieving user location. Error message: {error_msg}")

    return jsonify(user_data)


@app.route("/user/location/mock")
def mock_get_user_loc():
    """Mock version of get_user_loc() for testing."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    user_data = {
        "country": "United States",
        "regionName": "California",
        "city": "Oakland",
        "lat": 37.7994978,
        "lon": -122.2613965,
        "status": "success",        # Use "fail" to test failed API call
        "message": "invalid query"      # Test error message
    }

    if user_data["status"] == "fail":
        error_msg = user_data["message"]
        print("ERROR: Location API request failed.")
        print("Error message:", error_msg)
        return jsonify(f"Encountered an error retrieving user location. Error message: {error_msg}")

    return jsonify(user_data)


@app.route("/user/weather", methods=["POST"])
def get_current_weather():
    """Get current weather at the pet's location."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    # Get pet location
    location = request.json
    lat = location["lat"]
    lon = location["lon"]

    # Create OWM key
    OWM_KEY = os.environ["OWM_API_KEY"]

    url = "https://api.openweathermap.org/data/2.5/weather"
    payload = {
        "lat": lat,
        "lon": lon,
        "units": "imperial",
        "appid": OWM_KEY,
    }

    res = requests.get(url, params=payload)

    # Check for error
    if not res:
        print("ERROR: Weather API request failed.")
        print("Response status code:", res.status_code)
        return jsonify(f"Encountered an error retrieving current weather. Status code: {res.status_code}")

    weather_data = res.json()
    weather_data_overview = weather_data["weather"][0]

    temp = round(weather_data["main"]["temp"])
    condition_code = weather_data_overview["id"]
    weather_type = weather_data_overview["main"]
    weather_description = weather_data_overview["description"]
    owm_icon_id = weather_data_overview["icon"]

    current_weather = {
        "tempF": temp,
        "tempC": round(helper.convert_F_to_C(temp)),
        "conditionCode": condition_code,
        "type": weather_type,
        "description": weather_description,
        "owmIconID": owm_icon_id,
    }

    return jsonify(current_weather)


@app.route("/user/weather/mock", methods=["POST"])
def mock_get_current_weather():
    """Mock version of get_current_weather() for testing."""

    # Redirect to homepage if user not logged in
    if not helper.check_for_login():
        return redirect("/")

    temp = 71.83

    current_weather = {
        'tempF': round(temp),
        "tempC": round(helper.convert_F_to_C(temp)),
        'conditionCode': 802,
        'type': 'Clouds',
        'description':
        'scattered clouds',
        'owmIconID': '03d',
    }

    # Test error
    status_code = 200
    print("ERROR: Weather API request failed.")
    print("Response status code:", status_code)
    # return jsonify(f"Encountered an error retrieving current weather. Status code: {status_code}")

    return jsonify(current_weather)


# ------------------------------------ #


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')
