/* eslint-env browser */
/* global React */
/* eslint no-else-return: "error" */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function WeatherDisplay(props) {
  console.log("displaying weather");

  const { lat, lon } = props;
  const petLocation = {lat, lon};
  const [currentWeather, setCurrentWeather] = React.useState(undefined);

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
      <i className={`owf owf-${currentWeather.condition_code} owf-3x`} />
      <i className={`wi wi-owm-${currentWeather.condition_code}`} />
      <span>{currentWeather.temp} &#8457;</span>
      <br />
      <span>{currentWeather.weather_description}</span>
      {/* <img
        src={currentWeather.icon_url}
        alt={currentWeather.weather_description}
      /> */}
    </div>
  );
}
