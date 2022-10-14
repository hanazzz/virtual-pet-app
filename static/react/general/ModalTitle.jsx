/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalTitle({ children }) {
  return (
    <div className="modal-title text-2xl font-bold mb-1">
      {children}
    </div>
  );
}

ModalTitle.propTypes = {
  children: PropTypes.any.isRequired,
};
