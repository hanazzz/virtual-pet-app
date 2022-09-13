"""CRUD operations."""

from model import db, User, Pet, Item, UserItem, connect_to_db
from datetime import datetime


def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    return user


def create_pet(user_id, species_type, name, zipcode, hunger, last_fed, happiness, last_played):
    """Create and return a new pet."""

    pet = Pet(user_id=user_id,
    species_type=species_type,
    name=name,
    zipcode=zipcode,
    hunger=hunger,
    last_fed=last_fed,
    happiness=happiness,
    last_played=last_played)

    return pet


if __name__ == '__main__':
    from server import app
    connect_to_db(app)