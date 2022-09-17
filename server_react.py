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

    # If account creation is valid
    if valid_account["status"]:
        # Get newly created User object from db
        user = crud.get_user_by_username(username)
        helper_react.log_in_user(user)
        valid_account["user_id"] = user.user_id

    return jsonify(valid_account)


@app.route('/login', methods=['POST'])
def login():
    """Log user in."""

    user_data = request.json

    username = user_data["username"]
    password = user_data["password"]

    # Get user object by username
    user = crud.get_user_by_username(username)

    # Validate username
    valid_account = {"status" : False, "msg" : ""}
    if not user:
        valid_account["msg"] = "No accounts found with that username. Please try again."

    # Validate password
    elif user.password != password:
        valid_account["msg"] = "That username and password don't match. Please try again."
    else:
        helper_react.log_in_user(user)
        valid_account["status"] = True
        valid_account["msg"] = "You are now logged in!"
        valid_account["user_id"] = user.user_id

    return jsonify(valid_account)


@app.route("/logout")
def logout():
    """Log user out."""

    session.pop("current_user_id", None)
    flash("You are now logged out.")

    return redirect("/")


@app.route('/pet')
def view_pet():
    """Show user their pet."""

    # Redirect to homepage if user not logged in
    if not session.get("current_user_id"):
        return redirect("/")

    # Check whether user has pet
    else:
        # Get pet of current user
        pet = crud.get_pet(session["current_user_id"])
        # If user doesn't have a pet, redirect to create pet page.
        if not pet:
            flash("Looks like you don't have a pet yet! Let's fix that.")
            return redirect("/create-pet")

    return render_template('pet.html', pet=pet)


@app.route("/create-pet")
def new_pet():
    """Show user pet generator."""

    # Redirect to homepage if user not logged in
    if not session.get("current_user_id"):
        return redirect("/")
    # Redirect to pet page if user has existing pet
    elif crud.get_pet(session["current_user_id"]):
        return redirect("/pet")
    
    return render_template("pet-generator.html")


@app.route("/generate-pet")
def generate_rand_pet():
    """Generate a random pet."""

    pet = helper_react.generate_pet()

    return jsonify(pet)


@app.route("/adopt-pet", methods=["POST"])
def adopt_pet():
    """Create pet in database and assign to user."""

    pet_data = request.json

    species_name = pet_data["Pet species"]
    food_fave = pet_data["Favorite food"]
    food_least = pet_data["Least favorite food"]
    activity_fave = pet_data["Favorite activity"]
    activity_least = pet_data["Least favorite activity"]
    music_fave = pet_data["Favorite music genre"]
    music_least = pet_data["Least favorite music genre"]
    weather_fave = pet_data["Favorite weather"]
    weather_least = pet_data["Least favorite weather"]
    personality = pet_data["Personality"]
    astro_sign = pet_data["Astrological sign"]
    species_img_path = pet_data["Species img path"]
    name = pet_data["Name"]
    country = pet_data["Country"]
    region = pet_data["Region"]
    city = pet_data["City"]
    lat = pet_data["lat"]
    lon = pet_data["lon"]
    user_id = session["current_user_id"]

    # Create pet
    crud.create_pet(
    user_id,
    species_name,
    name,
    country,
    region,
    city,
    lat,
    lon,
    food_fave,
    food_least,
    activity_fave,
    activity_least,
    music_fave,
    music_least,
    weather_fave,
    weather_least,
    personality,
    astro_sign,
    species_img_path)

    return jsonify(f"Congratulations on bringing home your new pet, {name} the {personality} {species_name}!")


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

    return jsonify(user_data)


@app.route("/react-test")
def load_react():
    """Load React test page."""

    return render_template("index.html")


# ------------------------------------ #


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')