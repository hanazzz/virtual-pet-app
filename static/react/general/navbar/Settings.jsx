function Settings({ petData, setPetData }) {
  const navbarPetInfo = !petData ? null : (
    // If user has pet, display following options in Settings dropdown menu
    <>
      <li><ModalBtn modalID="rename-pet-modal" classOverride={true}>Rename pet</ModalBtn></li>
      <li><DeleteObj setPetData={setPetData} deletePet={true} /></li>
    </>
  );

  return (

    <div id="settings" className="dropdown dropdown-end dropdown-hover">
      <label tabIndex={0} className="btn btn-ghost"><i className="fa-solid fa-gear" /></label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Switch between F and C</a></li>
        {navbarPetInfo}
        <li><DeleteObj deleteAcct={true} /></li>
      </ul>
      <RenamePet modalID="rename-pet-modal" setPetData={setPetData} />
    </div>
  );
}

Settings.propTypes = {
  petData: PropTypes.any.isRequired,
  setPetData: PropTypes.func.isRequired,
};
