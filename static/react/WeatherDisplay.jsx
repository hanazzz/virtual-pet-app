/* eslint-env browser */
/* global React ReactDOM PropTypes */
/* eslint no-else-return: "error" */
// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function WeatherDisplay(props) {
  const [currentWeather, setCurrentWeather] = React.useState(undefined);
  const { pet } = props;
  WeatherDisplay.propTypes = {
    pet: PropTypes.object.isRequired
  };

  console.log(currentWeather)

  function getWeather() {
    fetch("/get-weather")
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
    <div>
      <h4>Current Weather</h4>
      <p>{currentWeather.weather_type}</p>
      <p>{currentWeather.weather_description}</p>
    </div>
  );
}
