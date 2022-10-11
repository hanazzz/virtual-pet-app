function Form({ submitCallback, children }) {
  return (
    <form className="bg-base-200 p-3 m-3 md:p-6 md:m-6 rounded-2xl" onSubmit={(evt) => submitCallback(evt)}>
      {children}
    </form>
  );
}

Form.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
