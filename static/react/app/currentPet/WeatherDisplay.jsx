function WeatherDisplay({ lat, lon, tempInF }) {
  const [currentWeather, setCurrentWeather] = React.useState(undefined);
  const petLocation = { lat, lon };
  // const fahrenheit = '\u2109';
  // const celsius = '\u2103';

  // Get current weather
  React.useEffect(() => {
    fetch('/user/weather', {
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
    <Card id="weather" color="secondary" addlClasses="card-compact w-fit mt-6 md:mt-0 mx-auto md:mx-0" addlBodyClasses="gap-1 justify-center">
      <div id="weather-description" className="text-base">{currentWeather.description}</div>

      <div className="flex flex-row justify-start font-bold">
        {/* weather icon */}
        <i className={`wi wi-owm-${currentWeather.conditionCode} pr-4 text-4xl`} />
        {/* if tempInF is true, display temperature in Fahrenheit, else display in Celsius */}
        <span className="text-3xl col-start-2 row-start-2">
          {tempInF ? (`${currentWeather.tempF} °F`) : (`${currentWeather.tempC} °C`)}
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
