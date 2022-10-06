function Navbar({ username, tempInF, setTempInF }) {
  const navbarUserInfo = !username ? null : (
  // If user is logged in, displaying following in navbar
    <div id="navbar-user-info" className="navbar-end text-sm">
      <div className="px-4">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p>Logged in as {username}</p>
      </div>

      <Settings tempInF={tempInF} setTempInF={setTempInF} />

      <div>
        <Logout />
      </div>
    </div>
  );

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <p className="normal-case text-xl">Virtual Pet App</p>
      </div>

      {navbarUserInfo}
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
  tempInF: PropTypes.bool.isRequired,
  setTempInF: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  username: undefined,
};
