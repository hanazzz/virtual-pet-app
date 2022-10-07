// eslint-disable-next-line no-unused-vars
function PetHeading() {
  const { petData } = usePetData();

  return (
    <>
      <h1 className="text-4xl font-medium">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {petData.name} the {petData.personality} {petData.species_name}
      </h1>

      <h2 id="location" className="text-xl">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Location: {petData.city}, {petData.region}, {petData.country}
      </h2>
    </>
  );
}
