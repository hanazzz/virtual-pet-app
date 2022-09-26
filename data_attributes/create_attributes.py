"""Create lists of pet attributes from text files."""


def make_list(file_path, list_name):
    """Create list of pet attributes from file.

    Arguments:
    - file_path (str): Path to txt file of attributes
    - list_name (lst): List to which to add attributes

    Return:
    - list_name (lst): List of attributes
    """

    list_name = []

    with open(file_path) as f:
        for line in f:
            line = line.rstrip()
            list_name.append(line)

    return list_name


SPECIES = {
    "sparkle-wolf": ["Sparkle Wolf", "/static/images/sparkle-wolf.jpg"],
    "prickly-bunny": ["Prickly Bunny", "/static/images/prickly-bunny.jpg"],
    "invisi-cat": ["Invisible Cat", "/static/images/invisi-cat.jpg"],
    "jelly-dolphin": ["Jelly Dolphin", "/static/images/jelly-dolphin.jpg"]
}

SPECIES_ID = list(SPECIES.keys())

FOOD = make_list("data_attributes/food.txt", "FOOD")

ACTIVITY = make_list("data_attributes/activities.txt", "ACTIVITY")

MUSIC_GENRE = make_list("data_attributes/music_genres.txt", "MUSIC_GENRES")

WEATHER = make_list("data_attributes/weather.txt", "WEATHER")

PERSONALITY = make_list("data_attributes/personality.txt", "PERSONALITY")

ASTROLOGICAL_SIGN = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]
