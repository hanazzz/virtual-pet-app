// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function PetGeneratorIntro() {
  return (
    <>
      <h1>Adopt a Pet</h1>
      {/* eslint-disable-next-line react/no-unescaped-entities, max-len */}
      <p>Adopt a pet to call your own! Just click the "GENERATE PET" button until you find a pet that you like. Once you're ready, go ahead and adopt them!</p>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function PetGenerator(props) {
  // Store data for generated pets in newPetData state
  const [newPetData, setNewPetData] = React.useState();
  const { setPetData } = props;

  alert("Looks like you don't have a pet yet! Let's fix that.");
  console.log('*** rendering pet generator ***');
  console.log(newPetData);

  // Generate random pet
  function generateNewPet() {
    console.log('generating pet');
    fetch('/generate-pet')
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
    fetch('/get-loc-mock')
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
        fetch('/adopt-pet', {
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

  if (newPetData) {
    console.log('showing pet');
    return (
      <div>
        <PetGeneratorIntro />
        <h2>Potential Pet</h2>
        <button type="button" onClick={generateNewPet} id="generate-pet">GENERATE PET</button>
        <br />
        <PetDisplay pet={newPetData} />
        <br />
        <button type="button" onClick={adoptPet} id="adopt-pet">ADOPT PET</button>
      </div>
    );
  }
  return (
    <>
      <PetGeneratorIntro />
      <div><button type="button" onClick={generateNewPet} id="generate-pet">GENERATE PET</button></div>
    </>
  );
}

PetGenerator.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
