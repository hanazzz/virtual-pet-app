/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

// Display adoption options (depending on existing vs custom species)

// eslint-disable-next-line no-unused-vars
function AdoptPet({ useCustomSpecies, newPetData, setNewPetData, addAlert }) {
  const queryClient = ReactQuery.useQueryClient();
  const { makeCustomImg } = useMakeCustomImg();

  // Define states for custom pet creator input fields
  const [adjective, setAdjective] = React.useState('');
  const [color, setColor] = React.useState('');
  const [animal, setAnimal] = React.useState('');
  const [petName, setPetName] = React.useState('');

  function adoptPet() {
    // Get user's location via IP address and use for pet's location
    return fetch('/user/location')
      .then((response) => response.json())
      .then((userData) => {
        // Throw error if received error message instead of object
        if (typeof userData === 'string') {
          throw (userData);
        }

        const updatedPetData = newPetData;
        updatedPetData.name = petName;
        updatedPetData.country = userData.country;
        updatedPetData.region = userData.regionName;
        updatedPetData.city = userData.city;
        updatedPetData.lat = userData.lat;
        updatedPetData.lon = userData.lon;
        // If adopting custom species pet, use custom species name and set img path to null
        if (useCustomSpecies) {
          updatedPetData.species_name = `${adjective} ${animal}`;
          updatedPetData.species_img_path = null;
        }
        setNewPetData(updatedPetData);

        // Adopt pet (create pet in database and link to user)
        fetch('/user/pet/new', {
          method: 'POST',
          body: JSON.stringify(newPetData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            // Get new data from server
            // (previous data no longer valid), re-runs query fctn in custom hook, prompts re-render
            queryClient.invalidateQueries(['pet data']);

            // eslint-disable-next-line react/prop-types
            addAlert(`Congratulations on bringing home your new pet, ${newPetData.name} the ${newPetData.personality} ${newPetData.species_name}!`, 'alert-success');

            // If using custom species, create custom pet img
            if (useCustomSpecies) {
              console.log('creating custom pet');
              const petPrompt = [adjective, color, animal];
              makeCustomImg(petPrompt);
            }
          })
          .catch((error) => addAlert(error, 'alert-error'));
      })
      .catch((error) => addAlert(error, 'alert-error'));
  }

  return (
    <>
      <Card color="accent" addlClasses="mt-2 mb-4 md:my-6">
        <CustomPetCreator
          adoptPet={adoptPet}
          adjective={adjective}
          setAdjective={setAdjective}
          color={color}
          setColor={setColor}
          animal={animal}
          setAnimal={setAnimal}
          useCustomSpecies={useCustomSpecies}
        />

        {/* Button to open modal to name pet */}
        <Button
          onClick={() => document.getElementById('name-new-pet').classList.toggle('modal-open')}
          id="adopt-pet"
          key="adopt-pet"
          btnClasses={`btn-secondary btn-lg mx-auto mt-8 w-fit ${useCustomSpecies ? 'hidden' : null}`}
        >
          ADOPT PET
        </Button>
      </Card>

      {/* Modal to name pet and initiate adoption */}
      <ModalBox modalID="name-new-pet">
        <ModalTitle>Name your new pet</ModalTitle>

        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Let's name your new pet! Please enter a name below.</p>

        <div className="text-center">
          <label htmlFor="pet-name" className="label label-text flex flex-col">
            Pet name:
            <input
              type="text"
              name="pet-name"
              id="pet-name"
              required="required"
              aria-required="true"
              value={petName}
              onChange={(evt) => setPetName(evt.target.value)}
              className="input input-bordered"
              autoFocus
            />
          </label>

          <ModalFooter>
            {/* <input type="submit" className="btn btn-primary" /> */}
            <ModalBtn modalID="name-new-pet" addlClasses="btn-primary" modalBtnCallback={adoptPet}>
              Adopt
            </ModalBtn>

            <ModalBtn modalID="name-new-pet">
              Cancel
            </ModalBtn>
          </ModalFooter>
        </div>
      </ModalBox>
    </>
  );
}

AdoptPet.propTypes = {
  useCustomSpecies: PropTypes.bool.isRequired,
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
