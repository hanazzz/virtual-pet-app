/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Adopt pet

// eslint-disable-next-line no-unused-vars
function AdoptPetBtn({ newPetData, setNewPetData, setPetData }) {
  function adoptPet() {
    console.log('preparing to adopt pet');
    // Get user's location via IP address and use for pet's location
    fetch('/user/location/mock')
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);

        const name = prompt('Please name your pet:');

        const updatedPetData = newPetData;
        updatedPetData.name = name;
        updatedPetData.country = userData.country;
        updatedPetData.region = userData.regionName;
        updatedPetData.city = userData.city;
        updatedPetData.lat = userData.lat;
        updatedPetData.lon = userData.lon;
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
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('adoption complete');
            alert(`Congratulations on bringing home your new pet, ${newPetData.name} the ${newPetData.personality} ${newPetData.species_name}!`);
            setPetData(responseJson);
          })
          .catch((error) => alert(error.toString()));
      });
  }

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
  newPetData: PropTypes.obj.isRequired,
  setNewPetData: PropTypes.func.isRequired,
  setPetData: PropTypes.func.isRequired,
};
