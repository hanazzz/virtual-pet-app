/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function Button({ btnClasses, classOverride, onClick, id, key, children }) {
  // TODO: Need to figure out how to pass in keys

  // If classOverride is true, only use classes provided in btnClasses prop.
  // Else: Use 'btn' class and add btnClasses as additional classes
  const classList = classOverride ? btnClasses : `btn ${btnClasses}`;

  return (
    <button
      className={classList}
      type="button"
      id={id}
      key={key}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  btnClasses: PropTypes.string,
  classOverride: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  key: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  btnClasses: '',
  classOverride: false,
  id: undefined,
  key: undefined,
};
