/* eslint-disable dot-notation */
// eslint-disable-next-line no-unused-vars
function Play(props) {
  const { setHappiness, happiness, setMood } = props;
  const [activitySlots, setActivitySlots] = React.useState([]);
  let activities = {};

  function handlePlayChoice(evt) {
    const activity = evt.target.id;
    const statChange = Number(activities[activity]['value']);
    const response = activities[activity]['response'];
    console.log(statChange);
    console.log(happiness + statChange);
    // Check to make sure stat doesn't go over 5 or under 0
    if ((happiness + statChange) <= 0) {
      setHappiness(0);
    } else if ((happiness + statChange) >= 5) {
      setHappiness(5);
    } else {
      setHappiness(happiness + statChange);
    }
    setMood(response);
  }

  function handlePlay() {
    fetch('/play')
      .then((response) => response.json())
      .then((responseJson) => {
        activities = responseJson;
        console.log(activities);
        const btns = Object.keys(activities).map((activity) => (
          <button
            type="button"
            id={activity}
            onClick={handlePlayChoice}
            data-bs-dismiss="modal"
          >
            {activity}
          </button>
        ));
        setActivitySlots(btns);
      });
  }

  return (
    <Modal modalID="test-modal" modalBnText="Test Modal!" clickCallback={undefined} >
      <h5>Modal Title</h5>
      <p>Modal Content</p>
    </Modal>
  );
}

Play.propTypes = {
  setHappiness: PropTypes.func.isRequired,
  happiness: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
};
