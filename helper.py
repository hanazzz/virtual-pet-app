"""Helper functions."""

from flask import (flash, session)
import crud
from model import db

def check_new_account(email, username, password, password2):
    """Check whether account creationg is valid.
    
    Checks if email is already in use, if username is already in use, and whether both password fields match."""

    valid_account = False

    # Flash error if email already in use
    if crud.get_user_by_email(email) != None:
        flash("ERROR: An account with this email already exists.")

    # Flash error if username already in use
    elif crud.get_user_by_username(username) != None:
        flash("ERROR: An account with this username already exists.")

    # Flash error if passwords don't match
    elif password != password2:
        flash("ERROR: Passwords do not match.")

    # Create account and add to databases
    else:
        user = crud.create_user(username, email, password)
        db.session.add(user)
        db.session.commit()
        valid_account = True
        flash("Your account has successfully been created!")
    
    return valid_account


def log_in_user():
    """Log user in."""

    session["logged_in"] = True
    flash("You are now logged in!")