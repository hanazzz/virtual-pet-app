/* eslint-disable react/forbid-prop-types */
function Card({ id, color, addlClasses, children }) {
  return (
    <div id={id} className={`card bg-${color} text-${color}-content ${addlClasses}`}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string.isRequired,
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};