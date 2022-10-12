// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function GeneratePetBtn({ setNewPetData }) {
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

  return (
    <Button
      // eslint-disable-next-line react/jsx-no-bind
      onClick={generateNewPet}
      id="generate-pet"
      key="generate-pet"
      btnClasses="btn-lg btn-secondary"
    >
      GENERATE PET
    </Button>
  );
}

GeneratePetBtn.propTypes = {
  setNewPetData: PropTypes.func.isRequired,
};
