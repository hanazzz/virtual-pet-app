function AcctForm() {
  // LOGIC FOR LOG IN / CREATE ACCOUNT BUTTON
  // logInMethd tracks whether the user is logging into an existing account (true)
  // or creating a new account (false)
  const [logInMethd, setLogInMethd] = React.useState(true);
  const logInMsg = "New user? Create an account instead.";
  const createAcctMsg = "Already have an account? Log in instead.";

  // Whatever the current logInMethd is, this switches it to the opposite.
  function toggleLogInMethd() {
    setLogInMethd((prevMethd) => !prevMethd);
  }

  // DEFINE STATES FOR FORM FIELDS
  // Initial state value is empty string
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  // CALLBACK FUNCTION FOR FORM SUBMISSION
  // Prevents default behavior (page refresh)
  // and sends form data to server via Fetch re quest
  function submitForm(evt) {
    evt.preventDefault();
    const userData = {
      username: username,
      email: email,
      password: password,
      password2: password2,
    };
    let route = "/login";
    if (logInMethd === false) {
      route = "/create-user";
    }

    fetch(`${route}`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const msg = responseJson.msg;
        alert(msg);
        // If valid account, update userID state with user's ID
        if (responseJson.status) {
          window.location.href = "/pet";
        }
      })
      .catch((error) => alert(error.toSting()));
  }

  // DEFINE FORMS
  // Have state for each form field.
  // Use onChange attribute for fields to update state with setState.
  // Use onSubmit for entire form to handle form submission.
  const logInForm = (
    <div>
      <h2>Log In</h2>
      <form onSubmit={(evt) => submitForm(evt)}>
        <label htmlFor="user-username">Username:</label>
        <input
          type="text"
          name="username"
          maxLength="30"
          required="required"
          aria-required="true"
          id="user-username"
          autoComplete="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <br />

        <label htmlFor="user-password">Password:</label>
        <input
          type="password"
          name="password"
          required="required"
          aria-required="true"
          id="user-password"
          autoComplete="current-password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <br />

        <input type="submit" />
      </form>
    </div>
  );

  const createAcctForm = (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={(evt) => submitForm(evt)}>
        <label htmlFor="email-new">Email:</label>
        <input
          type="email"
          name="email"
          maxLength="254"
          required="required"
          aria-required="true"
          id="email-new"
          autoComplete="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <br />

        <label htmlFor="username-new">Username:</label>
        <input
          type="text"
          name="username"
          maxLength="30"
          required="required"
          aria-required="true"
          id="username-new"
          autoComplete="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <br />

        <label htmlFor="password-new">Password:</label>
        <input
          type="password"
          name="password"
          minLength="8"
          required="required"
          aria-required="true"
          id="password-new"
          autoComplete="new-password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <br />

        <label htmlFor="password-new-confirm">Confirm password:</label>
        <input
          type="password"
          name="password2"
          minLength="8"
          required="required"
          aria-required="true"
          id="password-new-confirm"
          autoComplete="new-password"
          value={password2}
          onChange={(evt) => setPassword2(evt.target.value)}
        />
        <br />

        <input type="submit" />
      </form>
    </div>
  );

  // FORM LOGIC
  const form = logInMethd ? logInForm : createAcctForm;

  return (
    <div>
      {logInMethd ? logInForm : createAcctForm}
      {/* {form} */}
      {/* {logInMethd == "Log in" && logInForm}
      {logInMethd == "Create account" && createAcctForm} */}
      <br />
      <button type="button" onClick={toggleLogInMethd}>
        {logInMethd ? logInMsg : createAcctMsg}
      </button>
    </div>
  );
}

ReactDOM.render(<AcctForm />, document.querySelector("#access"));
