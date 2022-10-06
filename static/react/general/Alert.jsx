/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
function Alert({ alertID, children }) {
  function toggleAlert() {
    document.getElementById(alertID).classList.toggle('hidden');
  }

  return (
    <div id={alertID} className="alert shadow-lg">
      <div>
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
  alertID: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Alert.defaultProps = {

};
