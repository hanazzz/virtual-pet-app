// Create custom species and adopt pet (custom species pet)
function CustomPetCreator({
  adjective, setAdjective, color, setColor,
  animal, setAnimal, useCustomSpecies,
}) {
  const adjectives = ['sparkly', 'glowing', 'translucent', 'fluffy', 'angelic', 'flying', 'metallic'];
  const colors = ['turquoise', 'black', 'neon yellow', 'chartreuse', 'fluorescent orange', 'hot pink', 'neon purple'];
  const animals = ['dog', 'mouse', 'turtle', 'kitten', 'eagle', 'goldfish', 'leopard'];

  function handleSubmit(evt) {
    evt.preventDefault();
    document.getElementById('name-new-pet').classList.toggle('modal-open');
  }

  return (
    <div className="form-control text-center w-full max-w-xs md:col-span-2">
      <form id="custom-species-form" name="custom-pet" onSubmit={(evt) => handleSubmit(evt)}>
        <Heading3>Make a custom pet species</Heading3>
        <SelectInput
          selectID="pet-adjective"
          labelText="Pick an adjective"
          optionList={adjectives}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={adjective}
          setState={setAdjective}
          isRequired
          isDisabled={!useCustomSpecies}
        />

        <SelectInput
          selectID="pet-color"
          labelText="Pick a color"
          optionList={colors}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={color}
          setState={setColor}
          isRequired
          isDisabled={!useCustomSpecies}
        />

        <SelectInput
          selectID="pet-animal"
          labelText="Pick an animal"
          optionList={animals}
          addlSelectClasses="select-bordered"
          addlLabelClasses="flex-col"
          state={animal}
          setState={setAnimal}
          isRequired
          isDisabled={!useCustomSpecies}
        />

        <input
          type="submit"
          className={`btn btn-secondary btn-lg mt-10 ${!useCustomSpecies ? 'hidden' : null}`}
          value="ADOPT PET"
        />
      </form>
    </div>
  );
}

CustomPetCreator.propTypes = {
  adjective: PropTypes.string.isRequired,
  setAdjective: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired,
  animal: PropTypes.string.isRequired,
  setAnimal: PropTypes.func.isRequired,
  useCustomSpecies: PropTypes.bool.isRequired,
};
