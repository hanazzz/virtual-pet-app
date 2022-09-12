"""Server for virtual pet app."""

from flask import (Flask, render_template, request, flash, session, redirect)

from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined

# create Flask app
app = Flask(__name__)
# create secret_key (req for session object)
app.secret_key = "lkdhjfasiop89ryweq23809"
# throw error for undefined variables
app.jinja_env.undefined = StrictUndefined


# ROUTES AND VIEW FUNCTIONS GO HERE
@app.route('/')
def show_homepage():
    """Show homepage."""


if __name__ == "__main__":
    # connect app to db
    connect_to_db(app)
    # run app
    app.run(debug=True, host='0.0.0.0')