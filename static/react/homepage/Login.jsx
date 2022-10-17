// Log in form
function Login({ username, setUsername, password, setPassword, submitForm }) {
  return (
    <Form submitCallback={submitForm}>
      <Heading2>Log In</Heading2>
      <label htmlFor="username" className="label label-text flex flex-col">
        Username:
        <input
          type="text"
          name="username"
          id="username"
          maxLength="30"
          required="required"
          aria-required="true"
          autoComplete="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          className="input input-bordered"
        />
      </label>

      <label htmlFor="password" className="label label-text flex flex-col">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          required="required"
          aria-required="true"
          autoComplete="current-password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="input input-bordered"
        />
      </label>

      <input type="submit" value="Log in" className="btn btn-primary mt-6 mb-2 md:mb-0" />
    </Form>
  );
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
