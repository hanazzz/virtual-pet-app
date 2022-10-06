// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Create custom species and adopt pet (custom species pet)

// eslint-disable-next-line no-unused-vars
function CustomPetCreator({ adoptPet }) {
  const adjectives = ['sparkly', 'glowing', 'translucent', 'fluffy', 'angelic', 'flying', 'metallic'];
  const colors = ['turquoise', 'black', 'neon yellow', 'chartreuse', 'fluorescent orange', 'hot pink', 'neon purple'];
  const animals = ['dog', 'mouse', 'turtle', 'kitten', 'eagle', 'goldfish', 'leopard'];
  const [adjective, setAdjective] = React.useState('');
  const [color, setColor] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  // const queryClient = ReactQuery.useQueryClient();
  const { makeCustomImg } = useMakeCustomImg();

  function makeCustomPet(evt) {
    evt.preventDefault();

    const customSpecies = `${adjective} ${animal}`;

    adoptPet(customSpecies, null);

    // TODO: Add way to throw error if adoptPet fails so that rest of function doesn't execute

    console.log('creating custom pet');

    const petPrompt = [adjective, color, animal];

    makeCustomImg(petPrompt);
  }

  return (
    <div className="form-control w-full max-w-xs md:col-span-2">
      <form id="custom-species-form" name="custom-pet" onSubmit={(evt) => makeCustomPet(evt)}>
        <h3>Make a custom pet species!</h3>
        <SelectInput
          selectID="pet-adjective"
          labelText="Pick an adjective"
          optionList={adjectives}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={adjective}
          setState={setAdjective}
        />

        <SelectInput
          selectID="pet-color"
          labelText="Pick a color"
          optionList={colors}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={color}
          setState={setColor}
        />

        <SelectInput
          selectID="pet-animal"
          labelText="Pick an animal"
          optionList={animals}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={animal}
          setState={setAnimal}
        />

        <input type="submit" className="btn" />
      </form>
    </div>
  );
}

CustomPetCreator.propTypes = {
  adoptPet: PropTypes.func.isRequired,
};
