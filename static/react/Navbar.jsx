function Navbar(props) {
  const { username } = props;

  function handleLogout(evt) {
    // prevent page refresh
    evt.preventDefault();

    // send energy and happiness to db
    // Get current stats from local storage
    const currentStats = {
      currentEnergy: localStorage.getItem('energy'),
      currentHappiness: localStorage.getItem('happiness'),
    };

    fetch('/logout', {
      method: 'POST',
      body: JSON.stringify(currentStats),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((msg) => {
        // clear local storage
        alert(msg);
        window.location.href = '/';
      });
  }

  let navbarUserInfo = (
    // eslint-disable-next-line react/jsx-one-expression-per-line
    <> *** <a href="/logout" onClick={(evt) => handleLogout(evt)}>LOG OUT</a> *** Logged in as: {username}</>
  );

  if (!username) {
    navbarUserInfo = null;
  }

  return (
    <nav>
      NAVBAR GOES HERE
      ***
      SOME NAVBAR CONTENT
      {navbarUserInfo}
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
};

Navbar.defaultProps = {
  username: undefined,
};
