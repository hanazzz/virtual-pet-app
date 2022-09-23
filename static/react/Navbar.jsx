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
    <>
      <div className="col">
        * * *
      </div>
      <div className="col">
        <a href="/logout" onClick={(evt) => handleLogout(evt)}>LOG OUT</a>
      </div>
      <div className="col">
        * * *
      </div>
      <div className="col">
        Logged in as: {username}
      </div>
    </>
  );

  if (!username) {
    navbarUserInfo = null;
  }

  return (
    <nav className="row">
      <div className="col">
        NAVBAR GOES HERE
      </div>
      <div className="col">
        * * *
      </div>
      <div className="col">
        SOME NAVBAR CONTENT
      </div>
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
