function Attributes({ pet }) {
  return (
    <Modal modalID="pet-attributes" modalBtnText="ATTRIBUTES">
      <PetDisplay pet={pet} />
    </Modal>
  );
}

Attributes.propTypes = {
  pet: PropTypes.shape({
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
  }).isRequired,
};
