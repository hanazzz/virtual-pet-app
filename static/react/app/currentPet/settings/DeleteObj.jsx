// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function DeleteObj({ setPetData, deletePet, deleteAcct }) {
  // OPTION 1
  // function redirect() {
  //   window.location.href = '/';
  // }

  // function clearPetData() {
  //   setPetData(null);
  // }

  // const action = deletePet ? clearPetData : redirect;

  // OPTION 2
  function action() {
    if (deletePet) setPetData(null);
    else window.location.href = '/';
  }

  const route = deletePet ? '/user/pet/delete' : '/user/delete';
  const deletionObject = deletePet ? 'pet' : 'account';

  // Confirm whether user wants to delete pet/account
  // On confirmation, sends GET request to server to execute deletion
  function deleteObj() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete your ${deletionObject}? WARNING: This action is irreversible.`)) {
      fetch(route)
        .then((response) => response.json())
        .then((msg) => {
          console.log(`deleting ${deletionObject}`);
          alert(msg);
          action();
        })
        .catch((error) => alert(error.toString()));
    } else {
      alert(`Your ${deletionObject} has not been deleted.`);
    }
  }

  return (
    <button
      type="button"
      id={`delete-${deletionObject}`}
      onClick={deleteObj}
    >
      {`Delete ${deletionObject}`}
    </button>
  );
}

DeleteObj.propTypes = {
  setPetData: PropTypes.func,
  // deletionObject: PropTypes.string.isRequired,
  deletePet: PropTypes.bool,
  deleteAcct: PropTypes.bool,
};

DeleteObj.defaultProps = {
  setPetData: undefined,
  deletePet: false,
  deleteAcct: false,
};
