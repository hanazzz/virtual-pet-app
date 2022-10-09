function Form({ submitCallback, children }) {
  return (
    <form className="bg-base-200 p-6 m-6 rounded-2xl" onSubmit={(evt) => submitCallback(evt)}>
      {children}
    </form>
  );
}

Form.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
