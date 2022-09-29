// TODO: Remove these rules before deployment
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function RenamePet({ setPetData }) {
  const [newName, setNewName] = React.useState();

  // TODO: need to convert to modal that has a form where user can input pet name
  function renamePet(evt) {
    evt.preventDefault();

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
    // <button
    //   type="button"
    //   id="rename-pet"
    //   onClick={renamePet}
    // >
    //   Rename pet
    // </button>
    <div id="rename-pet">
      <h5>Rename pet</h5>
      {/* eslint-disable-next-line max-len, react/no-unescaped-entities */}
      <p>If you would like to rename your pet, please enter your pet's new name below. If you changed your mind, click "Cancel" to exit.</p>
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
    </div>
  );
}

RenamePet.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
