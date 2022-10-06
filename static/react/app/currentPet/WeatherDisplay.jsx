// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function WeatherDisplay({ lat, lon, tempInF }) {
  console.log('*** rendering WeatherDisplay ***');

  const [currentWeather, setCurrentWeather] = React.useState(undefined);
  const petLocation = { lat, lon };
  const fahrenheit = '\u2109';
  const celsius = '\u2103';

  // Get current weather
  React.useEffect(() => {
    console.log('Getting weather...');
    fetch('/user/weather/mock', {
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
      <i className={`wi wi-owm-${currentWeather.conditionCode} fa-3x`} />
      {/* if tempInF is true, display temperature in Fahrenheit, else display in Celsius */}
      <div className="">
        {tempInF ? (`${currentWeather.tempF} ${fahrenheit}`) : (`${currentWeather.tempC} ${celsius}`)}
      </div>
      <div className="">{currentWeather.description}</div>
    </div>
  );
}

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  tempInF: PropTypes.bool.isRequired,
};
