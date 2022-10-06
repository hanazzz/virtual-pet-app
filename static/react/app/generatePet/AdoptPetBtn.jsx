/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Adopt pet (existing species pet)

// eslint-disable-next-line no-unused-vars
function AdoptPetBtn({ adoptPet }) {
  // const queryClient = ReactQuery.useQueryClient();

  // function adoptPet() {
  //   console.log('preparing to adopt pet');
  //   // Get user's location via IP address and use for pet's location
  //   fetch('/user/location/mock')
  //     .then((response) => response.json())
  //     .then((userData) => {
  //       console.log(userData);

  //       const name = prompt('Please name your pet:');

  //       const updatedPetData = newPetData;
  //       updatedPetData.name = name;
  //       updatedPetData.country = userData.country;
  //       updatedPetData.region = userData.regionName;
  //       updatedPetData.city = userData.city;
  //       updatedPetData.lat = userData.lat;
  //       updatedPetData.lon = userData.lon;
  //       setNewPetData(updatedPetData);

  //       console.log(newPetData);

  //       // TODO: Troubleshoot (doesn't currently work)
  //       // setNewPetData(prevData => ({
  //       //   ...prevData,
  //       //   name: name,
  //       //   country: userData["country"],
  //       //   region: userData["regionName"],
  //       //   city: userData["city"],
  //       //   lat: userData["lat"],
  //       //   lon: userData["lon"],
  //       // }));

  //       // console.log(newPetData);

  //       // Adopt pet (create pet in database and link to user)
  //       fetch('/user/pet/new', {
  //         method: 'POST',
  //         body: JSON.stringify(newPetData),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //         .then(() => {
  //           // Get new data from server
  //           // (previous data no longer valid), re-runs query fctn in custom hook, prompts re-render
  //           queryClient.invalidateQueries(['pet data']);

  //           console.log('adoption complete');
  //           // eslint-disable-next-line react/prop-types
  //           alert(`Congratulations on bringing home your new pet, ${newPetData.name} the ${newPetData.personality} ${newPetData.species_name}!`);
  //         })
  //         .catch((error) => alert(error.toString()));
  //     });
  // }

  return (
    <Button
      onClick={adoptPet}
      id="adopt-pet"
    >
      ADOPT PET
    </Button>
  );
}

AdoptPetBtn.propTypes = {
  adoptPet: PropTypes.func.isRequired,
  // newPetData: PropTypes.shape({
  //   species_name: PropTypes.string.isRequired,
  //   food_fave: PropTypes.string.isRequired,
  //   food_least: PropTypes.string.isRequired,
  //   activity_fave: PropTypes.string.isRequired,
  //   activity_least: PropTypes.string.isRequired,
  //   music_fave: PropTypes.string.isRequired,
  //   music_least: PropTypes.string.isRequired,
  //   weather_fave: PropTypes.string.isRequired,
  //   weather_least: PropTypes.string.isRequired,
  //   personality: PropTypes.string.isRequired,
  //   astro_sign: PropTypes.string.isRequired,
  //   species_img_path: PropTypes.string.isRequired,
  // }).isRequired,
  // setNewPetData: PropTypes.func.isRequired,
};
