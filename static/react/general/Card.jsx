/* eslint-disable react/forbid-prop-types */
function Card({ id, color, addlClasses, addlBodyClasses, children }) {
  return (
    <div id={id} key={id} className={`card bg-${color} text-${color}-content ${addlClasses}`}>
      <div className={`card-body ${addlBodyClasses}`}>
        {children}
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string.isRequired,
  addlClasses: PropTypes.string,
  addlBodyClasses: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Card.defaultProps = {
  id: null,
  addlClasses: null,
  addlBodyClasses: null,
};
