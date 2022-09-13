"""Server for virtual pet app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db, db
import crud
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

    # Flash error if email already in use
    if crud.get_user_by_email(email) != None:
        flash("ERROR: An account with this email already exists.")
        return redirect('/')

    # Flash error if username already in use
    if crud.get_user_by_username(username) != None:
        flash("ERROR: An account with this username already exists.")
        return redirect('/')

    # Flash error if passwords don't match
    if password != password2:
        flash("ERROR: Passwords do not match.")
        return redirect('/')

    # Create account and add to databases
    user = crud.create_user(username, email, password)
    db.session.add(user)
    db.session.commit()

    flash("Your account has successfully been created! You may now log in.")
    return redirect('/')


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
    # If valid password, redirect to pet page
    if user.password == password:
        session["logged_in"] = True
        flash("You are now logged in!")
        return redirect('/pet')
    # If invalid password, redirect to login page
    else:
        flash("That username and password don't match. Please try again.")
        return redirect('/')


@app.route('/pet')
def view_pet():
    """Show user their pet."""

    # Redirect to homepage if user not logged in
    if not session.get("logged_in"):
        return redirect("/")

    return render_template('pet.html')


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')