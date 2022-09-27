"""Server for virtual pet app."""

from flask import (Flask, render_template, request,
                   flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
import helper
from data_attributes.create_attributes import (FOOD, ACTIVITY)
from random import (choice, sample)
from jinja2 import StrictUndefined
import requests
import os

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
    if session.get("current_user_id"):
        return redirect('/pet')
    else:
        return render_template("index.html")


@app.route('/create-user', methods=['POST'])
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


@app.route('/login', methods=['POST'])
def login():
    """Log user in."""

    user_data = request.json

    # Get username and password from login form
    username = user_data["username"]
    password = user_data["password"]

    valid_account = helper.check_login(username, password)

    return jsonify(valid_account)


@app.route("/logout", methods=["POST"])
def logout():
    """Log user out."""

    current_stats = request.json

    current_energy = current_stats["currentEnergy"]
    current_happiness = current_stats["currentHappiness"]

    crud.update_pet_stats(session["current_user_id"], current_energy, current_happiness)

    session.pop("current_pet", None)
    session.pop("current_user_id", None)
    session.pop("current_username", None)
    msg = "You are now logged out."

    return jsonify(msg)


@app.route('/pet')
def view_pet():
    """Take user to main app page."""

    # Redirect to homepage if user not logged in
    if not session.get("current_user_id"):
        return redirect("/")

    return render_template('pet.html')


@app.route("/user-info")
def get_user_info():
    """Get current user's pet information from database."""

    pet = crud.get_pet(session["current_user_id"])

    # If user has pet, turn Pet object into dict
    if pet:
        pet = pet.convert_to_dict()

    return jsonify(pet)


@app.route("/generate-pet")
def generate_rand_pet():
    """Generate a random pet."""

    pet = helper.generate_pet()

    return jsonify(pet)


@app.route("/adopt-pet", methods=["POST"])
def adopt_pet():
    """Create pet in database and assign to user."""

    pet_data = request.json

    # Add current user ID to pet_data dictionary
    pet_data["user_id"] = session["current_user_id"]

    # Create pet
    crud.create_pet_from_dict(pet_data)

    # Get newly created pet from database
    pet = crud.get_pet(session["current_user_id"])

    # Recreate object as dictionary
    pet = pet.convert_to_dict()

    session["current_pet"] = pet

    return jsonify(pet)


@app.route("/delete-pet")
def delete_user_pet():
    """Delete current user's pet."""

    crud.delete_pet(session["current_user_id"])
    session["current_pet"] = None

    return jsonify("Your pet has been released into the wild.")


@app.route("/get-loc")
def get_user_loc():
    """Use the user's IP address to get information about their location.

    Makes API request to ip-api.com"""

    url = "http://ip-api.com/json/?fields=status,country,regionName,city,zip,lat,lon,timezone,query"
    # Make GET request
    res = requests.get(url)
    # parse JSON
    user_data = res.json()
    print(user_data)

    if user_data["status"] == "fail":
        print("Request failed.")
        # TODO: ADD BEHAVIOR IN CASE OF FAILURE (alert user and use default location)

    return jsonify(user_data)


@app.route("/get-loc-mock")
def mock_get_user_loc():
    """Mock version of get_user_loc() for testing."""

    user_data = {
        "country": "United States",
        "regionName": "California",
        "city": "Oakland",
        "lat": 37.7994978,
        "lon": -122.2613965,
    }

    return jsonify(user_data)


@app.route("/get-weather", methods=["POST"])
def get_current_weather():
    """Get current weather at the pet's location."""

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

    # TODO: Add behavior in case of failure

    return jsonify(current_weather)


@app.route("/get-weather-mock", methods=["POST"])
def mock_get_current_weather():
    """Mock version of get_current_weather() for testing."""

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

    return jsonify(current_weather)


@app.route("/play")
def get_activities():
    """Randomly pick 3 activities and return a dictionary with their associated point value.
    
     check how the activity matches with the pet's preferences, and assigns value accordingly
     """

    activity_list = sample(ACTIVITY, k=3)
    activities = {}

    for activity in activity_list:
        activities[activity] = {}
        if activity == session["current_pet"]["activity_fave"]:
            activities[activity]["value"] = 2
            activities[activity]["response"] = "Wow, that was so much fun! Can we do it again?"
        elif activity == session["current_pet"]["activity_least"]:
            activities[activity]["value"] = -1
            activities[activity]["response"] = "Meh... I didn't really like that..."
        else:
            activities[activity]["value"] = 1
            activities[activity]["response"] = "That was fun!"

    return(activities)

# ------------------------------------ #


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')
