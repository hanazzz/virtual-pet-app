function CreateAccount() {

    return (
        <div>
            <h2>Create Account</h2>
            
            <form action="/create-user" method="POST">
                <label for="user-email-new">Email:</label>
                <input type="email" name="email" maxlength="254" required="required" aria-required="true" id="user-email-new" /><br />

                <label for="user-username-new">Username:</label>
                <input type="text" name="username" maxlength="30" required="required" aria-required="true" id="user-username-new" /><br />

                <label for="user-password-new">Password:</label>
                <input type="password" name="password" maxlength="30" required="required" aria-required="true" id="user-password-new" /><br />

                <label for="user-password-confirm">Confirm password:</label>
                <input type="password" name="password2" required="required" aria-required="true" id="user-password-confirm" />

                <input type="submit" />
            </form>
        </div>
    )

}

// function logIn() {

// }

// ReactDOM.render(<CreateAccount />, document.querySelector("#app"));

function Hello() {
    return (
      <ul>
        <li>Hi World!</li>
      </ul>
    );
  }

ReactDOM.render(<Hello />, document.querySelector('#root'));