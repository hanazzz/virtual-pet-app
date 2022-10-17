/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/no-unescaped-entities */

// Rename existing pet
function RenamePet({ modalID, addAlert }) {
  const queryClient = ReactQuery.useQueryClient();

  const [newName, setNewName] = React.useState('');

  function renamePet() {
    // Send request to server to rename pet
    return fetch('/user/pet/rename', {
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
      <ModalTitle>RENAME PET</ModalTitle>

      <p>If you would like to rename your pet, please enter your pet's new name below.</p>
      <p>If you changed your mind, click "Cancel" to exit.</p>

      <div className="text-center mt-4">
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
            autoFocus
          />
        </label>

        <ModalFooter>
          {/* <input type="submit" className="btn btn-accent" /> */}
          <ModalBtn modalID={modalID} addlClasses="btn-accent" modalBtnCallback={renamePet}>
            Rename
          </ModalBtn>

          <ModalBtn modalID={modalID}>
            Cancel
          </ModalBtn>
        </ModalFooter>
      </div>
    </ModalBox>
  );
}

RenamePet.propTypes = {
  modalID: PropTypes.string.isRequired,
  addAlert: PropTypes.func.isRequired,
};
