/* eslint-disable react/jsx-no-bind */
/* eslint-disable dot-notation */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function Play({ setHappiness, happiness, setMood }) {
  // const { setStat, stat, setMood, interactionText, interactionType } = props;
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let activities = {};

  function handlePlayChoice(evt) {
    // Get activity the user selected
    const activityChoice = evt.target.id;
    const statChange = Number(activities[activityChoice]['value']);
    // eslint-disable-next-line prefer-destructuring
    const response = activities[activityChoice]['response'];
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

  function handleInteraction() {
    fetch('/play')
      .then((response) => response.json())
      .then((responseJson) => {
        activities = responseJson;
        console.log(activities);
        const btns = Object.keys(activities).map((activity) => (
          <button
            type="button"
            id={activity}
            key={activity}
            onClick={handlePlayChoice}
            data-bs-dismiss="modal"
          >
            {activity}
          </button>
        ));
        setInteractionBtns(btns);
      });
  }

  return (
    <Modal modalID="play-modal" modalBnText="PLAY WITH PET" clickCallback={handleInteraction}>
      <h5 className="modal-title">Play with Pet</h5>
      {interactionBtns}
    </Modal>
  );
}

Play.propTypes = {
  setHappiness: PropTypes.func.isRequired,
  happiness: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
};
