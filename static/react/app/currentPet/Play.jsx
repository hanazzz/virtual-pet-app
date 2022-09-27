/* eslint-disable dot-notation */
// eslint-disable-next-line no-unused-vars
function Play(props) {
  const { setStat, stat, setMood, interactionText, interactionType } = props;
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let interactions = {};

  function handleChoice(evt) {
    const interaction = evt.target.id;
    const statChange = Number(interactions[interaction]['value']);
    const response = interactions[interaction]['response'];
    console.log(statChange);
    console.log(stat + statChange);
    if (interactionType === 'feed') {
      fetch('/update-inventory', {
        method: 'POST',
        body: JSON.stringify(interaction),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          // Check to make sure stat doesn't go over 5 or under 0
          if ((stat + statChange) <= 0) {
            setStat(0);
          } else if ((stat + statChange) >= 5) {
            setStat(5);
          } else {
            setStat(stat + statChange);
          }
          setMood(response);
        });
    } else {
      // Check to make sure stat doesn't go over 5 or under 0
      if ((stat + statChange) <= 0) {
        setStat(0);
      } else if ((stat + statChange) >= 5) {
        setStat(5);
      } else {
        setStat(stat + statChange);
      }
      setMood(response);
    }
  }

  function handleInteraction() {
    fetch(`/${interactionType}`)
      .then((response) => response.json())
      .then((responseJson) => {
        interactions = responseJson;
        console.log(interactions);
        const btns = Object.keys(interactions).map((interaction) => (
          <button
            type="button"
            id={interaction}
            key={interaction}
            onClick={handleChoice}
            data-bs-dismiss="modal"
          >
            {interaction}
          </button>
        ));
        setInteractionBtns(btns);
      });
  }

  return (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target={`#${interactionType}-modal`} onClick={handleInteraction}>
        {interactionText}
      </button>

      <div className="modal fade" id={`${interactionType}-modal`} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{interactionText}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {interactionBtns}
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
  setStat: PropTypes.func.isRequired,
  stat: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
  interactionText: PropTypes.string.isRequired,
  interactionType: PropTypes.string.isRequired,
};
