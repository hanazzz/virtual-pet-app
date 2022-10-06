// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function DeleteObj({ deletePet, deleteAcct }) {
  const queryClient = ReactQuery.useQueryClient();

  const route = deletePet ? '/user/pet/delete' : '/user/delete';
  const deletionObject = deletePet ? 'pet' : 'account';

  // Confirm whether user wants to delete pet/account
  // On confirmation, sends GET request to server to execute deletion
  function deleteObj() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete your ${deletionObject}? WARNING: This action is irreversible.`)) {
      fetch(route)
        .then((response) => {
          // Get new data from server
          // (previous data no longer valid), re-runs query fctn in custom hook, prompts re-render
          queryClient.invalidateQueries(['pet data']);
          return response;
        })
        .then((response) => response.json())
        .then((msg) => {
          console.log(`deleting ${deletionObject}`);
          alert(msg);
          if (deleteAcct) {
            window.location.href = '/';
          }
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
  deletePet: PropTypes.bool,
  deleteAcct: PropTypes.bool,
};

DeleteObj.defaultProps = {
  deletePet: false,
  deleteAcct: false,
};
