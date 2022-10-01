/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function PetGenerator({ setPetData }) {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();

  // alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  // Generate random pet
  function generateNewPet() {
    console.log('generating pet');
    fetch('/pet/new')
      .then((response) => response.json())
      .then((petJson) => {
        console.log('new pet available');
        setNewPetData(petJson);
      })
      .catch((error) => alert(error.toString()));
  }

  // Adopt pet
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

  let displayNewPet = null;

  if (newPetData) {
    displayNewPet = (
      <>
        <h2 className="col-span-2">Potential Pet</h2>
        <div>
          <img
            src={newPetData.species_img_path}
            alt={newPetData.species_name}
            id="species-img"
            className="col"
          />
        </div>
        <PetDisplay pet={newPetData} />
        <div className="col-span-2">
          <Button
            onClick={adoptPet}
            id="adopt-pet"
          >
            ADOPT PET
          </Button>
        </div>
      </>
    );
  }

  return (
    <div id="pet-generator" className="grid grid-cols-2">
      <h1 className="col-span-2">Adopt a Pet</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities, max-len */}
      <p className="col-span-2">Adopt a pet to call your own! Just click the "GENERATE PET" button until you find a pet that you like. Once you're ready, go ahead and adopt them!</p>
      <div>
        <Button
          onClick={generateNewPet}
          id="generate-pet"
        >
          GENERATE PET
        </Button>
      </div>
      {displayNewPet}
      <CustomPetCreator />
    </div>
  );
}

PetGenerator.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
