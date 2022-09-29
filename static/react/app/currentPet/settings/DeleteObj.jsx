// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

function DeleteObj({ setPetData, deletionObject }) {
  // Define deletion instructions depending on what is deleted
  const deletionInstr = {
    pet: {
      route: '/user/pet/delete',
      clearedPetData: null,
      redirect: false,
    },
    account: {
      route: '/user/delete',
      clearedPetData: undefined,
      redirect: false,
    },
  };

  const { route, clearedPetData, redirect } = deletionInstr[deletionObject];

  // Confirm whether user wants to delete pet/account
  // On confirmation, sends GET request to server to execute deletion
  function deleteObj() {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete your ${deletionObject}? This action is irreversible.`)) {
      fetch(route)
        .then((response) => response.json())
        .then((msg) => {
          console.log(`deleting ${deletionObject}`);
          alert(msg);
          // TO DO: Currently the redirect doesn't happen because setPetData prompts re-render.
          setPetData(clearedPetData);
          if (redirect) {
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
  setPetData: PropTypes.func.isRequired,
  deletionObject: PropTypes.string.isRequired,
};
