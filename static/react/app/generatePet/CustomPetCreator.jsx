// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

// Create custom species and adopt pet (custom species pet)

// eslint-disable-next-line no-unused-vars
function CustomPetCreator({ adjective, setAdjective, color, setColor, animal, setAnimal }) {
  const adjectives = ['sparkly', 'glowing', 'translucent', 'fluffy', 'angelic', 'flying', 'metallic'];
  const colors = ['turquoise', 'black', 'neon yellow', 'chartreuse', 'fluorescent orange', 'hot pink', 'neon purple'];
  const animals = ['dog', 'mouse', 'turtle', 'kitten', 'eagle', 'goldfish', 'leopard'];

  return (
    <div className="form-control w-full max-w-xs md:col-span-2">
      <form id="custom-species-form" name="custom-pet">
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

        {/* <input type="submit" className="btn" /> */}
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
};
