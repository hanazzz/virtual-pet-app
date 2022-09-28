// eslint-disable-next-line no-unused-vars
function Login({ username, setUsername, password, setPassword, submitForm }) {
  return (
    <div id="login" className="row">
      <h2>Log In</h2>
      <form onSubmit={(evt) => submitForm(evt)}>
        <label htmlFor="username">
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
          />
        </label>
        <br />

        <label htmlFor="password">
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
          />
        </label>
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
