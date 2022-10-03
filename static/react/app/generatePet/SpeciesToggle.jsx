// eslint-disable-next-line no-unused-vars
function SpeciesToggle({ useCustomSpecies, setUseCustomSpecies }) {
  function handleSpeciesChange() {
    setUseCustomSpecies((prevState) => !prevState);
    document.querySelector('#custom-species-form').classList.toggle('hidden');
  }

  return (
    <div className="btn-group">
      <input type="radio" name="species-choice" data-title="Use existing pet species" aria-label="Use existing pet species" value="existing" onInput={handleSpeciesChange} className="btn" defaultChecked />
      <input type="radio" name="species-choice" data-title="Create custom pet species" aria-label="Create custom pet species" value="custom" onInput={(evt) => handleSpeciesChange(evt)} className="btn" />
    </div>
  );
}

SpeciesToggle.propTypes = {
  useCustomSpecies: PropTypes.bool.isRequired,
  setUseCustomSpecies: PropTypes.func.isRequired,
};
