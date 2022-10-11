function Heading2({ addlClasses, children }) {
  return (
    <h2 className={`text-3xl font-bold pt-6 pb-2 ${addlClasses}`}>
      {children}
    </h2>
  );
}

Heading2.propTypes = {
  addlClasses: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading2.defaultProps = {
  addlClasses: null,
};
