function Heading3({ addlClasses, children }) {
  return (
    <h3 className={`text-xl font-bold pb-2 ${addlClasses}`}>
      {children}
    </h3>
  );
}

Heading3.propTypes = {
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading3.defaultProps = {
  addlClasses: null,
};
