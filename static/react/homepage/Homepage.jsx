// REMOVE THE BELOW BEFORE DEPLOYMENT
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
  // Initial state value is empty string
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

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
    const route = logInMethd ? '/login' : '/create-user';

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
        alert(msg);
        if (responseJson.status) {
          // Store username in local storage
          localStorage.setItem('username', responseJson.username);
          window.location.href = '/pet';
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
    <div>
      {form}
      <br />
      <button type="button" onClick={toggleLogInMethd}>
        {logInMethd ? logInMsg : createAcctMsg}
      </button>
    </div>
  );
}

ReactDOM.render(<AcctForm />, document.querySelector('#access'));
