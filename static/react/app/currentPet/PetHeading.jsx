function PetHeading({ pet }) {
  return (
    <>
      <h1 className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {pet.name} the {pet.personality} {pet.species_name}
      </h1>

      <h3 id="location" className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {pet.city}, {pet.region}, {pet.country}
      </h3>
    </>
  );
}

PetHeading.propTypes = {
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    species_name: PropTypes.string.isRequired,
    personality: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};
