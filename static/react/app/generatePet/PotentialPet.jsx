// Display information for potential pet

// eslint-disable-next-line no-unused-vars
function PotentialPet({ newPetData, setNewPetData }) {
  const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  return (
    <>
      <h2 className="md:col-span-2">Potential Pet</h2>

      <div>
        <img
          src={!useCustomSpecies ? newPetData.species_img_path : 'https://via.placeholder.com/256x256.png?text=Your+custom+pet+here!'}
          alt={!useCustomSpecies ? newPetData.species_name : 'Your custom pet here!'}
          id="species-img"
          className="col"
        />
      </div>

      <PetAttributes
        newPetData={newPetData}
        speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'}
      />

      <SpeciesToggle
        useCustomSpecies={useCustomSpecies}
        setUseCustomSpecies={setUseCustomSpecies}
      />
      {/* <CustomPetCreator
        newPetData={newPetData}
        setNewPetData={setNewPetData}
      />
      <div className="col-span-1">
        <AdoptPetBtn
          newPetData={newPetData}
          setNewPetData={setNewPetData}
        />
      </div> */}
      <AdoptPet
        useCustomSpecies={useCustomSpecies}
        newPetData={newPetData}
        setNewPetData={setNewPetData}
      />
    </>
  );
}

PotentialPet.propTypes = {
  newPetData: PropTypes.shape({
    species_name: PropTypes.string.isRequired,
    food_fave: PropTypes.string.isRequired,
    food_least: PropTypes.string.isRequired,
    activity_fave: PropTypes.string.isRequired,
    activity_least: PropTypes.string.isRequired,
    music_fave: PropTypes.string.isRequired,
    music_least: PropTypes.string.isRequired,
    weather_fave: PropTypes.string.isRequired,
    weather_least: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
    astro_sign: PropTypes.string.isRequired,
    species_img_path: PropTypes.string.isRequired,
  }).isRequired,
  setNewPetData: PropTypes.func.isRequired,
};
