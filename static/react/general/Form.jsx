function Form({ submitCallback, children }) {
  return (
    <form className="bg-base-200 w-full md:w-3/4 mx-auto p-3 my-3 md:p-6 md:my-6 rounded-2xl" onSubmit={(evt) => submitCallback(evt)}>
      {children}
    </form>
  );
}

Form.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
