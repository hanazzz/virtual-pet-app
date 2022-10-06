// eslint-disable-next-line no-unused-vars
function PetAttributes({ newPetData, speciesPlaceholder }) {
  const { petData } = usePetData();
  const pet = petData || newPetData;

  return (
    <table id="pet-display" className="col">
      <caption>Pet Attributes</caption>
      <tbody>
        <tr>
          <td>Pet species</td>
          <td id="pet-species">{!speciesPlaceholder ? pet.species_name : speciesPlaceholder}</td>
        </tr>
        <tr>
          <td>Favorite food</td>
          <td id="food-fave">{pet.food_fave}</td>
        </tr>
        <tr>
          <td>Least favorite food</td>
          <td id="food-least">{pet.food_least}</td>
        </tr>
        <tr>
          <td>Favorite activity</td>
          <td id="activity-fave">{pet.activity_fave}</td>
        </tr>
        <tr>
          <td>Least favorite activity</td>
          <td id="activity-least">{pet.activity_least}</td>
        </tr>
        <tr>
          <td>Favorite music genre</td>
          <td id="music-fave">{pet.music_fave}</td>
        </tr>
        <tr>
          <td>Least favorite music genre</td>
          <td id="music-least">{pet.music_least}</td>
        </tr>
        <tr>
          <td>Favorite weather</td>
          <td id="weather-fave">{pet.weather_fave}</td>
        </tr>
        <tr>
          <td>Least favorite weather</td>
          <td id="weather-least">{pet.weather_least}</td>
        </tr>
        <tr>
          <td>Personality</td>
          <td id="personality">{pet.personality}</td>
        </tr>
        <tr>
          <td>Astrological sign</td>
          <td id="astro-sign">{pet.astro_sign}</td>
        </tr>
      </tbody>
    </table>
  );
}

PetAttributes.propTypes = {
  newPetData: PropTypes.oneOfType([
    PropTypes.shape({
      species_name: PropTypes.string.isRequired,
      food_fave: PropTypes.string.isRequired,
      food_least: PropTypes.string.isRequired,
      activity_fave: PropTypes.string.isRequired,
      activity_least: PropTypes.string.isRequired,
      music_fave: PropTypes.string.isRequired,
      music_least: PropTypes.string.isRequired,
      weather_fave: PropTypes.string.isRequired,
      weather_least: PropTypes.string.isRequired,
      personality: PropTypes.string.isRequired,
      astro_sign: PropTypes.string.isRequired,
      species_img_path: PropTypes.string.isRequired,
    }),
    PropTypes.bool,
  ]),
  speciesPlaceholder: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

PetAttributes.defaultProps = {
  newPetData: false,
  speciesPlaceholder: false,
};
