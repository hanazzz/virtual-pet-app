/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalBtn({ modalID, modalBtnCallback, addlClasses, btnClassOverride, children }) {
  function toggleModal() {
    document.getElementById(modalID).classList.toggle('modal-open');
  }

  const modalCallback = modalBtnCallback || toggleModal;

  return (
    <Button
      btnClass="modal-button"
      btnClasses={addlClasses}
      btnClassOverride={btnClassOverride}
      onClick={modalCallback}
    >
      {children}
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
  children: PropTypes.any.isRequired,
};

ModalBtn.defaultProps = {
  modalBtnCallback: false,
  addlClasses: null,
  btnClassOverride: false,
};
