/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
function Alert({ alertID, addlClasses, children }) {
  function toggleAlert() {
    document.getElementById(alertID).classList.toggle('hidden');
  }

  return (
    <div id={alertID} className={`alert rounded-none hidden ${addlClasses}`} key={children}>
      <div id="alert-text">
        <span>{children}</span>
      </div>
      <div className="flex-none">
        <Button
          btnClasses="btn-sm"
          type="button"
          onClick={toggleAlert}
        >
          X
        </Button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  alertID: PropTypes.string,
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  alertID: null,
  addlClasses: null,
};
