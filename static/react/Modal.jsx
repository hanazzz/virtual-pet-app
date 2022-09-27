/* eslint-disable react/forbid-prop-types */
function Modal(props) {
  const { modalID, modalBnText, clickCallback, children } = props;

  return (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target={`#${modalID}`} onClick={clickCallback}>
        {modalBnText}
      </button>

      <div className="modal fade" id={modalID} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {children}

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  modalID: PropTypes.string.isRequired,
  modalBnText: PropTypes.string.isRequired,
  clickCallback: PropTypes.func,
  children: PropTypes.any.isRequired,
};

Modal.defaultProps = {
  clickCallback: undefined,
};
