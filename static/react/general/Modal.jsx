/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
function Modal({ modalID, modalBtnText, children, modalBtnCallback }) {
  function toggleModal() {
    document.getElementById(modalID).classList.toggle('modal-open');
  }

  const modalCallback = modalBtnCallback || toggleModal;

  return (
    <>
      {/* The button to open modal */}
      <Button
        btnClasses="modal-button"
        onClick={modalCallback}
      >
        {modalBtnText}
      </Button>

      {/* Modal box */}
      <div id={modalID} className="modal w-screen">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <Button
              btnClasses="modal-button"
              onClick={modalCallback}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  modalID: PropTypes.string.isRequired,
  modalBtnText: PropTypes.string.isRequired,
  modalBtnCallback: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  children: PropTypes.any.isRequired,
};

Modal.defaultProps = {
  modalBtnCallback: false,
};
