/* eslint-disable react/no-unescaped-entities */
// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function RenamePet({ setPetData, modalID }) {
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
      .then((response) => response.json())
      .then((updatedPetData) => {
        alert('Your pet has been renamed!');
        setPetData(updatedPetData);
      });
  }

  return (
    <ModalBox modalID={modalID}>
      <h5>Rename pet</h5>
      <p>If you would like to rename your pet, please enter your pet's new name below.</p>
      <p>If you changed your mind, click "Cancel" to exit.</p>
      <form onSubmit={(evt) => renamePet(evt)}>
        <label htmlFor="pet-name">
          New name:
          <input
            type="text"
            name="pet-name"
            id="pet-name"
            required="required"
            aria-required="true"
            value={newName}
            onChange={(evt) => setNewName(evt.target.value)}
          />
        </label>

        <input type="submit" />
      </form>
      <ModalBtn modalID={modalID}>
        Cancel
      </ModalBtn>
    </ModalBox>
  );
}

RenamePet.propTypes = {
  setPetData: PropTypes.func.isRequired,
  modalID: PropTypes.string.isRequired,
};