// eslint-disable-next-line no-unused-vars
function PetHeading() {
  const { petData } = usePetData();

  return (
    <>
      <h1 className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {petData.name} the {petData.personality} {petData.species_name}
      </h1>

      <h3 id="location" className="row">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {petData.city}, {petData.region}, {petData.country}
      </h3>
    </>
  );
}
