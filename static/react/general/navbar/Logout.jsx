/* eslint-disable react/jsx-no-bind */
// eslint-disable-next-line no-unused-vars
function Logout() {
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
    <Button
      onClick={handleLogout}
      btnClasses="btn-ghost"
    >
      Log out
    </Button>
  );
}
