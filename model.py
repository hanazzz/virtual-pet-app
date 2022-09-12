"""Models for virtual pet app."""

from flask_sqlalchemy import SQLAlchemy

# Create SQLAlchemy object, represents database
db = SQLAlchemy()


# MODELS GO HERE
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
    items = db.relationship("Item", secondary="users_items", back_populates="users")

    # Display user data
    def __repr__(self):
        return f"<User user_id={self.user_id} || username={self.username}>"


class Pet(db.Model):
    """A pet."""

    __tablename__ = "pets"

    pet_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    species_type = db.Column(db.String)
    name = db.Column(db.String(50))
    zipcode = db.Column(db.String)

    # COMMENTING THESE OUT FOR NOW TO MAKE TESTING EASIER

    # hunger = db.Column(db.Integer)
    # last_fed = db.Column(db.DateTime)
    # happiness = db.Column(db.Integer)
    # last_played = db.Column(db.DateTime)

    # food_fav = db.Column(db.String)
    # food_least = db.Column(db.String)
    # activity_fav = db.Column(db.String)
    # activity_least = db.Column(db.String)
    # music_fave = db.Column(db.String)
    # music_least = db.Column(db.String)
    # weather_fave = db.Column(db.String)
    # weather_least = db.Column(db.String)
    # personality = db.Column(db.String)
    # astro_sign = db.Column(db.String)

    # Pet.user pulls up a pet's user
    user = db.relationship("User", back_populates="pet")

    # Display pet data
    def __repr__(self):
        return f"<Pet pet_id={self.pet_id} || name={self.name}>"


class Item(db.Model):
    """An item"""

    __tablename__ = "items"

    item_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    item_name = db.Column(db.String)
    description = db.Column(db.String)

    # Item.users pulls up all users that have an item
    users = db.relationship("User", secondary="users_items", back_populates="items")

    # Display item data
    def __repr__(self):
        return f"<Item item_id={self.item_id} || item_name={self.item_name}>"


class UserItem(db.Model):
    """A user's specific item."""
    
    __tablename__ = "users_items"

    user_item_id =  db.Column(db.Integer, autoincrement=True, primary_key=True)
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


if __name__ == "__main__":
    # get Flask app
    from server import app

    # connect app to db
    connect_to_db(app)