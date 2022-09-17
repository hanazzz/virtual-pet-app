function AcctForm(props) {
  // LOGIC FOR LOG IN / CREATE ACCOUNT BUTTON
  // logInMethd tracks whether the user is logging into an existing account
  // or creating a new account (initla value is logging in)
  // EVENTUALLY SWITCH TO TRUE/FALSE
  const [logInMethd, setLogInMethd] = React.useState("Log in");
  // btnMsg is the button text to switch forms
  const [btnMsg, setBtnMsg] = React.useState("New user? Create an account instead.");

  // Whatever the current logInMethd is, this switches it to the opposite.
  // btnMsg updates accordingly
  function switchLogInMethd() {
    if (logInMethd == "Log in") {
      setLogInMethd("Create account");
      setBtnMsg("Already have an account? Log in instead.");
    } else if (logInMethd == "Create account") {
      setLogInMethd("Log in");
      setBtnMsg("New user? Create an account instead.");
    }
  }

  // DEFINE STATES FOR FORM FIELDS
  // Initial state value is empty string
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [password2, setPassword2] = React.useState("")
  const [userID, setUserID] = React.useState("")

  // FUNCTION FOR HANDLING SERVER RESPONSE
  function handleAcctServerResponse(responseJson) {
    let msg = responseJson["msg"];
    alert(msg);
    if (responseJson["status"]) {
      setUserID(responseJson["user_id"])
    }
  }

  // CALLBACK FUNCTION FOR FORM SUBMISSION
  // Prevents default behavior (page refresh)
  // and sends form data to server via Fetch re quest
  function submitForm(evt) {
    evt.preventDefault();
    // IF LOGGING IN
    if (logInMethd == "Log in") {
      let userData = {"username" : username, "password" : password};
      fetch("/login", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson => {
          handleAcctServerResponse(responseJson);
        }))
        
    // IF CREATING ACCOUNT
    } else if (logInMethd == "Create account") {
      let userData = {"username" : username, "email" : email, "password" : password, "password2" : password2};
      fetch("/create-user", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson => {
          handleAcctServerResponse(responseJson);
        }))
    }
  }



  // DEFINE FORMS
  // Have state for each form field.
  // Use onChange attribute for fields to update state with setState.
  // Use onSubmit for entire form to handle form submission.
  const logInForm = (<div>
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
      value={username}
      onChange={(evt) => setUsername(evt.target.value)} />
      <br />

      <label htmlFor="user-password">Password:</label>
      <input
      type="password"
      name="password"
      required="required"
      aria-required="true"
      id="user-password" 
      value={password}
      onChange={(evt) => setPassword(evt.target.value)}/>
      <br />

      <input type="submit" />
  </form>
  </div>);

  const createAcctForm = (<div>
  <h2>Create Account</h2>

  <form onSubmit={(evt) => submitForm(evt)}>
      <label htmlFor="user-email-new">Email:</label>
      <input
      type="email"
      name="email"
      maxLength="254"
      required="required"
      aria-required="true"
      id="user-email-new"
      value={email}
      onChange={(evt) => setEmail(evt.target.value)} />
      <br />

      <label htmlFor="user-username-new">Username:</label>
      <input
      type="text"
      name="username"
      maxLength="30"
      required="required"
      aria-required="true"
      id="user-username-new"
      value={username}
      onChange={(evt) => setUsername(evt.target.value)} />
      <br />

      <label htmlFor="user-password-new">Password:</label>
      <input
      type="password"
      name="password"
      maxLength="30"
      required="required"
      aria-required="true"
      id="user-password-new"
      value={password}
      onChange={(evt) => setPassword(evt.target.value)} />
      <br />

      <label htmlFor="user-password-confirm">Confirm password:</label>
      <input
      type="password"
      name="password2"
      required="required"
      aria-required="true"
      id="user-password-confirm"
      value={password2}
      onChange={(evt) => setPassword2(evt.target.value)} />
      <br />

      <input type="submit" />
  </form>
  </div>);
  let form = null;

  // FORM LOGIC
  if (logInMethd == "Log in") {
    form = logInForm;
  } else if (logInMethd == "Create account") {
    form = createAcctForm;
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