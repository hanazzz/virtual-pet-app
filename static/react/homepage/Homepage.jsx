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

  // DEFINE STATES FOR FORM FIELDS
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  // If anything in local storage, clear it on initial render
  React.useEffect(() => {
    localStorage.clear();
  }, []);

  function showAlert(msg, alertClasses) {
    // Get alert DOM element
    const alert = document.querySelector('.alert');
    // Remove any previous alert classes
    alert.classList.remove('alert-info');
    alert.classList.remove('alert-success');
    alert.classList.remove('alert-warning');
    alert.classList.remove('alert-error');
    // Add any additional classes to alert
    alert.classList.add(alertClasses);
    // Remove 'hidden' class to show alert
    alert.classList.remove('hidden');
    // Get alert text box DOM element
    const alertText = document.querySelector('#alert-text');
    // Update alert text with msg
    alertText.innerText = msg;
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
        showAlert(msg, alertType);
        // console.log(alertClass);
        // const newAlert = createAlert(msg, alertClass);
        // console.log('new alert:', newAlert);
        // const newAlert = { msg, alertType };
        // setAlert(newAlert);
        // alert(msg);
        if (responseJson.status) {
          // Store username in local storage
          localStorage.setItem('username', responseJson.username);
          window.location.href = '/user/pet';
        }
      })
      .catch((error) => alert(error.toString()));
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
      <Alert alertID="homepage-alert" addlClasses="hidden" />

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
