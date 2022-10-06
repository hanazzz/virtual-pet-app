/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Generate a new pet to adopt

// eslint-disable-next-line no-unused-vars
function PetGenerator() {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();

  // const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  // alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  const displayNewPet = !newPetData
    ? null
    : <PotentialPet newPetData={newPetData} setNewPetData={setNewPetData} />;

  // let displayNewPet = null;

  // if (newPetData) {
  //   displayNewPet = (
  //     <>
  //       <h2 className="md:col-span-2">Potential Pet</h2>
  //       <div>
  //         <img
  //           src={!useCustomSpecies ? newPetData.species_img_path : 'https://via.placeholder.com/256x256.png?text=Your+custom+pet+here!'}
  //           alt={!useCustomSpecies ? newPetData.species_name : 'Your custom pet here!'}
  //           id="species-img"
  //           className="col"
  //         />
  //       </div>
  //       <PetAttributes newPetData={newPetData} speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'} />
  //       <SpeciesToggle useCustomSpecies={useCustomSpecies} setUseCustomSpecies={setUseCustomSpecies} />
  //       {/* <CustomPetCreator
  //         newPetData={newPetData}
  //         setNewPetData={setNewPetData}
  //       />
  //       <div className="col-span-1">
  //         <AdoptPetBtn
  //           newPetData={newPetData}
  //           setNewPetData={setNewPetData}
  //         />
  //       </div> */}
  //       <AdoptPet
  //         useCustomSpecies={useCustomSpecies}
  //         newPetData={newPetData}
  //         setNewPetData={setNewPetData}
  //       />
  //     </>
  //   );
  // }

  return (
    <div id="pet-generator" className="grid md:grid-cols-2">
      <h1 className="md:col-span-2">Adopt a Pet</h1>
      <div className="md:col-span-2">
        {/* eslint-disable-next-line react/no-unescaped-entities, max-len */}
        <p>Adopt a pet to call your own! Just click the "GENERATE PET" button until you find a pet that you like. Once you're ready, go ahead and adopt them!</p>
        <p>TODO: ADD INSTRUCTIONS. Can either generate pet from existing species or create custom species. Explain Craiyon / wait time.</p>
        <p>Break down into step? Generate pet attributes. Pick from existing pet species (?) or pick keywords to create own. Name and adopt pet.</p>
      </div>
      <div>
        <GeneratePetBtn setNewPetData={setNewPetData} />
      </div>
      {displayNewPet}
    </div>
  );
}

// PetGenerator.propTypes = {
//   adoptPet: PropTypes.func.isRequired,
// newPetData: PropTypes.shape({
//   species_name: PropTypes.string.isRequired,
//   food_fave: PropTypes.string.isRequired,
//   food_least: PropTypes.string.isRequired,
//   activity_fave: PropTypes.string.isRequired,
//   activity_least: PropTypes.string.isRequired,
//   music_fave: PropTypes.string.isRequired,
//   music_least: PropTypes.string.isRequired,
//   weather_fave: PropTypes.string.isRequired,
//   weather_least: PropTypes.string.isRequired,
//   personality: PropTypes.string.isRequired,
//   astro_sign: PropTypes.string.isRequired,
//   species_img_path: PropTypes.string.isRequired,
// }).isRequired,
// setNewPetData: PropTypes.func.isRequired,
// };
