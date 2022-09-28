function Navbar({ username }) {
  function handleLogout(evt) {
    // prevent page refresh
    evt.preventDefault();

    // send energy and happiness to db
    // Get current stats from local storage
    const currentStats = {
      currentEnergy: localStorage.getItem('energy'),
      currentHappiness: localStorage.getItem('happiness'),
    };

    fetch('/user/logout', {
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
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        Logged in as: {username}
      </div>
      <div className="col">
        * * *
      </div>
      <div className="col">
        <a href="/user/logout" onClick={(evt) => handleLogout(evt)}>LOG OUT</a>
      </div>
    </>
  );

  if (!username) {
    navbarUserInfo = null;
  }

  return (
    <nav className="row">
      <div className="col">
        VIRTUAL PET APP
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
