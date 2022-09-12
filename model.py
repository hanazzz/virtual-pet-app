"""MOdels for virtual pet app."""

from flask_sqlalchemy import SQLAlchemy

# db object, represents database
db = SQLAlchemy()

def connect_to_db(app, db_name):
    """Connect to database."""

    app.config["SQLSLCHEMY_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)