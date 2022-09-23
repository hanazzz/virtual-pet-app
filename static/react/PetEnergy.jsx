/* global React PropTypes */

// get current pet energy level

// create energy state, initial value is pet's current energy level

// use setInterval
// function - if energy > 0, decrease by 1
// delay = 1000 (1 second to start)

// update img: ??

// send current energy level to db on log out

// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

function EnergyDisplay(props) {
  const { energy } = props;
  const emptyEnergy = 5 - energy;
  EnergyDisplay.propTypes = {
    energy: PropTypes.number.isRequired,
  };

  // Create an array with n "undefined" slots
  // Use .map() to create a new array with n square elements
  const energySquares = [...Array(energy)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className="fa-solid fa-square energy-square" key={idx} />
  ));
  const emptyEnergySquares = [...Array(emptyEnergy)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className="fa-regular fa-square energy-square" key={idx} />
  ));

  return (
    <div id="energy-display">
      {energySquares}
      {emptyEnergySquares}
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function PetEnergy(props) {
  console.log('*** rendering PetEnergy ***');

  // Get initialEnergy from petData (which is from db)
  const { initialEnergy } = props;
  PetEnergy.propTypes = {
    initialEnergy: PropTypes.number.isRequired,
  };

  const [energy, setEnergy] = React.useState(initialEnergy);
  // eslint-disable-next-line prefer-const
  let energyInterval = null;

  // SET UP TIMER
  // callback function for timer
  function decreaseEnergy() {
    if (energy > 0) {
      setEnergy((prevEnergy) => prevEnergy - 1);
    } else {
      console.log('clear interval funct', energyInterval);
      clearInterval(energyInterval);
    }
  }

  // Use setInterval() on render to call decreaseEnergy() every n milliseconds
  // Need to clearInterval on return (component unmounting) to avoid multiple intervals
  React.useEffect(() => {
    energyInterval = setInterval(decreaseEnergy, 5000);
    return () => {
      clearInterval(energyInterval);
    };
  });

  // feedPet() gets called on button click, increases energy by 1
  function feedPet() {
    if (energy < 5) {
      setEnergy((prevEnergy) => prevEnergy + 1);
    }
  }

  return (
    <div id="energy">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h4>ENERGY: {energy}</h4>
      <EnergyDisplay energy={energy} />
      <br />
      <button type="button" id="feed-pet" onClick={feedPet}>FEED PET</button>
    </div>
  );
}
