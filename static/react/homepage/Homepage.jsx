/* eslint-disable react/jsx-no-bind */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function AcctForm() {
  // LOGIC FOR LOG IN / CREATE ACCOUNT BUTTON
  // logInMethd tracks whether the user is logging into an existing account (true)
  // or creating a new account (false)
  const [logInMethd, setLogInMethd] = React.useState(true);
  const logInMsg = 'New user? Create an account instead.';
  const createAcctMsg = 'Already have an account? Log in instead.';

  // Whatever the current logInMethd is, this switches it to the opposite.
  function toggleLogInMethd() {
    setLogInMethd((prevMethd) => !prevMethd);
  }

  // alertList holds list of alerts to display to user
  const [alertList, setAlertList] = React.useState([]);

  // DEFINE STATES FOR FORM FIELDS
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  // If anything in local storage, clear it on initial render
  React.useEffect(() => {
    localStorage.clear();
  }, []);

  // Create new alert and add to alertList
  function addAlert(msg, alertClasses) {
    const alertNum = alertList.length;
    const alert = (
      <Alert alertID={`login-alert=${alertNum}`} addlClasses={alertClasses}>
        {msg}
      </Alert>
    );
    setAlertList((prevList) => prevList.concat(alert));
  }

  // CALLBACK FUNCTION FOR FORM SUBMISSION
  // Prevents default behavior (page refresh)
  // and sends form data to server via Fetch re quest
  function submitForm(evt) {
    evt.preventDefault();
    const userData = {
      username,
      email,
      password,
      password2,
    };
    const route = logInMethd ? '/user/login' : '/user/create';

    fetch(`${route}`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const { msg } = responseJson;
        const alertType = msg.startsWith('ERROR') ? 'alert-warning' : 'alert-success';
        addAlert(msg, alertType);
        // showAlert(msg, alertType);
        if (responseJson.status) {
          // Store username in local storage
          localStorage.setItem('username', responseJson.username);
          window.location.href = '/user/pet';
        }
      })
      .catch((error) => addAlert(error, 'alert-error'));
  }

  // FORM LOGIC
  let form = (
    <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      submitForm={submitForm}
    />
  );

  if (!logInMethd) {
    form = (
      <CreateAcct
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        password2={password2}
        setPassword2={setPassword2}
        submitForm={submitForm}
      />
    );
  }

  return (
    <>
      {/* <Alert alertID="homepage-alert" addlClasses="hidden" /> */}

      {alertList}

      <Navbar />

      <main className="px-10 py-6">
        <Heading1>[App Name]</Heading1>
        <p>A very cool description of this app.</p>

        {/* <Alert alertID="homepage-alert" addlClasses="hidden" /> */}

        {form}

        <Button onClick={toggleLogInMethd}>
          {logInMethd ? logInMsg : createAcctMsg}
        </Button>
      </main>
    </>
  );
}

ReactDOM.render(<AcctForm />, document.querySelector('#access'));
