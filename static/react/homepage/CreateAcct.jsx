// eslint-disable-next-line no-unused-vars
function CreateAcct({
  username, setUsername, password, setPassword,
  email, setEmail, password2, setPassword2, submitForm,
}) {
  return (
    <Form submitCallback={submitForm}>
      <Heading2>Create Account</Heading2>
      <label htmlFor="email" className="label label-text flex flex-col">
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
          className="input input-bordered"
        />
      </label>

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
          minLength="8"
          required="required"
          aria-required="true"
          autoComplete="new-password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          className="input input-bordered"
        />
      </label>

      <label htmlFor="password-confirm" className="label label-text flex flex-col">
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
          className="input input-bordered"
        />
      </label>

      <input type="submit" value="Create account" className="btn btn-primary mt-6 mb-2 md:mb-0" />
    </Form>
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
