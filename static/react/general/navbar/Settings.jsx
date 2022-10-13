/* eslint-disable react/jsx-boolean-value */
// eslint-disable-next-line no-unused-vars
function Settings({ tempInF, setTempInF, addAlert }) {
  const { petData } = usePetData();

  const navbarPetInfo = !petData ? null : (
    // If user has pet, display following options in Settings dropdown menu
    <>
      {/* Button to open renamePet modal (see RenamePet component) */}
      <li><ModalBtn modalID="rename-pet-modal" btnClassOverride={true}>Rename pet</ModalBtn></li>
      <li><ModalBtn modalID="delete-pet" btnClassOverride={true}>Delete pet</ModalBtn></li>
    </>
  );

  return (

    <div id="settings" className="text-base-content dropdown dropdown-end dropdown-hover">
      <label tabIndex={0} className="text-neutral-content btn btn-ghost px-6"><i className="fa-solid fa-gear" title="Settings" /></label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><ToggleTempUnit tempInF={tempInF} setTempInF={setTempInF} /></li>
        {navbarPetInfo}
        <li><ModalBtn modalID="delete-account" btnClassOverride={true}>Delete account</ModalBtn></li>
      </ul>
      {/* Modals */}
      <RenamePet modalID="rename-pet-modal" addAlert={addAlert} />
      <DeleteObj modalID="delete-pet" deletePet={true} addAlert={addAlert} />
      <DeleteObj modalID="delete-account" deleteAcct={true} addAlert={addAlert} />
    </div>
  );
}

Settings.propTypes = {
  tempInF: PropTypes.bool.isRequired,
  setTempInF: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
};
