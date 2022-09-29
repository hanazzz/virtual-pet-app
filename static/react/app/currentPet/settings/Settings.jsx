function Settings({ setPetData }) {
  return (
    <>
      <h4>Settings</h4>
      <DeletePet setPetData={setPetData} />
      <DeleteObj setPetData={setPetData} deletionObject="pet" />
      <RenamePet />
      <DeleteObj setPetData={setPetData} deletionObject="account" />
    </>
  );
}

Settings.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
