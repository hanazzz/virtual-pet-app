/* eslint-disable react/forbid-prop-types */

// modalBtnCallback must return a promise and should NOT toggle the modal
function ModalBtn({
  modalID, modalBtnCallback,
  addlClasses, btnClassOverride, dataTip, btnID, children,
}) {
  function toggleModal() {
    document.getElementById(modalID).classList.toggle('modal-open');
  }

  const [loading, setLoading] = React.useState(false);

  function loadingModalCallback(evt) {
    setLoading(true);
    return modalBtnCallback(evt)
      .then(() => {
        setLoading(false);
        toggleModal();
      });
  }

  // If a modalBtnCallback parameter was provided, use loadingModalCallback
  // (combines modalBtnCallback, setting loading state, and closing modal)
  // Otherwise, just use toggleModal
  const modalCallback = modalBtnCallback ? loadingModalCallback : toggleModal;

  const btnClasses = loading ? `loading ${addlClasses}` : addlClasses;

  return (
    <Button
      btnClasses={btnClasses}
      btnClassOverride={btnClassOverride}
      onClick={modalCallback}
      dataTip={dataTip}
      id={btnID}
    >
      {loading ? 'Loading' : children}
    </Button>
  );
}

ModalBtn.propTypes = {
  modalID: PropTypes.string.isRequired,
  modalBtnCallback: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  addlClasses: PropTypes.string,
  btnClassOverride: PropTypes.bool,
  dataTip: PropTypes.string,
  btnID: PropTypes.string,
  children: PropTypes.any.isRequired,
};

ModalBtn.defaultProps = {
  modalBtnCallback: false,
  addlClasses: null,
  btnClassOverride: false,
  dataTip: null,
  btnID: undefined,
};
