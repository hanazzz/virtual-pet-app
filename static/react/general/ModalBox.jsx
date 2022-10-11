/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalBox({ modalID, children }) {
  return (
    <div id={modalID} className="modal w-screen">
      <div className="modal-box">
        {children}
      </div>
    </div>
  );
}

ModalBox.propTypes = {
  modalID: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
