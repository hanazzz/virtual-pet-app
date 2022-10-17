// Button to generate a random pet
function GeneratePetBtn({ setNewPetData }) {
  // Generate random pet
  function generateNewPet() {
    fetch('/pet/new')
      .then((response) => response.json())
      .then((petJson) => {
        setNewPetData(petJson);
      })
      .catch((error) => alert(error.toString()));
  }

  return (
    <Button
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
