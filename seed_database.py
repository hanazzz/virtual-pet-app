"""Script to seed database."""

import os
import crud
import model
import server

os.system("dropdb virtualpet")
os.system("createdb virtualpet")

model.connect_to_db(server.app)
model.db.create_all()

items_in_db = []

# Create items from items.txt
with open("data/items.txt") as f:
    for line in f:
        line = line.rstrip()
        item = line.split(", ")
        item_name, item_description = item

        # Create item
        db_item = crud.create_item(item_name, item_description)

        # Add to list
        items_in_db.append(db_item)

# Add all items to db
model.db.session.add_all(items_in_db)
model.db.session.commit()

