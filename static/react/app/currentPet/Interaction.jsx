/* eslint-disable react/jsx-no-bind */
/* eslint-disable dot-notation */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

// eslint-disable-next-line no-unused-vars
function Interaction({ setStat, stat, setMood, interactionText, interactionType }) {
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let interactions = {};
  const modalID = `${interactionType}-modal`;
  const interactionIcon = interactionType === 'feed' ? 'utensils' : 'gamepad';

  function handleStatChange(statChange, response) {
    // Close modal
    document.getElementById(modalID).classList.toggle('modal-open');
    // Change stat
    if ((stat + statChange) <= 0) {
      setStat(0);
    } else if ((stat + statChange) >= 5) {
      setStat(5);
    } else {
      setStat(stat + statChange);
    }
    // Update pet mood
    setMood(response);
  }

  function handleChoice(evt) {
    const interaction = evt.target.id;
    const statChange = Number(interactions[interaction]['value']);
    // eslint-disable-next-line prefer-destructuring
    const response = `Hm, ${interaction}? ${interactions[interaction]['response']}`;
    console.log(statChange);
    console.log(stat + statChange);
    if (interactionType === 'feed') {
      fetch('/user/inventory/update', {
        method: 'POST',
        body: JSON.stringify(interaction),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          handleStatChange(statChange, response);
        });
    } else {
      handleStatChange(statChange, response);
    }
  }

  function handleInteraction() {
    document.getElementById(modalID).classList.toggle('modal-open');
    fetch(`/pet/${interactionType}`)
      .then((response) => response.json())
      .then((responseJson) => {
        interactions = responseJson;
        console.log(interactions);
        const btns = Object.keys(interactions).map((interaction) => (
          <Button
            id={interaction}
            onClick={handleChoice}
            btnClasses="btn-lg my-4 btn-primary"
          >
            {interaction}
          </Button>
        ));
        setInteractionBtns(btns);
      });
  }

  // React.useEffect((handleInteraction), [stat]);

  return (
    <>
      {/* Interaction button that appears on main page */}
      <ModalBtn modalID={modalID} modalBtnCallback={handleInteraction} addlClasses="btn-lg">
        <i className={`fa-solid fa-${interactionIcon} pr-2`} />
        {interactionText}
      </ModalBtn>

      {/* Modal box with interaction options */}
      <ModalBox modalID={modalID}>
        <ModalTitle>
          {interactionText}
        </ModalTitle>

        <div className="flex flex-col items-center">
          {interactionBtns}
        </div>

        <ModalFooter>
          <ModalBtn modalID={modalID} closeModal>
            Cancel
          </ModalBtn>
        </ModalFooter>
      </ModalBox>
    </>
  );
}

Interaction.propTypes = {
  setStat: PropTypes.func.isRequired,
  stat: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
  interactionText: PropTypes.string.isRequired,
  interactionType: PropTypes.string.isRequired,
};
