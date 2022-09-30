// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function CurrentPet({ pet, setPetData }) {
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

  return (
    <div id="current-pet" className="grid grid-cols-8">

      <div id="pet-heading" className="col-span-8">
        <PetHeading pet={pet} />
      </div>

      {/* <div id="pet-main" className="col-span-6 grid grid-cols-6"> */}
      <div className="col-span-2 flex flex-col justify-evenly">
        <div id="mood">
          <h5>{mood}</h5>
        </div>
        <WeatherDisplay lat={pet.lat} lon={pet.lon} />
      </div>

      <div className="col-span-4">
        <img
          src={pet.species_img_path}
          alt={pet.species_name}
          id="species-img"
        />
      </div>

      <div id="interactions" className="col-span-2 flex flex-col items-center justify-evenly">
        {/* <Play setHappiness={setHappiness} happiness={happiness} setMood={setMood} /> */}
        <Interaction setStat={setHappiness} stat={happiness} setMood={setMood} interactionText="PLAY WITH PET" interactionType="play" />
        <br />
        <br />
        {/* eslint-disable-next-line max-len */}
        <Interaction setStat={setEnergy} stat={energy} setMood={setMood} interactionText="FEED PET" interactionType="feed" />
        {/* <Feed setEnergy={setEnergy} energy={energy} setMood={setMood} /> */}
        <br />
        <br />
        <Attributes pet={pet} />
      </div>
      {/* </div> */}

      <div id="stats" className="col-start-3 col-span-4 flex flex-row justify-between">
        <Stat statName="energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

        <Stat statName="happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
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
