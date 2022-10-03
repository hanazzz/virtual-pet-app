/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function PetGenerator({ setPetData }) {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();

  // alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  let displayNewPet = null;

  if (newPetData) {
    displayNewPet = (
      <>
        <h2 className="col-span-2">Potential Pet</h2>
        <div>
          <img
            src={newPetData.species_img_path}
            alt={newPetData.species_name}
            id="species-img"
            className="col"
          />
        </div>
        <PetAttributes pet={newPetData} />
        <div className="col-span-1">
          <AdoptPetBtn
            newPetData={newPetData}
            setNewPetData={setNewPetData}
            setPetData={setPetData}
          />
        </div>
      </>
    );
  }

  return (
    <div id="pet-generator" className="grid grid-cols-2">
      <h1 className="col-span-2">Adopt a Pet</h1>
      <div className="col-span-2">
        {/* eslint-disable-next-line react/no-unescaped-entities, max-len */}
        <p>Adopt a pet to call your own! Just click the "GENERATE PET" button until you find a pet that you like. Once you're ready, go ahead and adopt them!</p>
        <p>TODO: ADD INSTRUCTIONS. Can either generate pet from existing species or create custom species.</p>
        <p>Break down into step? Generate pet attributes. Pick from existing pet species (?) or pick keywords to create own. Name and adopt pet.</p>
      </div>
      <div>
        <GeneratePetBtn setNewPetData={setNewPetData} />
      </div>
      {displayNewPet}
      <CustomPetCreator />
    </div>
  );
}

PetGenerator.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
