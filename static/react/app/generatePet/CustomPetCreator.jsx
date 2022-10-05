// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function CustomPetCreator() {
  const adjectives = ['sparkly', 'glowing', 'translucent'];
  const colors = ['turquoise', 'black', 'neon yellow'];
  const animals = ['dog', 'mouse', 'turtle'];
  const [adjective, setAdjective] = React.useState('');
  const [color, setColor] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  const {makeCustomImg} = useMakeCustomImg();

  function makeCustomPet(evt) {
    evt.preventDefault();

    console.log('creating custom pet');

    const petPrompt = [adjective, color, animal];

    makeCustomImg(petPrompt);
    // console.log(petPrompt);
    // fetch('/user/pet/custom', {
    //   method: 'POST',
    //   body: JSON.stringify(petPrompt),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }

  return (
    <div className="form-control w-full max-w-xs md:col-span-2">
      <form id="custom-species-form" className="hidden" name="custom-pet" onSubmit={(evt) => makeCustomPet(evt)}>
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
