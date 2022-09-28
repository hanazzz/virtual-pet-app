function Settings({ setPetData }) {

  return (
    <>
      <DeletePet setPetData={setPetData} />
      <RenamePet />
      <DeleteAccount />
    </>
  );
}

Settings.propTypes = {
  setPetData: PropTypes.func.isRequired,
};
