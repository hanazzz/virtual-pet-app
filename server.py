"""Server for virtual pet app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
import helper
from jinja2 import StrictUndefined

# create Flask app
app = Flask(__name__)
# create secret_key (req for session object)
app.secret_key = "lkdhjfasiop89ryweq23809"
# throw error for undefined variables
app.jinja_env.undefined = StrictUndefined



@app.route('/')
def show_homepage():
    """Show homepage."""

    # Check if user is logged in. If yes, redirect to pet page.
    if session.get("logged_in"):
        return redirect('/pet')
    else:
        return render_template('homepage.html')


@app.route('/create-user', methods=['POST'])
def create_user():
    """Create new user.
    
    Checks if user with provided email or username already exists."""

    # Get email, username, password from create account form
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    password2 = request.form.get("password2")

    valid_account = helper.check_new_account(email, username, password, password2)

    if not valid_account:
        return redirect('/')
    else:
        helper.log_in_user()
        return redirect('/pet')


@app.route('/login', methods=['POST'])
def login():
    """Log user in."""

    # Get username and password from login form
    username = request.form.get("username")
    password = request.form.get("password")

    # Get user object by username
    user = crud.get_user_by_username(username)

    # Validate username
    if not user:
        flash("No accounts found with that username. Please try again.")
        return redirect('/')

    # Validate password
    if user.password != password:
        flash("That username and password don't match. Please try again.")
        return redirect('/')
    else:
        helper.log_in_user()
        return redirect('/pet')


@app.route('/pet')
def view_pet():
    """Show user their pet."""

    # Redirect to homepage if user not logged in
    if not session.get("logged_in"):
        return redirect("/")

    return render_template('pet.html')


@app.route("/create-pet")
def new_pet():
    """Show user pet generator."""

    characteristics = ["Pet species", "Img path", "Favorite food", "Least favorite food", "Favorite activity", "Least favorite activity", "Favorite music genre", "Least favorite music genre", "Favorite weather", "Least favorite weather", "Personality", "Astrological sign"]

    return render_template("pet-generator.html", characteristics=characteristics)


@app.route("/generate-pet")
def generate_rand_pet():
    """Generate a random pet."""

    pet = helper.generate_pet()
    print(pet)

    return jsonify(pet)


@app.route("/adopt-pet", methods=["POST"])
def adopt_pet():
    """Create pet in database and assign to user."""

    pet_data = request.json.get("Astrological sign")

    print(pet_data)

    return pet_data

if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')