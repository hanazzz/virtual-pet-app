function CurrentPet({ tempInF }) {
  const { petData } = usePetData();

  // Get username from local storage
  const username = localStorage.getItem('username');

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

  const [mood, setMood] = React.useState(`I'm so happy to see you, ${username}!`);

  return (
    // Pet heading and weather
    <div id="current-pet" className="">
      <div className="flex flex-col md:flex-row justify-between">
        <div id="pet-heading" className="md:mr-4">
          <PetHeading />
        </div>
        <WeatherDisplay lat={petData.lat} lon={petData.lon} tempInF={tempInF} />
      </div>

      {/* Main pet information */}
      <div id="pet-main" className="md:grid grid-cols-7 my-6 md:my-12 gap-6">
        {/* Pet stats */}
        <div id="stats" className="md:col-span-2 my-4 flex flex-col justify-evenly items-center">
          <Stat statName="Energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

          <Stat statName="Happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
        </div>

        {/* Pet image and mood display */}
        <div className="md:col-span-3 mx-auto my-0 w-full">
          <div className="mockup-window border bg-base-300">
            <div id="pet-img" className="flex justify-center px-4 py-4 bg-base-200">
              <img
                src={petData.species_img_path ? petData.species_img_path : '/static/images/loading-pet.gif'}
                alt={petData.species_name}
                id="species-img"
              />
            </div>

            <Mood mood={mood} />

          </div>
        </div>

        {/* Interactions and attributes */}
        <div id="interactions" className="md:col-span-2 my-4 flex flex-row md:flex-col items-center justify-between md:justify-evenly">
          <Interaction setStat={setEnergy} stat={energy} setMood={setMood} interactionText="FEED PET" interactionType="feed" />

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
