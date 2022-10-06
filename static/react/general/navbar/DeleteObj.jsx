/* eslint-disable react/jsx-no-bind */
// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function DeleteObj({ deletePet, deleteAcct, modalID }) {
  const queryClient = ReactQuery.useQueryClient();

  const route = deletePet ? '/user/pet/delete' : '/user/delete';
  const deletionObject = deletePet ? 'pet' : 'account';

  // Confirm whether user wants to delete pet/account
  // On confirmation, sends GET request to server to execute deletion
  function deleteObj() {
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
        // Close modal
        document.getElementById(modalID).classList.toggle('modal-open');
        // Display alert
        alert(msg);
        // If deleted account, redirect to homepage
        if (deleteAcct) {
          window.location.href = '/';
        }
      })
      .catch((error) => alert(error.toString()));
  }

  return (
    <ModalBox modalID={modalID}>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h5>Delete {deletionObject}</h5>
      <p>{`Are you sure you want to delete your ${deletionObject}?`}</p>
      <p>WARNING: This action is irreversible.</p>

      <ModalBtn modalID={modalID} modalBtnCallback={deleteObj}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Yes, I want to delete my {deletionObject}
      </ModalBtn>

      <ModalBtn modalID={modalID}>
        No
      </ModalBtn>
    </ModalBox>
  );
}

DeleteObj.propTypes = {
  deletePet: PropTypes.bool,
  deleteAcct: PropTypes.bool,
  modalID: PropTypes.string.isRequired,
};

DeleteObj.defaultProps = {
  deletePet: false,
  deleteAcct: false,
};
