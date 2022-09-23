function Navbar(props) {
  const { username } = props;

  let navbarUserInfo = (
    // eslint-disable-next-line react/jsx-one-expression-per-line
    <> *** <a href="/logout">LOG OUT</a> *** Logged in as: {username}</>
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
