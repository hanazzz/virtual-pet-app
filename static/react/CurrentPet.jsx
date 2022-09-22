/* global React PropTypes WeatherDisplay PetDisplay */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function CurrentPet(props) {
  const { pet } = props;
  const { setPetData } = props;
  CurrentPet.propTypes = {
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      species_name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
      // hunger: PropTypes.number.isRequired,
      // last_fed:  PropTypes.??.isRequired,
      // happiness: PropTypes.number.isRequired,
      // last_played:  PropTypes.??.isRequired,
      food_fave: PropTypes.string.isRequired,
      food_least: PropTypes.string.isRequired,
      activity_fave: PropTypes.string.isRequired,
      activity_least: PropTypes.string.isRequired,
      music_fave: PropTypes.string.isRequired,
      music_least: PropTypes.string.isRequired,
      weather_fave: PropTypes.string.isRequired,
      weather_least: PropTypes.string.isRequired,
      personality: PropTypes.string.isRequired,
      astro_sign: PropTypes.string.isRequired,
      species_img_path: PropTypes.string.isRequired,
    }).isRequired,
    setPetData: PropTypes.func.isRequired,
  };

  console.log('Existing pet data, rendering CurrentPet');

  function deletePet() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete your pet? This action is irreversible.')) {
      fetch('/delete-pet')
        .then((response) => response.json())
        .then((msg) => {
          console.log('deleting pet');
          alert(msg);
          setPetData(null);
        })
        .catch((error) => alert(error.toString()));
    } else {
      alert('Your pet has not been deleted.');
    }
  }

  return (
    <div>
      <h1>Your Pet</h1>

      <h2>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {pet.name} the {pet.personality} {pet.species_name}
      </h2>

      <h3 id="location">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {pet.city}, {pet.region}, {pet.country}
      </h3>

      <WeatherDisplay lat={pet.lat} lon={pet.lon} />

      <PetDisplay pet={pet} />

      <button type="button" id="delete-pet" onClick={deletePet}>DELETE PET</button>
    </div>
  );
}
