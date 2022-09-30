/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function Button({ onClick, id, key, children, btnClass }) {
  // TODO: Need to figure out how to pass in keys

  return (
    <button
      className={`btn ${btnClass}`}
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
  btnClass: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  key: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  btnClass: '',
  id: undefined,
  key: undefined,
};
