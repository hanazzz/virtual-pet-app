"""CRUD operations."""

from model import db, User, Pet, Item, UserItem, connect_to_db


# CREATE
def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    return user


def create_pet(
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
        species_img_path):
    """Create and return a new pet."""

    pet = Pet(user_id=user_id,
              species_name=species_name,
              name=name,
              country=country,
              region=region,
              city=city,
              lat=lat,
              lon=lon,
              food_fave=food_fave,
              food_least=food_least,
              activity_fave=activity_fave,
              activity_least=activity_least,
              music_fave=music_fave,
              music_least=music_least,
              weather_fave=weather_fave,
              weather_least=weather_least,
              personality=personality,
              astro_sign=astro_sign,
              species_img_path=species_img_path)

    db.session.add(pet)
    db.session.commit()

    return pet


def create_pet_from_dict(pet_dict):
    """Create and return a new pet, using a dictionary."""

    pet = Pet(user_id=pet_dict["user_id"],
              species_name=pet_dict["species_name"],
              name=pet_dict["name"],
              country=pet_dict["country"],
              region=pet_dict["region"],
              city=pet_dict["city"],
              lat=pet_dict["lat"],
              lon=pet_dict["lon"],
              food_fave=pet_dict["food_fave"],
              food_least=pet_dict["food_least"],
              activity_fave=pet_dict["activity_fave"],
              activity_least=pet_dict["activity_least"],
              music_fave=pet_dict["music_fave"],
              music_least=pet_dict["music_least"],
              weather_fave=pet_dict["weather_fave"],
              weather_least=pet_dict["weather_least"],
              personality=pet_dict["personality"],
              astro_sign=pet_dict["astro_sign"],
              species_img_path=pet_dict["species_img_path"])

    db.session.add(pet)
    db.session.commit()

    return pet


def create_item(item_name, description):
    """Create and return a new item."""

    item = Item(item_name=item_name, description=description)

    return item


# RETRIEVE
def get_user_by_id(user_id):
    """Retrieve and return an existing user, using their user_id.

     Returns None if user doesn't exist."""

    user = User.query.get(user_id)

    return user


def get_user_by_username(username):
    """Retrieve and return an existing user, using their username.

    Returns None if user doesn't exist."""

    user = User.query.filter_by(username=username).first()

    return user


def get_user_by_email(email):
    """Retrieve and return an existing user, using their email.

    Returns None if user doesn't exist."""

    user = User.query.filter_by(email=email).first()

    return user


def get_pet(user_id):
    """Retrieve a user's existing pet by user_id.

    Returns None if user doesn't have pet."""

    pet = Pet.query.filter_by(user_id=user_id).first()

    return pet


def get_item(item_name):
    """Retrieve an item by its name."""

    item = Item.query.filter_by(item_name=item_name).one()

    return item


def get_user_items(user_id):
    """Retrieve all of a user's items."""

    items = get_user_by_id(user_id).items
    print()
    print()

    print(items)
    print()
    print()
    

    return items


# UPDATE
def update_pet_stats(user_id, current_energy, current_happiness):
    """Update current pet's energy and happiness stats.
    
    Arguments:
    - user_id (int): Current user's user ID
    - current_energy (int): Current user's pet's energy
    - current_happiness (int): Current user's pet's happiness
    """

    pet = get_pet(user_id)

    pet.energy = current_energy
    pet.happiness = current_happiness

    db.session.commit()


def add_item_to_user(user_id, item_name):
    """Connect an item to a user.

    Arguments:
    - user_id (int):
    - item_name (str):
    """

    user = get_user_by_id(user_id)
    item = get_item(item_name)

    user.items.append(item)
    # db.session.commit()


# DELETE
def delete_pet(user_id):
    """Delete a user's existing pet."""

    pet = get_pet(user_id)

    db.session.delete(pet)
    db.session.commit()

# Retrieve existing item
# Assign an item to a user
# Delete a user? (Would have to delete pet, then user)


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
