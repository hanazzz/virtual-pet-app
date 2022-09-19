"""Helper functions."""

from flask import (flash, session)
import crud
from model import db
from random import (choice, sample)

# Lists of pet characteristics
SPECIES_ID = ["sparkle-wolf", "prickly-bunny", "invisi-cat"]

SPECIES = {"sparkle-wolf" : ["Sparkle Wolf", "/static/images/sparkle-wolf.jpg"], "prickly-bunny" : ["Prickly Bunny", "/static/images/prickly-bunny.jpg"], "invisi-cat" : ["Invisible Cat", "/static/images/invisi-cat.jpg"]}

FOOD = ["cheddar cheese", "chili sauce", "sweet potatoes", "anchovies", "condensed milk"]

ACTIVITY = ["playing dress up", "soccer", "painting", "cooking", "baking"]

MUSIC_GENRES = ["punk rock", "dance pop", "hip hop"]

WEATHER = ["hot", "warm", "cold"]

PERSONALITY = ["lethal", "clever", "caring", "shy", "bold", "mellow", "poised"]

ASTROLOGICAL_SIGN = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]


def check_new_account(email, username, password, password2):
    """Check whether account creation is valid.
    
    Checks if email is already in use, if username is already in use, and whether both password fields match. If no issues, crerates new user account and logs user in. Paramters come from Create Account form.

    Arguments:
    - email (str): User-provided email
    - username (str): User-provided username
    - password (str): User-provided password
    - password2 (str): User-provided confirmation of password (must match password arg)
    
    Return:
    - valid_account (dict): Information about attempted account creation
        - "status" (bool): Whether account is valid (True) or not (False)
        - "msg" (str): Whether account was successfuly created (and if not, reason for error)
        - "user_id" (int): If account was created, user ID for new account
    """

    valid_account = {"status" : False, "msg" : ""}

    # Flash error if email already in use
    if crud.get_user_by_email(email) != None:
        valid_account["msg"] = "ERROR: An account with this email already exists."

    # Flash error if username already in use
    elif crud.get_user_by_username(username) != None:
        valid_account["msg"] = "ERROR: An account with this username already exists."

    # Flash error if passwords don't match
    elif password != password2:
        valid_account["msg"] = "ERROR: Passwords do not match."

    # Create account and add to databases
    else:
        user = crud.create_user(username, email, password)
        db.session.add(user)
        db.session.commit()
        # Get newly created User object from db
        user = crud.get_user_by_username(username)
        # Log user in
        log_in_user(user)
        valid_account["user_id"] = user.user_id
        valid_account["status"] = True
        valid_account["msg"] = "Your account has successfully been created!"
    
    return valid_account


def check_login(username, password):
    """Check whether account login is valid.
    
    Checks whether user exists in db, whether provided password matches password in db. If no issues, logs user in. Parameters come from Log In form.

    Arguments:
    - username (str): User-provided username
    - password (str): User-provided password

    Return:
    - valid_account (dict): Information about attempted account login
        - "status" (bool): Whether account is valid (True) or not (False)
        - "msg" (str): Whether account was successfuly logged in (and if not, reason for error)
        - "user_id" (int): If account was logged in, user ID for account
    """

    valid_account = {"status" : False, "msg" : ""}

    # Get user object by username
    user = crud.get_user_by_username(username)

    # Validate username
    if not user:
        valid_account["msg"] = "No accounts found with that username. Please try again."

    # Validate password
    elif user.password != password:
        valid_account["msg"] = "That username and password don't match. Please try again."
    else:
        # Log user in
        log_in_user(user)
        valid_account["status"] = True
        valid_account["msg"] = "You are now logged in!"
        valid_account["user_id"] = user.user_id

    return valid_account


def log_in_user(user):
    """Log user in.

    Creates session object with keys to track user ID and username.

    Argument:
    - user (object): User object from database
    """

    session["current_user_id"] = user.user_id
    session["current_username"] = user.username


def generate_pet():
    """Randomly generate a pet.
    
    Returns a dictionary of pet characteristics."""

    species_type = choice(SPECIES_ID)
    species_name = SPECIES[species_type][0]
    species_img_path = SPECIES[species_type][1]
    food_fave_least = sample(FOOD, k=2)
    food_fave = food_fave_least[0]
    food_least = food_fave_least[1]
    activity_fave_least = sample(ACTIVITY, k=2)
    activity_fave = activity_fave_least[0]
    activity_least = activity_fave_least[1]
    music_fave_least = sample(MUSIC_GENRES, k=2)
    music_fave = music_fave_least[0]
    music_least = music_fave_least[1]
    weather_fave_least = sample(WEATHER, k=2)
    weather_fave = weather_fave_least[0]
    weather_least = weather_fave_least[1]
    personality = sample(PERSONALITY, k=3)
    personality = ', '.join(personality)
    astro_sign = choice(ASTROLOGICAL_SIGN)

    pet = {
        "species_name" : species_name,
        "species_img_path" : species_img_path,
        "food_fave" : food_fave,
        "food_least" : food_least,
        "activity_fave" : activity_fave,
        "activity_least" : activity_least,
        "music_fave" : music_fave,
        "music_least" : music_least,
        "weather_fave" : weather_fave,
        "weather_least" : weather_least,
        "personality" : personality,
        "astro_sign" : astro_sign,
    }

    return pet