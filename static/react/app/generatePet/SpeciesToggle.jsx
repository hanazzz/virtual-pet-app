// Toggle between adopting a pet that's an existing species vs custom species

// eslint-disable-next-line no-unused-vars
function SpeciesToggle({ useCustomSpecies, setUseCustomSpecies }) {
  function handleSpeciesChange() {
    setUseCustomSpecies((prevState) => !prevState);
  }

  return (
    <div className="btn-group w-fit mt-8 mb-2 md:my-6">
      <input type="radio" name="species-choice" data-title="Use existing pet species" aria-label="Use existing pet species" value="existing" onInput={handleSpeciesChange} className="btn shrink lg:shrink-0" defaultChecked />

      <input type="radio" name="species-choice" data-title="Create custom pet species" aria-label="Create custom pet species" value="custom" onInput={(evt) => handleSpeciesChange(evt)} className="btn shrink lg:shrink-0" />
    </div>
  );
}

SpeciesToggle.propTypes = {
  useCustomSpecies: PropTypes.bool.isRequired,
  setUseCustomSpecies: PropTypes.func.isRequired,
};
