/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
function Alert({ alertID, addlClasses, children }) {
  function closeAlert() {
    document.getElementById(alertID).classList.add('hidden');
  }

  let borderColor;
  let alertIcon;

  if (addlClasses.includes('alert-info')) {
    // borderColor = ;
    alertIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  } else if (addlClasses.includes('alert-success')) {
    // borderColor = ;
    alertIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  } else if (addlClasses.includes('alert-warning')) {
    // borderColor = ;
    alertIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
  } else if (addlClasses.includes('alert-error')) {
    // borderColor = ;
    alertIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }

  // React.useEffect(() => {
  //   document.querySelector(alertID).focus();
  // }, []);

  return (
    <div
      id={alertID}
      className={`alert rounded-none border-l-8 ${addlClasses}`}
      role="alert"
    >
      <div id="alert-text">
        {alertIcon}
        <span>{children}</span>
      </div>
      <div className="flex-none">
        <Button
          btnClasses="btn-sm btn-ghost font-lg"
          type="button"
          onClick={closeAlert}
          isFocused
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
