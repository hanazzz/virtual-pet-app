/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// Adopt pet (existing species pet)

// eslint-disable-next-line no-unused-vars
function AdoptPetBtn({ adoptPet }) {
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
};
