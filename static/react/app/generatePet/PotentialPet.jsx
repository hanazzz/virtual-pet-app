// Display information for potential pet

// eslint-disable-next-line no-unused-vars
function PotentialPet({ newPetData, setNewPetData, addAlert }) {
  const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  return (
    <>
      <h2 className="md:col-span-2">Potential Pet</h2>

      <div>
        <div className="mockup-window border bg-base-300">
          <div className="flex justify-center px-4 py-4 bg-base-200">
            <img
              src={!useCustomSpecies ? newPetData.species_img_path : 'https://via.placeholder.com/256x256.png?text=Your+custom+pet+here!'}
              alt={!useCustomSpecies ? newPetData.species_name : 'Your custom pet here!'}
              id="species-img"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>

      <PetAttributes
        newPetData={newPetData}
        speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'}
      />

      <SpeciesToggle
        useCustomSpecies={useCustomSpecies}
        setUseCustomSpecies={setUseCustomSpecies}
      />

      <AdoptPet
        useCustomSpecies={useCustomSpecies}
        newPetData={newPetData}
        setNewPetData={setNewPetData}
        addAlert={addAlert}
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
  addAlert: PropTypes.func.isRequired,
};
