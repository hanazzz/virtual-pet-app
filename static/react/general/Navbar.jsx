function Navbar({ username }) {
  const visibility = username ? 'visible' : 'invisible';
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

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <p className="normal-case text-xl">Virtual Pet App</p>
      </div>

      <div id="navbar-user-info" className={`navbar-end text-sm ${visibility}`}>
        <div className="px-4">
          <p>Logged in as {username}</p>
        </div>

        <div className="dropdown dropdown-end dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost"><i className="fa-solid fa-gear" /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Switch between F and C</a></li>
            <li><a>Rename pet</a></li>
            <li><a>Delete pet</a></li>
            <li><a>Delete account</a></li>
          </ul>
        </div>

        <div>
          <Button
            onClick={handleLogout}
            btnClass="btn-ghost"
          >
            Log out
          </Button>
          {/* <a className="btn btn-ghost" href="/user/logout" onClick={((evt) => handleLogout(evt))}>Log out</a> */}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
};

Navbar.defaultProps = {
  username: undefined,
};
