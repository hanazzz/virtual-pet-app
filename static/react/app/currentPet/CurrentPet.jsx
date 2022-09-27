// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function CurrentPet(props) {
  const { pet } = props;
  const { setPetData } = props;

  // If stat data is in local storage, set as initial  state value.
  // If not, use initialStat passed through as prop (data retrieved from db at user log in).
  const energyInStorage = JSON.parse(localStorage.getItem('energy'));
  const [energy, setEnergy] = React.useState(
    Number.isInteger(energyInStorage) ? energyInStorage : pet.energy,
  );

  const happinessInStorage = JSON.parse(localStorage.getItem('happiness'));
  const [happiness, setHappiness] = React.useState(
    Number.isInteger(happinessInStorage) ? happinessInStorage : pet.happiness,
  );

  const [mood, setMood] = React.useState("I'm so happy to see you!");

  console.log('*** Existing pet data, rendering CurrentPet ***');

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
    <div id="current-pet" className="row">

      <h1 className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {pet.name} the {pet.personality} {pet.species_name}
      </h1>

      <h3 id="location" className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {pet.city}, {pet.region}, {pet.country}
      </h3>

      <div id="pet-main" className="row align-items-center">
        <div className="col d-flex flex-column justify-content-around h-100">
        <WeatherDisplay lat={pet.lat} lon={pet.lon} />
          <div id="mood">
            <h5>{mood}</h5>
          </div>
        </div>

        <div className="col text-center">
          <img
            src={pet.species_img_path}
            alt={pet.species_name}
            id="species-img"
          />
        </div>

        <div id="interactions" className="col text-center">
          {/* <button type="button" onClick={handlePlay}>PLAY with options</button> */}
          {/* <Play setHappiness={setHappiness} happiness={happiness} setMood={setMood} /> */}
          <Interaction setStat={setHappiness} stat={happiness} setMood={setMood} interactionText="PLAY WITH PET" interactionType="play" />
          <br />
          <br />
          {/* <Interaction setStat={setEnergy} stat={energy} setMood={setMood} interactionText="FEED PET" interactionType="feed" /> */}
          <Feed setEnergy={setEnergy} energy={energy} setMood={setMood} />
          <br />
          <br />
          <Attributes pet={pet} />
        </div>
      </div>

      <div id="stats" className="row">
        <Stat statName="energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

        <Stat statName="happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
      </div>

      <br />
      <div className="row">
        <button type="button" id="delete-pet" onClick={deletePet}>DELETE PET</button>
      </div>
    </div>
  );
}

CurrentPet.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    species_name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    energy: PropTypes.number.isRequired,
    // last_fed:  PropTypes.??.isRequired,
    happiness: PropTypes.number.isRequired,
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
