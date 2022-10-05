/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function PetGenerator({ setPetData }) {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();

  const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  // alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  let displayNewPet = null;

  if (newPetData) {
    displayNewPet = (
      <>
        <h2 className="md:col-span-2">Potential Pet</h2>
        <div>
          <img
            src={!useCustomSpecies ? newPetData.species_img_path : 'https://via.placeholder.com/256x256.png?text=Your+custom+pet+here!'}
            alt={!useCustomSpecies ? newPetData.species_name : 'Your custom pete here!'}
            id="species-img"
            className="col"
          />
        </div>
        <PetAttributes pet={newPetData} speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'} />
        <SpeciesToggle useCustomSpecies={useCustomSpecies} setUseCustomSpecies={setUseCustomSpecies} />
        <CustomPetCreator />
        <div className="col-span-1">
          <AdoptPetBtn
            newPetData={newPetData}
            setNewPetData={setNewPetData}
            setPetData={setPetData}
          />
        </div>
        <div>
          <br />
          <br />
          <br />
          <p>Worker Test</p>
          <WorkerTest />
          <br />
          <br />
          <br />
        </div>
      </>
    );
  }

  return (
    <div id="pet-generator" className="grid md:grid-cols-2">
      <h1 className="md:col-span-2">Adopt a Pet</h1>
      <div className="md:col-span-2">
        {/* eslint-disable-next-line react/no-unescaped-entities, max-len */}
        <p>Adopt a pet to call your own! Just click the "GENERATE PET" button until you find a pet that you like. Once you're ready, go ahead and adopt them!</p>
        <p>TODO: ADD INSTRUCTIONS. Can either generate pet from existing species or create custom species.</p>
        <p>Break down into step? Generate pet attributes. Pick from existing pet species (?) or pick keywords to create own. Name and adopt pet.</p>
      </div>
      <div>
        <GeneratePetBtn setNewPetData={setNewPetData} />
      </div>
      {displayNewPet}
    </div>
  );
}

PetGenerator.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
