"""Models for virtual pet app (User, Pet, Item, UserItem)."""

from enum import unique
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Create SQLAlchemy object, represents database
db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    email = db.Column(db.String(254), unique=True)
    password = db.Column(db.String)

    # User.pet pulls up a user's pet
    pet = db.relationship("Pet", back_populates="user")

    # User.items pulls up all of a user's items
    items = db.relationship(
        "Item", secondary="users_items", back_populates="users")

    # Display user data
    def __repr__(self):
        return f"<User user_id={self.user_id} || username={self.username}>"


class Pet(db.Model):
    """A pet."""

    __tablename__ = "pets"

    pet_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.user_id'), unique=True)
    species_name = db.Column(db.String)
    name = db.Column(db.String(50))
    country = db.Column(db.String)
    region = db.Column(db.String)
    city = db.Column(db.String)
    lat = db.Column(db.Integer)
    lon = db.Column(db.Integer)
    hunger = db.Column(db.Integer, default=5)
    last_fed = db.Column(db.DateTime, default=datetime.now())
    happiness = db.Column(db.Integer, default=5)
    last_played = db.Column(db.DateTime, default=datetime.now())
    food_fave = db.Column(db.String)
    food_least = db.Column(db.String)
    activity_fave = db.Column(db.String)
    activity_least = db.Column(db.String)
    music_fave = db.Column(db.String)
    music_least = db.Column(db.String)
    weather_fave = db.Column(db.String)
    weather_least = db.Column(db.String)
    personality = db.Column(db.String)
    astro_sign = db.Column(db.String)
    species_img_path = db.Column(db.String)

    # Pet.user pulls up a pet's user
    user = db.relationship("User", back_populates="pet")

    def __repr__(self):
        """Display pet object information."""

        return f"<Pet pet_id={self.pet_id} || name={self.name}>"

    def convert_to_dict(self):
        """Convert database object to dictionary."""

        pet_dict = {
            "name": self.name,
            "species_name": self.species_name,
            "country": self.country,
            "region": self.region,
            "city": self.city,
            "lat": self.lat,
            "lon": self.lon,
            "hunger": self.hunger,
            "last_fed": self.last_fed,
            "happiness": self.happiness,
            "last_played": self.last_played,
            "food_fave": self.food_fave,
            "food_least": self.food_least,
            "activity_fave": self.activity_fave,
            "activity_least": self.activity_least,
            "music_fave": self.music_fave,
            "music_least": self.music_least,
            "weather_fave": self.weather_fave,
            "weather_least": self.weather_least,
            "personality": self.personality,
            "astro_sign": self.astro_sign,
            "species_img_path": self.species_img_path
        }

        return pet_dict


class Item(db.Model):
    """An item"""

    __tablename__ = "items"

    item_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    item_name = db.Column(db.String)
    description = db.Column(db.String)

    # Item.users pulls up all users that have an item
    users = db.relationship(
        "User", secondary="users_items", back_populates="items")

    # Display item data
    def __repr__(self):
        return f"<Item item_id={self.item_id} || item_name={self.item_name}>"


class UserItem(db.Model):
    """A user's specific item."""

    __tablename__ = "users_items"

    user_item_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    item_id = db.Column(db.Integer, db.ForeignKey("items.item_id"))


def connect_to_db(app, db_name="virtualpet"):
    """Connect to database."""

    # Location of database
    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    # Output raw SQL executed by SQLAlchemy
    app.config["SQLALCHEMY_ECHO"] = True
    # what does this line do??
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Connecting db (SQLAlchemy object) with app (Flask object)
    db.app = app
    db.init_app(app)

    print("Connected to db!")


def create_example_data():
    """Create example data and add to database."""

    test_user = User(username="potato", email="pot@ato.com",
                     password="password")

    test_pet = Pet(user_id=1,
                   species_name='cat',
                   name='floof',
                   country="United States",
                   region="California",
                   city="Oakland",
                   lat=37.803372927524414,
                   lon=-122.27166093896454,
                   food_fave="cake",
                   food_least="carrots",
                   activity_fave="Chasing yarn",
                   activity_least="Taking a bath",
                   music_fave="Pop punk",
                   music_least="Classic rock",
                   weather_fave="Warm and sunny",
                   weather_least="Cold and rainy",
                   personality="Shy, clever, kind",
                   astro_sign="Libra",
                   species_img_path="/static/images/prickly-bunny.jpg")

    test_item1 = Item(item_name="omelette",
                      description="Yum, this looks good!")
    test_item2 = Item(item_name="pizza", description="So cheesy!")

    # Add all test data into db
    test_data = [test_user, test_pet, test_item1, test_item2]
    db.session.add_all(test_data)
    db.session.commit()

    # Connect test_user with test_item1 and test_item2
    test_user = User.query.get(1)
    test_items = Item.query.all()

    for item in test_items:
        test_user.items.append(item)
    db.session.commit()


if __name__ == "__main__":
    # get Flask app
    from server import app

    # connect app to db
    connect_to_db(app)
