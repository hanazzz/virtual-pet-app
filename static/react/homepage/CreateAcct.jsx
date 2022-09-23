// eslint-disable-next-line no-unused-vars
function CreateAcct(props) {
  const {
    username, setUsername,
    password, setPassword,
    email, setEmail,
    password2, setPassword2,
    submitForm,
  } = props;

  return (
    <div id="create-account" className="row">
      <h2>Create Account</h2>

      <form onSubmit={(evt) => submitForm(evt)}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            maxLength="254"
            required="required"
            aria-required="true"
            autoComplete="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </label>
        <br />

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
            minLength="8"
            required="required"
            aria-required="true"
            autoComplete="new-password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </label>
        <br />

        <label htmlFor="password-confirm">
          Confirm password:
          <input
            type="password"
            name="password2"
            id="password-confirm"
            minLength="8"
            required="required"
            aria-required="true"
            autoComplete="new-password"
            value={password2}
            onChange={(evt) => setPassword2(evt.target.value)}
          />
        </label>
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}

CreateAcct.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password2: PropTypes.string.isRequired,
  setPassword2: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};
