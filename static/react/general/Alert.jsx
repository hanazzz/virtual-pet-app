/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
function Alert({ alertID, addlClasses, children }) {
  function closeAlert() {
    document.getElementById(alertID).classList.add('hidden');
  }

  return (
    <div id={alertID} className={`alert rounded-none  ${addlClasses}`} key={alertID} role="alert">
      <div id="alert-text">
        <span>{children}</span>
      </div>
      <div className="flex-none">
        <Button
          btnClasses="btn-sm"
          type="button"
          onClick={closeAlert}
        >
          X
        </Button>
      </div>
    </div>
  );
}

Alert.propTypes = {
  alertID: PropTypes.string.isRequired,
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  addlClasses: null,
};
