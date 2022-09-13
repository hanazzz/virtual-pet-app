"""Helper functions."""

from flask import (flash, session)
import crud
from model import db
from random import (choice, sample)
import pet_characteristics

def check_new_account(email, username, password, password2):
    """Check whether account creationg is valid.
    
    Checks if email is already in use, if username is already in use, and whether both password fields match. Returns Boolean value indicating whether account is valid."""

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


def generate_pet():
    """Randomly generate a pet.
    
    Returns a dictionary of pet characteristics."""

    species_type = choice(pet_characteristics.SPECIES)
    food_fave_least = sample(pet_characteristics.FOOD, k=2)
    food_fave = food_fave_least[0]
    food_least = food_fave_least[1]
    activity_fave_least = sample(pet_characteristics.ACTIVITY, k=2)
    activity_fave = activity_fave_least[0]
    activity_least = activity_fave_least[1]
    music_fave_least = sample(pet_characteristics.MUSIC_GENRES, k=2)
    music_fave = music_fave_least[0]
    music_least = music_fave_least[1]
    weather_fave_least = sample(pet_characteristics.WEATHER, k=2)
    weather_fave = weather_fave_least[0]
    weather_least = weather_fave_least[1]
    personality = sample(pet_characteristics.PERSONALITY, k=3)
    astro_sign = choice(pet_characteristics.ASTROLOGICAL_SIGN)

    pet = {
        "Pet species" : species_type,
        "Favorite food" : food_fave,
        "Least favorite food" : food_least,
        "Favorite activity" : activity_fave,
        "Least favorite activity" : activity_least,
        "Favorite music genre" : music_fave,
        "Least favorite music genre" : music_least,
        "Favorite weather" : weather_fave,
        "Least favorite weather" : weather_least,
        "Personality" : personality,
        "Astrological sign" : astro_sign
    }

    return pet