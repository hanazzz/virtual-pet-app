// eslint-disable-next-line no-unused-vars
function ToggleTempUnit({ tempInF, setTempInF }) {
  const fahrenheit = '\u2109';
  const celsius = '\u2103';

  // Update temp unit preference in local storage.
  // Updates whenever component re-renders (which happens when tempInF changes)
  React.useEffect(() => {
    localStorage.setItem('tempInF', tempInF);
  });

  // Toggle temperature between F and C
  function toggleTempUnit() {
    setTempInF((prevTemp) => (!prevTemp));
  }

  return (
    <button
      type="button"
      id="toggle-temp"
      onClick={toggleTempUnit}
    >
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {fahrenheit} {'\u2194'} {celsius}
    </button>
  );
}

ToggleTempUnit.propTypes = {
  tempInF: PropTypes.bool.isRequired,
  setTempInF: PropTypes.func.isRequired,
};
