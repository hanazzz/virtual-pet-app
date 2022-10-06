/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Display adoption options (depending on existing vs custom species)

// eslint-disable-next-line no-unused-vars
function AdoptPet({ useCustomSpecies, newPetData, setNewPetData }) {
  const queryClient = ReactQuery.useQueryClient();

  function adoptPet(speciesName, speciesImgPath) {
    console.log('preparing to adopt pet');
    // Get user's location via IP address and use for pet's location
    fetch('/user/location/mock')
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);

        // Throw error if received error message instead of object
        if (typeof userData === 'string') {
          throw (userData);
        }

        const name = prompt('Please name your pet:');

        const updatedPetData = newPetData;
        updatedPetData.name = name;
        updatedPetData.country = userData.country;
        updatedPetData.region = userData.regionName;
        updatedPetData.city = userData.city;
        updatedPetData.lat = userData.lat;
        updatedPetData.lon = userData.lon;
        // If adopting custom species pet, get species name and img path from params
        if (useCustomSpecies) {
          updatedPetData.species_name = speciesName;
          updatedPetData.species_img_path = speciesImgPath;
        }
        setNewPetData(updatedPetData);

        console.log(newPetData);

        // TODO: Troubleshoot (doesn't currently work)
        // setNewPetData(prevData => ({
        //   ...prevData,
        //   name: name,
        //   country: userData["country"],
        //   region: userData["regionName"],
        //   city: userData["city"],
        //   lat: userData["lat"],
        //   lon: userData["lon"],
        // }));

        // console.log(newPetData);

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

            console.log('adoption complete');
            // eslint-disable-next-line react/prop-types
            alert(`Congratulations on bringing home your new pet, ${newPetData.name} the ${newPetData.personality} ${newPetData.species_name}!`);
          })
          .catch((error) => alert(error.toString()));
      })
      .catch((error) => alert(error.toString()));
  }

  const adoptionProcess = !useCustomSpecies
    ? <AdoptPetBtn adoptPet={adoptPet} />
    : <CustomPetCreator adoptPet={adoptPet} />;

  return (
    adoptionProcess
  );
}
