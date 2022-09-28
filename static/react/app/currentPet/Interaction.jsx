/* eslint-disable dot-notation */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function Interaction(props) {
  const { setStat, stat, setMood, interactionText, interactionType } = props;
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let interactions = {};

  function handleStatChange(statChange, response) {
    if ((stat + statChange) <= 0) {
      setStat(0);
    } else if ((stat + statChange) >= 5) {
      setStat(5);
    } else {
      setStat(stat + statChange);
    }
    setMood(response);
  }

  function handleChoice(evt) {
    const interaction = evt.target.id;
    const statChange = Number(interactions[interaction]['value']);
    // eslint-disable-next-line prefer-destructuring
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
        .then(handleStatChange);
    } else {
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
    // eslint-disable-next-line react/jsx-no-bind
    <Modal modalID={`${interactionType}-modal`} modalBnText={interactionText} clickCallback={handleInteraction}>
      <h5 className="modal-title">{interactionText}</h5>
      {interactionBtns}
    </Modal>

  // <>
  // eslint-disable-next-line max-len
  //   <button type="button" data-bs-toggle="modal" data-bs-target={`#${interactionType}-modal`} onClick={handleInteraction}>
  //     {interactionText}
  //   </button>

  //   <div className="modal fade" id={`${interactionType}-modal`} tabIndex="-1" aria-hidden="true">
  //     <div className="modal-dialog">
  //       <div className="modal-content">
  //         <div className="modal-body">
  //           <h5 className="modal-title">{interactionText}</h5>
  //           {interactionBtns}
  //           <br />
  // eslint-disable-next-line max-len
  //           <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </>
  );
}

Interaction.propTypes = {
  setStat: PropTypes.func.isRequired,
  stat: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
  interactionText: PropTypes.string.isRequired,
  interactionType: PropTypes.string.isRequired,
};
