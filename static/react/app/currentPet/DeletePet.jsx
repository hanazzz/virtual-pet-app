// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Confirms whether user wants to delete pet, then sends GET request to server to delete pet
function DeletePet({ setPetData }) {
  function deletePet() {
    // eslint-disable-next-line no-restricted-globals
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
    <button type="button" id="delete-pet" onClick={deletePet}>DELETE PET</button>
  );
}

DeletePet.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
