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
        // Throw error if received error message instead of object
        if (typeof weatherData === 'string') {
          console.log(weatherData);
          throw (weatherData);
        } else {
          setCurrentWeather(weatherData);
        }
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
    <Card id="weather" color="secondary" addlClasses="card-compact">
      <div id="weather-description" className="text-m">{currentWeather.description}</div>

      <div className="flex flex-row justify-start">
        {/* weather icon */}
        <i className={`wi wi-owm-${currentWeather.conditionCode} pr-4 text-4xl`} />
        {/* if tempInF is true, display temperature in Fahrenheit, else display in Celsius */}
        <span className="text-3xl font-extrabold">
          {tempInF ? (`${currentWeather.tempF} ${fahrenheit}`) : (`${currentWeather.tempC} ${celsius}`)}
        </span>
      </div>
    </Card>
  );
}

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  tempInF: PropTypes.bool.isRequired,
};
