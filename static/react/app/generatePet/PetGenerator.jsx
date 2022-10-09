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

  // alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  const displayNewPet = !newPetData
    ? null
    : <PotentialPet newPetData={newPetData} setNewPetData={setNewPetData} />;

  return (
    <div id="pet-generator" className="grid md:grid-cols-2">
      <Heading1 addlClasses="md:col-span-2">Adopt a Pet</Heading1>
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
