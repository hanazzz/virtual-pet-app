"""CRUD operations."""

from model import db, User, Pet, Item, UserItem, connect_to_db
from random import choice, sample


# ------ CREATE ------ #
## USER: Create
def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, email=email, password=password)

    return user


def create_user_inventory(user):
    """Create user's initial inventory (3 random items from database).

    Argument:
    - user (obj): User to create inventory for (database object)

    Return:
    - user_items (lst): List of user's items (as database objects)
    """

    # Get all available items in db
    all_items = Item.query.all()

    # Randomly choose 3 items
    items = sample(all_items, k=3)

    # Add each item to user
    for item in items:
        user.items.append(item)

    return user.items


## PET: Create
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


## ITEM: Create
def create_item(item_name, description):
    """Create and return a new item."""

    item = Item(item_name=item_name, description=description)

    return item


# ------ RETRIEVE ------ #
## USER: Retrieve
def get_user_by_id(user_id):
    """Retrieve and return an existing user, using their user_id.

     Returns None if user doesn't exist.

    Arguments:
    - user_id (int): A user ID to search by

    Returns:
    - user (obj or None): Either user database object if user exists or None if not
     """

    user = User.query.get(user_id)

    return user


def get_user_by_username(username):
    """Retrieve and return an existing user, using their username.

    Returns None if user doesn't exist.

    Arguments:
    - username (str): A username to search by

    Returns:
    - user (obj or None): Either user database object if user exists or None if not
    """

    user = User.query.filter_by(username=username).first()

    return user


def get_user_by_email(email):
    """Retrieve and return an existing user, using their email.

    Returns None if user doesn't exist.

    Arguments:
    - email (str): An email to search by

    Returns:
    - user (obj or None): Either user database object if user exists or None if not
    """

    user = User.query.filter_by(email=email).first()

    return user


## PET: Retrieve
def get_pet(user_id):
    """Retrieve a user's existing pet by user_id.

    Returns None if user doesn't have pet.
    """

    pet = Pet.query.filter_by(user_id=user_id).first()

    return pet


## ITEM: Retrieve
def get_item(item_name):
    """Retrieve an item by its name."""

    item = Item.query.filter_by(item_name=item_name).one()

    return item


def get_user_items(user_id, return_str=True):
    """Retrieve all of a user's items and return as list of item names.

    Arguments:
    - user_id (int): Current user's user ID
    - return_str (bool): Whether to return a list of item names as string (True) or a list of item database objects (False). Default is True.

    Returns:
    - items_lst (list): List of items (either as database objects or strings of item names)
    """

    items_db = get_user_by_id(user_id).items

    if return_str:
        items_lst = []
        for item in items_db:
            items_lst.append(item.item_name)
    else:
        items_lst = items_db

    return items_lst


# ------ UPDATE ------ #
## USER: Update
# none


## PET: Update
def update_pet_stats(user_id, current_energy, current_happiness):
    """Update current pet's energy and happiness stats.

    Arguments:
    - user_id (int): Current user's user ID
    - current_energy (int): Current user's pet's energy
    - current_happiness (int): Current user's pet's happiness

    Returns:
    None
    """

    pet = get_pet(user_id)

    pet.energy = current_energy
    pet.happiness = current_happiness

    db.session.commit()

# TODO: Fold into following, more abstracted function
def update_pet_name(user_id, new_name):
    """Rename the current user's pet.

    Arguments:
    - pet (dict): Dictionary of pet attributes
    - name (str): New name for pet

    Returns:
    - pet_dict (dict): Updated dictionary of pet attributes
    """

    pet = get_pet(user_id)

    pet.name = new_name
    db.session.commit()

    # Get updated pet dictionary from db
    pet_dict = pet.convert_to_dict()

    # Return updated dictionary
    return pet_dict


def update_pet_attr(user_id, attr, new_value):
    """Update an attribute for the current user's pet.

    Arguments:
    - pet (dict): Dictionary of pet attributes
    - attr (str): Attribute to update
    - new_value (str): New value for attribute

    Returns:
    - pet_dict (dict): Updated dictionary of pet attributes
    """

    pet = get_pet(user_id)

    print()
    print(attr)
    print(new_value)
    print("old attr", getattr(pet, attr))

    setattr(pet, attr, new_value)
    db.session.commit()

    print("new attr", getattr(pet, attr))
    print()

    # Get updated pet dictionary from db
    pet_dict = pet.convert_to_dict()

    # Return update dictionary
    return pet_dict


## ITEM: Update
def add_item_to_user(user_id, item_name=None):
    """Connect an item to a user. If no item provided, randomly select one.

    Arguments:
    - user_id (int):
    - item_name (str):

    Returns:
    - "error": User already has 3 or more items. No item was added.
    - "success": New item successfully added
    """

    # Check to make sure user doesn't have more than 3 items
    if len(get_user_items(user_id)) >= 3:
        return "error"

    # If no item name provided, randomly select one
    # QUESTION: Is this the best way to get a random item?
    if not item_name:
        # Get all items in database, cast as set
        items_set = set(Item.query.all())
        # Get all items in user's inventory, cast as set
        user_items_set = set(get_user_items(user_id, False))

        # Get available items by removing items already in user's inventory
        available_items = items_set - user_items_set

        item = choice(list(available_items))
    else:
        item = get_item(item_name)

    user = get_user_by_id(user_id)

    user.items.append(item)

    return "success"


def remove_item_from_user(user_id, item_name):
    """Remove an item from a user.

    Arguments:
    - user_id (int): Current user's user ID
    - item_name (str): Name of item to remove

    Returns:
    - "success" (str)
    """

    user = get_user_by_id(user_id)
    item = get_item(item_name)

    user.items.remove(item)

    return "success"


# ------ DELETE ------ #
## USER: Delete
def delete_user(user_id):
    """Delete current user and their pet."""

    # Delete user's pet
    delete_pet(user_id)

    # Get user from db
    user = get_user_by_id(user_id)

    # Delete user
    db.session.delete(user)


## PET: Delete
def delete_pet(user_id):
    """Delete a user's existing pet."""

    # Get pet from db
    pet = get_pet(user_id)

    # Delete pet
    db.session.delete(pet)

## ITEM: Delete
# none


# ------------------------------------ #


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
