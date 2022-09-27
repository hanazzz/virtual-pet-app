/* eslint-disable dot-notation */
// eslint-disable-next-line no-unused-vars
function Play(props) {
  const { setHappiness, happiness, setMood } = props;
  const [activitySlots, setActivitySlots] = React.useState([]);
  let activities = {};

  function handlePlayChoice(evt) {
    const activity = evt.target.id;
    const statChange = Number(activities[activity]['value']);
    const response = activities;
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
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target="#activity-modal" onClick={handlePlay}>
        Play with options
      </button>

      <div className="modal fade" id="activity-modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">PLAY</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {activitySlots}
              <br />
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            {/* <div className="modal-footer">
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

Play.propTypes = {
  setHappiness: PropTypes.func.isRequired,
  happiness: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
};
