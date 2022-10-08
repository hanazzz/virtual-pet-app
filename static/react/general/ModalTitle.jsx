/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
function ModalTitle({ children }) {
  return (
    <div className="modal-title text-xl font-bold">
      {children}
    </div>
  );
}

ModalTitle.propTypes = {
  children: PropTypes.any.isRequired,
};
