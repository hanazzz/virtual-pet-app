"""Server for virtual pet app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
import helper_react
from jinja2 import StrictUndefined
import requests

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

    valid_account = helper_react.check_new_account(email, username, password, password2)

    return jsonify(valid_account)


@app.route('/login', methods=['POST'])
def login():
    """Log user in."""

    user_data = request.json

    # Get username and password from login form
    username = user_data["username"]
    password = user_data["password"]

    valid_account = helper_react.check_login(username, password)

    return jsonify(valid_account)


@app.route("/logout")
def logout():
    """Log user out."""

    session.pop("current_user_id", None)
    session.pop("current_username", None)
    flash("You are now logged out.")

    return redirect("/")


@app.route('/pet')
def view_pet():
    """Take user to main app page."""

    # Redirect to homepage if user not logged in
    if not session.get("current_user_id"):
        return redirect("/")

    return render_template('pet-react.html')


@app.route("/user-info")
def get_user_info():
    """Get current user's pet information from database."""

    pet = crud.get_pet(session["current_user_id"])
    
    # If user has pet, turn Pet object into dict
    if pet:
        pet = {
            "name" : pet.name,
            "species_name" : pet.species_name,
            "country" : pet.country,
            "region" : pet.region,
            "city" : pet.city,
            "lat" : pet.lat,
            "lon" : pet.lon,
            "food_fave" : pet.food_fave,
            "food_least" : pet.food_least,
            "activity_fave" : pet.activity_fave,
            "activity_least" : pet.activity_least,
            "music_fave" : pet.music_fave,
            "music_least" : pet.music_least,
            "weather_fave" : pet.weather_fave,
            "weather_least" : pet.weather_least,
            "personality" : pet.personality,
            "astro_sign" : pet.astro_sign,
            "species_img_path" : pet.species_img_path,
        }

    return jsonify(pet)


@app.route("/generate-pet")
def generate_rand_pet():
    """Generate a random pet."""

    pet = helper_react.generate_pet()

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

    # return jsonify(f"Congratulations on bringing home your new pet, {name} the {personality} {species_name}!")
    return jsonify(pet)


@app.route("/delete-pet")
def delete_user_pet():
    """Delete current user's pet."""

    crud.delete_pet(session["current_user_id"])

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
        "country" : "United States",
        "regionName" : "California",
        "city" : "Oakland",
        "lat" : 37.7994978,
        "lon" : -122.2613965,
    }

    return jsonify(user_data)



# ------------------------------------ #


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')