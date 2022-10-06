// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

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

  // TODO: Take screenshot (html2canvas) - Configure this to work correctly
  // function takePic() {
  //   const captureThis = document.getElementById('current-petData');

  //   html2canvas(captureThis).then(canvas => {
  //     document.body.appendChild(canvas)
  //   });

  //   document.querySelector('canvas').classList.add('')
  // }

  return (
    <div id="current-pet" className="grid grid-cols-8">

      <div id="pet-heading" className="col-span-8">
        <PetHeading />
      </div>

      {/* <div id="pet-main" className="col-span-6 grid grid-cols-6"> */}
      <div className="col-span-2 flex flex-col justify-evenly">
        <div id="mood">
          <h5>{mood}</h5>
        </div>
        <WeatherDisplay lat={petData.lat} lon={petData.lon} tempInF={tempInF} />
      </div>

      <div className="col-span-4">
        <img
          src={petData.species_img_path ? petData.species_img_path : '/static/images/loading-pet.gif'}
          alt={petData.species_name}
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
        <AttributesModal />
      </div>
      {/* </div> */}

      <div id="stats" className="col-start-3 col-span-4 flex flex-row justify-between">
        <Stat statName="energy" statInteraction="FEED PET" stat={energy} setStat={setEnergy} />

        <Stat statName="happiness" statInteraction="PLAY WITH PET" stat={happiness} setStat={setHappiness} />
      </div>

      {/* <Button onClick={takePic}>
        Take picture of pet
      </Button> */}

    </div>
  );
}

CurrentPet.propTypes = {
  tempInF: PropTypes.bool.isRequired,
};
