function Navbar({ username, tempInF, setTempInF, addAlert }) {
  const navbarUserInfo = !username ? null : (
  // If user is logged in, displaying following in navbar
    <>
      {/* <div className="px-4">
        eslint-disable-next-line react/jsx-one-expression-per-line
        <p>Logged in as {username}</p>
      </div> */}

      <Settings tempInF={tempInF} setTempInF={setTempInF} addAlert={addAlert} />

      <div>
        <Logout addAlert={addAlert} />
      </div>
    </>
  );

  return (
    <nav className="navbar bg-neutral text-neutral-content px-4">
      <div className="navbar-start">
        <p className="normal-case text-xl">BitBuddy</p>
      </div>

      <div className="navbar-end text-sm">
        <About />

        {navbarUserInfo}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
  tempInF: PropTypes.bool.isRequired,
  setTempInF: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  username: undefined,
};
