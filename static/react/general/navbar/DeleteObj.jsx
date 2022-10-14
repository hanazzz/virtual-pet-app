/* eslint-disable react/jsx-no-bind */
// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function DeleteObj({ deletePet, deleteAcct, modalID, addAlert }) {
  const queryClient = ReactQuery.useQueryClient();

  const route = deletePet ? '/user/pet/delete' : '/user/delete';
  const deletionObject = deletePet ? 'pet' : 'account';

  // Confirm whether user wants to delete pet/account
  // On confirmation, sends GET request to server to execute deletion
  function deleteObj() {
    return fetch(route)
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
        // document.getElementById(modalID).classList.toggle('modal-open');
        // Display alert
        addAlert(msg, 'alert-success');
        // If deleted account, redirect to homepage
        if (deleteAcct) {
          window.location.href = '/';
        }
      })
      .catch((error) => addAlert(error, 'alert-error'));
  }

  return (
    <ModalBox modalID={modalID}>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <ModalTitle>DELETE {deletionObject.toUpperCase()}</ModalTitle>

      <p>{`Are you sure you want to delete your ${deletionObject}?`}</p>
      <p>WARNING: This action is irreversible.</p>

      <ModalFooter>
        <ModalBtn modalID={modalID} modalBtnCallback={deleteObj} addlClasses="btn-accent shrink md:shrink-0">
          <i className="fa-solid fa-check pr-2" />
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Yes, I want to delete my {deletionObject}
        </ModalBtn>

        <ModalBtn modalID={modalID} closeModal>
          <i className="fa-solid fa-xmark pr-2" />
          No
        </ModalBtn>
      </ModalFooter>
    </ModalBox>
  );
}

DeleteObj.propTypes = {
  deletePet: PropTypes.bool,
  deleteAcct: PropTypes.bool,
  modalID: PropTypes.string.isRequired,
  addAlert: PropTypes.func.isRequired,
};

DeleteObj.defaultProps = {
  deletePet: false,
  deleteAcct: false,
};
