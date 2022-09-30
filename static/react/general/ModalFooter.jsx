/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalFooter({ children }) {
  return (
    <div className="modal-action">
      {children}
    </div>
  );
}

ModalFooter.propTypes = {
  children: PropTypes.any.isRequired,
};
