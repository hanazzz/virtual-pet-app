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


# ROUTES AND VIEW FUNCTIONS GO HERE
@app.route('/')
def show_homepage():
    """Show homepage."""

    return render_template('homepage.html')


@app.route('/create-user', methods=['POST'])
def create_user():
    """Create new user.
    
    Checks if user with provided email or username already exists."""

    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")

    # Flash error if email already in use
    if crud.get_user_by_email(email) != None:
        flash("ERROR: An account with this email already exists.")
        return redirect('/')

    # Flash error if username already in use
    if crud.get_user_by_username(username) != None:
        flash("ERROR: An account with this username already exists.")
        return redirect('/')

    # Create account
    else:
        crud.create_user(username, email, password)
        flash("Your account has successfully been created! You may now log in.")
        return redirect('/')


@app.route('/login')
def login():
    """Log user in."""

    email = request.form.get("email")
    username = request.form.get("username")

    return redirect('/pet')


@app.route('/pet')
def view_pet():
    """Show user their pet."""

    return render_template('pet.html')


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')