/* eslint-disable react/jsx-no-bind */
/* eslint-disable dot-notation */
// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function Feed(props) {
  const { setEnergy, energy, setMood } = props;
  const [interactionBtns, setInteractionBtns] = React.useState([]);
  let foods = {};

  // When user selects food item, update pet's energy and response
  // and tell server which item was used to update user inventory
  function handleFoodChoice(evt) {
    // Get the food item the user selected
    const foodChoice = evt.target.id;
    const statChange = Number(foods[foodChoice]['value']);
    // eslint-disable-next-line prefer-destructuring
    const response = foods[foodChoice]['response'];
    console.log(statChange);
    console.log(energy + statChange);
    fetch('/update-inventory', {
      method: 'POST',
      body: JSON.stringify(foodChoice),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // Check to make sure energy doesn't go over 5 or under 0
        if ((energy + statChange) <= 0) {
          setEnergy(0);
        } else if ((energy + statChange) >= 5) {
          setEnergy(5);
        } else {
          setEnergy(energy + statChange);
        }
        setMood(response);
      });
  }

  // Get food options from server
  function handleInteraction() {
    fetch('/feed')
      .then((response) => response.json())
      .then((responseJson) => {
        foods = responseJson;
        console.log(foods);
        // Make button for each option
        const btns = Object.keys(foods).map((food) => (
          <button
            type="button"
            id={food}
            key={food}
            onClick={handleFoodChoice}
            data-bs-dismiss="modal"
          >
            {food}
          </button>
        ));
        setInteractionBtns(btns);
      });
  }

  return (
    <Modal modalID="feed-pet" modalBnText="FEED PET" clickCallback={handleInteraction}>
      <h5 className="modal-title">Feed Pet</h5>
      {interactionBtns}
    </Modal>
  );
}

// function Interaction(props) {
//   const { setStat, stat, setMood, interactionText, interactionType } = props;
//   const [interactionBtns, setInteractionBtns] = React.useState([]);
//   let foods = {};

//   function handleChoice(evt) {
//     const interaction = evt.target.id;
//     const statChange = Number(foods[interaction]['value']);
//     // eslint-disable-next-line prefer-destructuring
//     const response = foods[interaction]['response'];
//     console.log(statChange);
//     console.log(stat + statChange);
//     fetch('/update-inventory', {
//       method: 'POST',
//       body: JSON.stringify(interaction),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(() => {
//         // Check to make sure stat doesn't go over 5 or under 0
//         if ((stat + statChange) <= 0) {
//           setStat(0);
//         } else if ((stat + statChange) >= 5) {
//           setStat(5);
//         } else {
//           setStat(stat + statChange);
//         }
//         setMood(response);
//       });
//   }

//   function handleInteraction() {
//     fetch('/feed')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         foods = responseJson;
//         console.log(foods);
//         const btns = Object.keys(foods).map((food) => (
//           <button
//             type="button"
//             id={food}
//             key={food}
//             onClick={handleChoice}
//             data-bs-dismiss="modal"
//           >
//             {food}
//           </button>
//         ));
//         setInteractionBtns(btns);
//       });
//   }

//   return (
//     <Modal modalID="feed-pet" modalBnText="FEED PET" onClick={handleInteraction}>
//       <h5 className="modal-title">Feed Pet</h5>
//       {interactionBtns}
//     </Modal>
//   );
// }

Feed.propTypes = {
  setEnergy: PropTypes.func.isRequired,
  energy: PropTypes.number.isRequired,
  setMood: PropTypes.func.isRequired,
};
