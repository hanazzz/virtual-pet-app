// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function CustomPetCreator() {
  const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  const adjectives = ['sparkly', 'glowing', 'translucent'];
  const colors = ['turquoise', 'black', 'neon yellow'];
  const animals = ['dog', 'mouse', 'turtle'];
  const [adjective, setAdjective] = React.useState('');
  const [color, setColor] = React.useState('');
  const [animal, setAnimal] = React.useState('');

  console.log(useCustomSpecies);

  function handleSpeciesChange() {
    setUseCustomSpecies((prevState) => !prevState);
    document.querySelector('#custom-species-form').classList.toggle('invisible');
  }

  function makeCustomPet(evt) {
    evt.preventDefault();

    console.log('creating custom pet');
    const petPrompt = [adjective, color, animal];
    console.log(petPrompt);
    fetch('/user/pet/custom', {
      method: 'POST',
      body: JSON.stringify(petPrompt),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <div>
      <div className="btn-group">
        <input type="radio" name="species-choice" data-title="Use existing pet species" aria-label="Use existing pet species" value="existing" onInput={handleSpeciesChange} className="btn" defaultChecked />
        <input type="radio" name="species-choice" data-title="Create custom pet species" aria-label="Create custom pet species" value="custom" onInput={(evt) => handleSpeciesChange(evt)} className="btn" />
      </div>

      <div id="custom-species-form" className="invisible form-control w-full max-w-xs">
        <form name="custom-pet" onSubmit={(evt) => makeCustomPet(evt)}>
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
    </div>
  );
}
