// eslint-disable-next-line no-unused-vars
function PetHeading() {
  const { petData } = usePetData();

  return (
    <>
      <div className="text-5xl font-bold">
        {petData.name}
      </div>

      <div className="text-3xl medium">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        the {petData.personality} {petData.species_name}
      </div>

      <div id="location" className="text-lg">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {petData.city}, {petData.region}, {petData.country}
      </div>
    </>
  );
}
