// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

// eslint-disable-next-line no-unused-vars
function CurrentPet({ tempInF }) {
  const { petData } = usePetData();

  // If stat data is in local storage, set as initial  state value.
  // If not, use initialStat passed through as prop (data retrieved from db at user log in).
  const energyInStorage = JSON.parse(localStorage.getItem('energy'));
  const [energy, setEnergy] = React.useState(
    Number.isInteger(energyInStorage) ? energyInStorage : petData.energy,
  );

  const happinessInStorage = JSON.parse(localStorage.getItem('happiness'));
  const [happiness, setHappiness] = React.useState(
    Number.isInteger(happinessInStorage) ? happinessInStorage : petData.happiness,
  );

  const [mood, setMood] = React.useState("I'm so happy to see you!");

  // const { error, isLoading, isSuccess } = useMakeCustomImg();

  console.log('*** Existing petData data, rendering CurrentPet ***');

  return (
    <div id="current-pet" className="">
      <div className="flex flex-col md:flex-row justify-between">
        <div id="pet-heading" className="">
          <PetHeading />
        </div>
        <WeatherDisplay lat={petData.lat} lon={petData.lon} tempInF={tempInF} />
      </div>

      <div id="pet-main" className="md:grid grid-cols-7 my-12 gap-6">
        <div className="col-span-2 flex flex-col justify-evenly">
          <Mood mood={mood} />
        </div>

        <div className="col-span-3 mx-auto my-0">
          <div className="mockup-window border bg-base-300">
            <div className="flex justify-center px-4 py-4 bg-base-200">
              <img
                src={petData.species_img_path ? petData.species_img_path : '/static/images/loading-pet.gif'}
                alt={petData.species_name}
                id="species-img"
              />
            </div>
          </div>
        </div>

        {/* Overlay images */}
        {/* <div className="col-span-3 mx-auto my-0" style={{ backgroundImage: 'url(/static/images/tamatest.png)' }}>
          <img
            src='/static/images/tamatest.png'
          />
          <img
            src={petData.species_img_path ? petData.species_img_path : '/static/images/loading-pet.gif'}
            alt={petData.species_name}
            id="species-img"
          />
        </div> */}

        <div id="interactions" className="col-span-2 flex flex-col items-center justify-evenly">
          {/* <Play setHappiness={setHappiness} happiness={happiness} setMood={setMood} /> */}
          <Interaction setStat={setHappiness} stat={happiness} setMood={setMood} interactionText="PLAY WITH PET" interactionType="play" />
          {/* eslint-disable-next-line max-len */}
          <Interaction setStat={setEnergy} stat={energy} setMood={setMood} interactionText="FEED PET" interactionType="feed" />
          {/* <Feed setEnergy={setEnergy} energy={energy} setMood={setMood} /> */}
          <AttributesModal />
        </div>
        <div id="stats" className="col-start-3 col-span-3 grid grid-cols-6">
          <Stat statName="energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

          <Stat statName="happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
        </div>

      </div>
    </div>
  );
}

CurrentPet.propTypes = {
  tempInF: PropTypes.bool.isRequired,
};
