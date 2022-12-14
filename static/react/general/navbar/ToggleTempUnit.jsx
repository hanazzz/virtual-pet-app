// Switch between displaying temperature in Fahrenheit and Celsius
function ToggleTempUnit({ tempInF, setTempInF }) {
  // const fahrenheit = '\u2109';
  // const celsius = '\u2103';

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
      className="gap-2.5"
    >
      °F
      <i className="fa-solid fa-arrows-left-right fa-sm" />
      °C
    </button>

  );
}

ToggleTempUnit.propTypes = {
  tempInF: PropTypes.bool.isRequired,
  setTempInF: PropTypes.func.isRequired,
};
