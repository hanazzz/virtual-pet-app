/* eslint-disable dot-notation */

// User interactions with pet (feed, play)
function Interaction({ setStat, stat, setMood, interactionText, interactionType }) {
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let interactions = {};
  const modalID = `${interactionType}-modal`;
  const interactionIcon = interactionType === 'feed' ? 'utensils' : 'gamepad';
  let instructions;
  if (interactionType === 'feed') {
    instructions = 'Pick an item from your inventory to feed your pet.';
  } else {
    instructions = 'Pick an activity to do with your pet.';
  }

  // Change pet stat according to interaction result
  function handleStatChange(statChange, response) {
    // Close modal
    // document.getElementById(modalID).classList.toggle('modal-open');
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

  // eslint-disable-next-line consistent-return
  function handleChoice(evt) {
    const interaction = evt.target.id;
    const statChange = Number(interactions[interaction]['value']);
    // eslint-disable-next-line prefer-destructuring
    const response = `Hm, ${interaction}? ${interactions[interaction]['response']}`;
    if (interactionType === 'play') {
      handleStatChange(statChange, response);
      // Need to return a promise for ModalBtn to work
      return Promise.resolve();
    } else if (interactionType === 'feed') {
      return fetch('/user/inventory/update', {
        method: 'POST',
        body: JSON.stringify(interaction),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          handleStatChange(statChange, response);
        });
    }
  }

  function handleInteraction() {
    return fetch(`/pet/${interactionType}`)
      .then((response) => response.json())
      .then((responseJson) => {
        interactions = responseJson;
        const btns = Object.keys(interactions).map((interaction) => (
          <ModalBtn
            btnID={interaction}
            key={interaction}
            modalBtnCallback={handleChoice}
            addlClasses="btn-lg my-4 btn-primary"
            modalID={modalID}
          >
            {interaction}
          </ModalBtn>
        ));
        setInteractionBtns(btns);
      });
  }

  // React.useEffect((handleInteraction), [stat]);

  return (
    <>
      {/* Interaction button that appears on main page */}
      <ModalBtn
        modalID={modalID}
        modalBtnCallback={handleInteraction}
        addlClasses="btn-lg btn-primary tooltip tooltip-primary content-center p-12 my-4 md:my-0"
        dataTip={interactionText}
      >
        <i className={`fa-solid fa-${interactionIcon} text-4xl pr-0`} title={interactionText} />
      </ModalBtn>

      {/* Modal box with interaction options */}
      <ModalBox modalID={modalID}>
        <ModalTitle>
          {interactionText}
        </ModalTitle>

        <div className="flex flex-col items-center text-center">
          <p>{instructions}</p>
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
