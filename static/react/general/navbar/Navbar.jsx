function Navbar({ username, petData, setPetData }) {
  const navbarUserInfo = !username ? null : (
  // If user is logged in, displaying following in navbar
    <div id="navbar-user-info" className="navbar-end text-sm">
      <div className="px-4">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p>Logged in as {username}</p>
      </div>

      <Settings petData={petData} setPetData={setPetData} />

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
  petData: PropTypes.any.isRequired,
  setPetData: PropTypes.func,
};

Navbar.defaultProps = {
  username: undefined,
  setPetData: undefined,
};
