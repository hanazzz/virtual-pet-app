# BitBuddy: A virtual pet web app
![BitBuddy header](https://user-images.githubusercontent.com/96971685/196337419-431e0df8-c5ee-4bd9-9831-19609d7922f4.png)

Live link: *Coming soon*  
Demo video: *Coming soon*


## Table of Contents
- [Project Description](https://github.com/hanazzz/virtual-pet-app/edit/main/README.md#project-description)
- [Tech Stack](https://github.com/hanazzz/virtual-pet-app/edit/main/README.md#tech-stack)
- [Features](https://github.com/hanazzz/virtual-pet-app/edit/main/README.md#features)
- [Installation](https://github.com/hanazzz/virtual-pet-app/edit/main/README.md#installation)
- [Possible Future Features](https://github.com/hanazzz/virtual-pet-app/edit/main/README.md#possible-future-features)


## Project Description
BitBuddy is a virtual pet app inspired by digital pet games from the early/mid 2000s, but with a modern twist: AI. Users start by generating random pets until they find one they want to adopt. They can then customize their pet by using Craiyon, an AI image generator based on DALL-E, to generate a custom image for their pet. After adopting their new friend, users can play with and feed them. Just like a real pet, their pet’s happiness and energy decrease over time, and they prefer some foods and activities over others. BitBuddy also displays the current weather at their pet’s “location” (with the location coming from the user’s IP address and the weather coming from OpenWeatherMap’s API). 

*Log in page*  
<img src="https://user-images.githubusercontent.com/96971685/196335876-67654d1d-ba9f-424b-bbbe-f7ea72a03d03.png" alt="BitBuddy log in page" width="60%"/>

*Generating a pet from a custom species*  
<img src="https://user-images.githubusercontent.com/96971685/196335888-267b7c10-0c40-44b1-a593-837501bdd4f3.png" alt="Generating a pet with a custom species" width="60%"/>

*Viewing current pet while awaiting custom pet image from Craiyon*  
<img src="https://user-images.githubusercontent.com/96971685/196335902-cc723245-abb9-400d-ab76-7bd856c922a9.png" alt="Current pet display with egg as pet image" width="60%"/>

*Viewing current pet after feeding them their favorite food*
<img src="https://user-images.githubusercontent.com/96971685/196335916-dd4f1842-6d2a-4c83-826a-03147acf02a9.png" alt="Current pet display with pet image from Craiyon and pet response to being fed: 'Hm, grilled corn? Mmm, that was the best thing I've ever had!'" width="60%"/>


## Tech Stack
- Python
- Flask
- Jinja2
- PostgreSQL
- SQLAlchemy
- JavaScript
- React
- HTML
- CSS
- Tailwind CSS
- [Craiyon](https://www.craiyon.com/)

APIs:
- [OpenWeatherMap API](https://openweathermap.org/api)
- [IP API](https://ip-api.com/)
- [Craiyon API](https://github.com/FireHead90544/craiyon.py)


## Features
- Make an account, log in, log out
- Generate a random pet
  - The pet can either be from an existing species or a custom species made by the user.
  - To make a custom species, users select three keywords from the available dropdown menus (adjective, color, animal). These keywords are then used to come up with the species name and are sent to Craiyon to generate a custom pet image.
- Adopt a pet and then view pet
- Get user’s location from their IP address (using IP API) and use that location information as the pet’s “location” (shown on the pet display page) 
- Display current weather for pet's location (can switch between displaying temperature in F or C)
- Rename pet, delete pet, and delete account
- User has an inventory of three food items
  - These are randomly assigned to the user on account creation
  - When one item gets used, it is randomly replaced
- Pet has energy and happiness stats that go down over time
- Feed and play with pet, impacting the pet's energy and happiness, respectively.
  - Pet response to interactions is based on pet's preferences (e.g. favorite/least favorite food)
  - The response includes an impact on the relevant stat level (going up or down) and a "verbal" response (e.g. "Wow, that was so much fun!" or "Yuck, I didn't like that").


## Installation
To run BitBuddy locally on your computer:
1. **Clone repository** to your local computer
2. **Get an API key** for OpenWeatherMap to use their API. Sign up for free [here](https://openweathermap.org/api/).
3. **Store your OWM API key and create a key for the Flask app.** Create a file called secrets.sh in the app directory. Add the code below and replace the text in the quotation marks as described.
```
export FLASK_APP_KEY="ENTER_ANYTHING_HERE"
export OWM_API_KEY="YOUR_API_KEY_HERE"
```
4. **Read the key variables** into your shell
```
$ source secrets.sh
```
5. Create and activate a **virtual environment**
```
$ virtualenv env
$ source env/bin/activate
```
6. Install all **dependencies**
```
$ pip3 install -r requirements.txt
```
7. Create the **database**
```
$ python3 seed_database.py
```
8. Start up the **Flask server**
```
$ python3 server.py
```
9. **Go to localhost:5000 in your browser and have fun with BitBuddy!**


## Possible Future Features
- ***Custom pet species image selection***:
  - Craiyon generates 9 images, but due to time constraints I designed it so that the image “selection” happens server-side (wrote an algorithm that randomly selects 1 of the 9 images).
  - Want to show user all 9 images and let them select one (especially since Craiyon images can be very hit or miss)
- ***Location***: Allow users to enter a custom location
- ***Pet attributes***: Allow users to suggest new attributes
- ***Admin role***: Admin can approve/reject user suggestions
- ***Collect stats on pets & display/visualize them***: For example: how many pets have been made, locations of pets, how many times a user has interacted with their pet, when a user last fed/played with their pet. Some of these stats could be shown to the user, while others could be for admins.
- ***Interactions***: I would style the interaction modals more and add text to make it more engaging. For example, I could have images and descriptions included with the items.
- ***Loading egg/pet***: Display loading egg/pet for users with pets from existing species too (would create a small delay)
- ***User-to-user interaction***: Give each pet a public profile, so users could share their pet links with one another and see each other’s pets. I could also include a way for user’s to interact with each other’s pets (e.g. feed or play with them, have a message board for users to leave messages).
- ***Sharing image of pet***: Allow user to “take a picture” (screenshot) of their pet that they can then share (e.g. on Twitter, Instagram).
