// eslint-disable-next-line no-unused-vars
function CurrentPet({ tempInF }) {
  const { petData } = usePetData();

  // If stat data is in local storage, set as initial  state value.
  // If not, use initialStat passed through as prop (data retrieved from db at user log in).
  const energyInStorage = JSON.parse(localStorage.getItem('Energy'));
  const [energy, setEnergy] = React.useState(
    Number.isInteger(energyInStorage) ? energyInStorage : petData.energy,
  );

  const happinessInStorage = JSON.parse(localStorage.getItem('Happiness'));
  const [happiness, setHappiness] = React.useState(
    Number.isInteger(happinessInStorage) ? happinessInStorage : petData.happiness,
  );

  const [mood, setMood] = React.useState("I'm so happy to see you!");

  return (
    <div id="current-pet" className="">
      <div className="flex flex-col md:flex-row justify-between">
        <div id="pet-heading" className="md:mr-4">
          <PetHeading />
        </div>
        <WeatherDisplay lat={petData.lat} lon={petData.lon} tempInF={tempInF} />
      </div>

      <div id="pet-main" className="md:grid grid-cols-7 my-6 md:my-12 gap-6">
        <div id="stats" className="md:col-span-2 my-4 flex flex-col justify-evenly items-center">
          {/* <Mood mood={mood} /> */}
          <Stat statName="Energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

          <Stat statName="Happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
        </div>

        <div className="md:col-span-3 mx-auto my-0 w-full">
          <div className="mockup-window border bg-base-300">
            <div id="pet-img" className="flex justify-center px-4 py-4 bg-base-200">
              <img
                src={petData.species_img_path ? petData.species_img_path : '/static/images/loading-pet.gif'}
                alt={petData.species_name}
                id="species-img"
                // className="rounded-2xl"
              />
            </div>

            <Mood mood={mood} />

          </div>
        </div>

        {/* Overlay images */}
        {/* <div
              className="col-span-3 mx-auto my-0"
              style={{ backgroundImage: 'url(/static/images/pet-test-frame.png)' }}
            >
          <img
            src='/static/images/pet-test-frame.png'
          />
          <img
            src={petData.species_img_path
              ? petData.species_img_path
              : '/static/images/loading-pet.gif'}
            alt={petData.species_name}
            id="species-img"
          />
        </div> */}

        <div id="interactions" className="md:col-span-2 my-4 flex flex-col items-center justify-evenly">
          <Interaction setStat={setEnergy} stat={energy} setMood={setMood} interactionText="FEED PET" interactionType="feed" />
          {/* <Feed setEnergy={setEnergy} energy={energy} setMood={setMood} /> */}

          {/* <Play setHappiness={setHappiness} happiness={happiness} setMood={setMood} /> */}
          <Interaction setStat={setHappiness} stat={happiness} setMood={setMood} interactionText="PLAY WITH PET" interactionType="play" />

          <AttributesModal />
        </div>

      </div>
    </div>
  );
}

CurrentPet.propTypes = {
  tempInF: PropTypes.bool.isRequired,
};
