/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function Button({ btnClasses, btnClassOverride, onClick, id, isDisabled, isFocused, children }) {
  // If btnClassOverride is true, only use classes provided in btnClasses prop.
  // Else: Use 'btn' class and add btnClasses as additional classes
  const classList = btnClassOverride ? btnClasses : `btn ${btnClasses}`;

  return (
    <button
      className={classList}
      type="button"
      id={id}
      // key={id}
      onClick={onClick}
      disabled={isDisabled}
      autoFocus={isFocused}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  btnClasses: PropTypes.string,
  btnClassOverride: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  btnClasses: '',
  btnClassOverride: false,
  id: undefined,
  isDisabled: false,
  isFocused: false,
};
