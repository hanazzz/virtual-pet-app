function Heading1({ addlClasses, children }) {
  return (
    <h1 className={`text-5xl font-bold ${addlClasses}`}>
      {children}
    </h1>
  );
}

Heading1.propTypes = {
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading1.defaultProps = {
  addlClasses: null,
};
