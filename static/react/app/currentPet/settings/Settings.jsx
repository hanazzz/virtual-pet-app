function Settings({ setPetData }) {
  return (
    <>
      <h4>Settings</h4>
      {/* <DeletePet setPetData={setPetData} /> */}
      <DeleteObj setPetData={setPetData} deletePet={true} />
      <RenamePet setPetData={setPetData} />
      <DeleteObj setPetData={setPetData} deleteAcct={true} />
    </>
  );
}

Settings.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
