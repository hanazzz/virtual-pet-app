/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */

// Generate a new pet to adopt

// Generate random pet
function PetGenerator({ addAlert }) {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();

  React.useEffect(() => addAlert("Looks like you don't have a pet yet! Let's fix that.", 'alert-info'), []);

  const displayNewPet = !newPetData
    ? null
    : <PotentialPet newPetData={newPetData} setNewPetData={setNewPetData} addAlert={addAlert} />;

  return (
    <div id="pet-generator" className="lg:grid lg:grid-cols-2">
      <Heading1 addlClasses="lg:col-span-2">[Adopt a Pet]</Heading1>
      <div className="leading-5 pt-4 lg:col-span-2">
        <p>Time to adopt a pet to call your own! Here's what you need to do:</p>
        <ol className="list-decimal list-inside py-4 leading-6 -indent-7 p-11">
          <li>
            <span className="font-bold">Generate pets</span> until you find one you like.
          </li>
          <li>
            <span className="font-bold">Choose species type:</span> your pet can either be from their designated existing species -OR- from a custom species you create.
          </li>
          <li>
            <span className="font-bold">If creating a custom species:</span> select "CREATE CUSTOM SPECIES" and then choose 3 adjectives using the drop down menus
          </li>
          <li>
            <span className="font-bold">Adopt!</span>
          </li>
        </ol>
        <p>Note: After adopting a custom pet, you may initially see an egg instead of the "sparkly black kitten" or "fluffy chartreuse mouse" you were expecting. Don't worry, your pet will hatch from their egg when they're ready!</p>
        <p className="py-4">Pet images are made through Craiyon, an AI image generator, and the process takes a couple minutes. You won't need to wait long (and can still play with your pet in the meantime)!</p>
      </div>
      <div className="text-center mt-4 mb-2 lg:col-span-2">
        <GeneratePetBtn setNewPetData={setNewPetData} />
      </div>
      {displayNewPet}
    </div>
  );
}

PetGenerator.propTypes = {
  addAlert: PropTypes.func.isRequired,
};
