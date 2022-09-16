function AcctForm(props) {
  // LOGIC FOR LOG IN / CREATE ACCOUNT BUTTON
  const [logInMethd, setLogInMethd] = React.useState("Log in");
  const [btnMsg, setBtnMsg] = React.useState("New user? Create an account instead.");

  function switchLogInMethd() {
    if (logInMethd == "Log in") {
      setLogInMethd("Create account");
      setBtnMsg("Already have an account? Log in instead.");
    } else if (logInMethd == "Create account") {
      setLogInMethd("Log in");
      setBtnMsg("New user? Create an account instead.");
    }
  }

  // DEFINE FORMS
  const logInForm = (<div>
  <h2>Log In</h2>
  <form action="/login" method="POST">
      <label htmlFor="user-username">Username:</label>
      <input type="text" name="username" maxLength="30" required="required" aria-required="true" id="user-username" /><br />

      <label htmlFor="user-password">Password:</label>
      <input type="password" name="password" required="required" aria-required="true" id="user-password" />

      <input type="submit" />
  </form>
  </div>);

  const createAcctForm = (<div>
  <h2>Create Account</h2>

  <form action="/create-user" method="POST">
      <label htmlFor="user-email-new">Email:</label>
      <input type="email" name="email" maxLength="254" required="required" aria-required="true" id="user-email-new" /><br />

      <label htmlFor="user-username-new">Username:</label>
      <input type="text" name="username" maxLength="30" required="required" aria-required="true" id="user-username-new" /><br />

      <label htmlFor="user-password-new">Password:</label>
      <input type="password" name="password" maxLength="30" required="required" aria-required="true" id="user-password-new" /><br />

      <label htmlFor="user-password-confirm">Confirm password:</label>
      <input type="password" name="password2" required="required" aria-required="true" id="user-password-confirm" />

      <input type="submit" />
  </form>
  </div>);
  let form = "null";

  // FORM LOGIC
  if (logInMethd == "Log in") {
    form = logInForm;
    console.log(form);
  } else if (logInMethd == "Create account") {
    form = createAcctForm;
    console.log(form);
  }

  return (
    <div>
      {form}
      {/* {logInMethd == "Log in" && logInForm}
      {logInMethd == "Create account" && createAcctForm} */}
      <br />
      <button type="button" onClick={switchLogInMethd}>
        {btnMsg} (Currently: {logInMethd})
      </button>
    </div>
  )
}


ReactDOM.render(<AcctForm />, document.querySelector("#app"));