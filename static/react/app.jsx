/* global React ReactDOM CurrentPet PetGenerator */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function VirtualPetApp() {
  const [petData, setPetData] = React.useState(undefined);

  console.log('Loading app');

  // Check if user has existing pet
  React.useEffect(() => {
    console.log('fetching');
    fetch('/user-info')
      .then((response) => response.json())
      .then((petJson) => {
        if (petJson) {
          console.log('checked db: has pet');
          setPetData(petJson);
        } else {
          console.log('checked db: no pet');
          setPetData(null);
        }
      })
      .catch((error) => alert(error.toString()));
  }, []);

  // If user has pet
  if (petData) {
    alert('Your pet is so cute!');
    return (
      <CurrentPet
        pet={petData}
        setPetData={setPetData}
      />
    );
  // If user doesn't have pet
  } else if (petData === null) {
    console.log('NO pet data, rendering PetGenerator');
    alert("Looks like you don't have a pet yet! Let's fix that.");
    return (
      <PetGenerator
        petData={petData}
        setPetData={setPetData}
      />
    );
  }
  // If user's pet status is unknown (i.e. useEffect hasn't run)
  console.log('the void');
  return (
    <div>Loading...</div>
  );
}

ReactDOM.render(<VirtualPetApp />, document.querySelector('#app'));
