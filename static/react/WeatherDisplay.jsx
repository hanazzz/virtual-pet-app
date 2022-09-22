/* eslint-env browser */
/* global React */
/* eslint no-else-return: "error" */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function WeatherDisplay() {
  const [currentWeather, setCurrentWeather] = React.useState(undefined);

  console.log(currentWeather);

  function getWeather() {
    fetch('/get-weather')
      .then((response) => response.json())
      .then((weatherData) => {
        console.log(weatherData);
        setCurrentWeather(weatherData);
      });
  }

  if (!currentWeather) {
    return (
      <div>
        <button type="button" onClick={getWeather}>GET WEATHER</button>
      </div>
    );
  }

  return (
    <div id="weather">
      <h4>Current Weather</h4>
      <p>{currentWeather.weather_type}</p>
      <p>{currentWeather.weather_description}</p>
      <img
        src={currentWeather.icon_url}
        alt={currentWeather.weather_description}
      />
    </div>
  );
}
