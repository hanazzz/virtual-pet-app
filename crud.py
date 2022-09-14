"""CRUD operations."""

from model import db, User, Pet, Item, UserItem, connect_to_db
from datetime import datetime


def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    return user


def create_pet(
    user_id,
    species_type,
    name,
    zipcode,
    food_fave,
    food_least,
    activity_fave,
    activity_least,
    music_fave,
    music_least,
    weather_fave,
    weather_least,
    personality,
    astro_sign):
    """Create and return a new pet."""

    pet = Pet(user_id=user_id,
    species_type=species_type,
    name=name,
    zipcode=zipcode,
    food_fave=food_fave,
    food_least=food_least,
    activity_fave=activity_fave,
    activity_least=activity_least,
    music_fave=music_fave,
    music_least=music_least,
    weather_fave=weather_fave,
    weather_least=weather_least,
    personality=personality,
    astro_sign=astro_sign)

    return pet


def create_item(item_name, description):
    """Create and return a new item."""

    item = Item(item_name=item_name, description=description)

    return item


def get_user_by_id(user_id):
    """Retrieve and return an existing user, using their user_id."""

    user = User.query.get(user_id)

    return user


def get_user_by_username(username):
    """Retrieve and return an existing user, using their username. If user doesn't exist, return None."""

    user = User.query.filter_by(username=username).first()

    return user


def get_user_by_email(email):
    """Retrieve and return an existing user, using their email. If user doesn't exist, return None."""

    user = User.query.filter_by(email=email).first()

    return user


def get_pet(user):
    """Retrieve a user's existing pet."""

    pet = user.pet

    return pet

# Retrieve existing item
# Assign an item to a user
# Delete a user?
# Delete a pet?



if __name__ == '__main__':
    from server import app
    connect_to_db(app)