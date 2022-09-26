function Modal(props) {
  const {
    modalID, buttonPrompt, modalTitle, closeBtnText, actionBtnText, actionBtnFunction, children,
  } = props;

  return (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target={`#${modalID}`}>
        {buttonPrompt}
      </button>

      <div className="modal" id={modalID}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">{modalTitle}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              {children}
            </div>

            <div className="modal-footer">
              <button type="button" onClick={actionBtnFunction} data-bs-dismiss="modal">{actionBtnText}</button>
              <button type="button" data-bs-dismiss="modal">{closeBtnText}</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  modalID: PropTypes.string.isRequired,
  buttonPrompt: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  closeBtnText: PropTypes.string.isRequired,
  actionBtnText: PropTypes.string.isRequired,
  actionBtnFunction: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
