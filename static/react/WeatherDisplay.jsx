/* eslint-env browser */
/* global React PropTypes */
/* eslint no-else-return: "error" */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function WeatherDisplay(props) {
  console.log('displaying weather');

  const [currentWeather, setCurrentWeather] = React.useState(undefined);
  // tempInF tracks whether to display temperature in Fahrenheit (true) or Celsius (false)
  const [tempInF, setTempInF] = React.useState(true);
  const fahrenheit = '\u2109';
  const celsius = '\u2103';
  const { lat, lon } = props;
  const petLocation = { lat, lon };

  WeatherDisplay.propTypes = {
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  };

  function toggleTempUnit() {
    setTempInF((prevTemp) => (!prevTemp));
  }

  // Get current weather
  React.useEffect(() => {
    console.log('Getting weather...');
    fetch('/get-weather-mock', {
      method: 'POST',
      body: JSON.stringify(petLocation),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((weatherData) => {
        setCurrentWeather(weatherData);
      })
      .catch((error) => alert(error.toString()));
  }, []);

  if (!currentWeather) {
    return (
      <div>
        <p>Weather soon!</p>
      </div>
    );
  }

  return (
    <div id="weather">
      <i className={`owf owf-${currentWeather.conditionCode} owf-3x`} />
      <i className={`wi wi-owm-${currentWeather.conditionCode}`} />
      {/* if tempInF is true, display temperature in Fahrenheit, else display in Celsius */}
      <span>
        {tempInF ? (`${currentWeather.tempF} ${fahrenheit}`) : `${currentWeather.tempC} ${celsius}`}
      </span>
      <br />
      <span>{currentWeather.description}</span>
      <br />
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <button type="button" onClick={toggleTempUnit}>{fahrenheit} {'\u2194'} {celsius}</button>
    </div>
  );
}
