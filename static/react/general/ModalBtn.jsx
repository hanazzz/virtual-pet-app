/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalBtn({ modalID, modalBtnCallback, classOverride, children }) {
  function toggleModal() {
    document.getElementById(modalID).classList.toggle('modal-open');
  }

  const modalCallback = modalBtnCallback || toggleModal;

  return (
    <Button
      btnClass="modal-button"
      classOverride={classOverride}
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
  classOverride: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

ModalBtn.defaultProps = {
  modalBtnCallback: false,
  classOverride: false,
};
