/* eslint-disable react/no-unescaped-entities */
// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function RenamePet({ modalID, addAlert }) {
  const queryClient = ReactQuery.useQueryClient();

  const [newName, setNewName] = React.useState('');

  function renamePet(evt) {
    // Prevent form submit
    evt.preventDefault();
    // Close modal
    document.getElementById(modalID).classList.toggle('modal-open');

    // Send request to server to rename pet
    fetch('/user/pet/rename', {
      method: 'POST',
      body: JSON.stringify(newName),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Get new data from server
        // (previous data no longer valid), re-runs query fctn in custom hook, prompts re-render
        queryClient.invalidateQueries(['pet data']);
        addAlert('Your pet has been renamed!', 'alert-success');
      });
  }

  return (
    <ModalBox modalID={modalID}>
      <ModalTitle>Rename pet</ModalTitle>

      <p>If you would like to rename your pet, please enter your pet's new name below.</p>
      <p>If you changed your mind, click "Cancel" to exit.</p>

      <form className="text-center mt-4" onSubmit={(evt) => renamePet(evt)}>
        <label htmlFor="new-pet-name" className="label label-text flex flex-col">
          New name:
          <input
            type="text"
            name="new-pet-name"
            id="new-pet-name"
            required="required"
            aria-required="true"
            value={newName}
            onChange={(evt) => setNewName(evt.target.value)}
            className="input input-bordered"
          />
        </label>

        <ModalFooter>
          <input type="submit" className="btn btn-accent" />

          <ModalBtn modalID={modalID} closeModal>
            Cancel
          </ModalBtn>
        </ModalFooter>
      </form>
    </ModalBox>
  );
}

RenamePet.propTypes = {
  modalID: PropTypes.string.isRequired,
  addAlert: PropTypes.func.isRequired,
};
