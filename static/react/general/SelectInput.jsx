// eslint-disable-next-line no-unused-vars
function SelectInput({
  selectID, labelText, optionList, addlLabelClasses,
  addlSelectClasses, state, setState,
}) {
  const classListLabel = `label label-text ${addlLabelClasses}`;
  const classListSelect = `select ${addlSelectClasses}`;

  const options = optionList.map((option) => (
    <option value={option} key={option}>{option}</option>
  ));

  return (
    <label htmlFor={selectID} className={classListLabel}>
      {labelText}

      <select
        name={selectID}
        id={selectID}
        className={classListSelect}
        value={state}
        onChange={(evt) => setState(evt.target.value)}
      >
        <option value="" disabled>Pick one</option>
        {options}
      </select>
    </label>
  );
}

SelectInput.propTypes = {
  selectID: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  optionList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  addlLabelClasses: PropTypes.string,
  addlSelectClasses: PropTypes.string,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  addlLabelClasses: undefined,
  addlSelectClasses: undefined,
};
