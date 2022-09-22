/* global React PropTypes WeatherDisplay PetDisplay */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function CurrentPet(props) {
  const { pet } = props;
  const { setPetData } = props;
  CurrentPet.propTypes = {
    pet: PropTypes.object.isRequired,
    setPetData: PropTypes.func.isRequired,
  };

  console.log('Existing pet data, rendering CurrentPet');

  function deletePet() {
    if (confirm('Are you sure you want to delete your pet? This action is irreversible.')) {
      fetch('/delete-pet')
        .then((response) => response.json())
        .then((msg) => {
          console.log('deleting pet');
          alert(msg);
          setPetData(null);
        })
        .catch((error) => alert(error.toString()));
    } else {
      alert('Your pet has not been deleted.');
    }
  }

  return (
    <div>
      <h1>Your Pet</h1>
      <h2>{pet.name} the {pet.personality} {pet.species_name}</h2>
      <h3 id="location">Location: {pet.city}, {pet.region}, {pet.country}</h3>
      <PetDisplay pet={pet} />
      <WeatherDisplay pet={pet} />
      <button type="button" id="delete-pet" onClick={deletePet}>DELETE PET</button>
    </div>
  );
}
