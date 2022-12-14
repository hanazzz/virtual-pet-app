// Display information for potential pet

// eslint-disable-next-line no-unused-vars
function PotentialPet({ newPetData, setNewPetData, addAlert }) {
  const [useCustomSpecies, setUseCustomSpecies] = React.useState(false);

  return (
    <>
      <Heading2 addlClasses="lg:col-span-2">Potential Pet</Heading2>

      <div>
        <div className="w-auto mx-auto my-2 mockup-window border bg-base-300">
          <div className="flex flex-col justify-center px-4 py-4 bg-base-200">
            <img
              src={!useCustomSpecies ? newPetData.species_img_path : '/static/images/question-mark.png'}
              alt={!useCustomSpecies ? newPetData.species_name : 'Your custom pet here!'}
              id="species-img"
              className="py-4 w-fit m-auto transition-opacity duration-200"
            />
            <PetAttributes
              newPetData={newPetData}
              speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
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
      </div>

      {/* <PetAttributes
        newPetData={newPetData}
        speciesPlaceholder={!useCustomSpecies ? false : 'Your custom species'}
      /> */}
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
