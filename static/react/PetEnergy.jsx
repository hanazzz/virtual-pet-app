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

// eslint-disable-next-line no-unused-vars
function PetEnergy(props) {
  console.log('***rendering PetEnergy***');

	// Get initialEnergy from petData (which is from db)
  const { initialEnergy } = props;
  PetEnergy.propTypes = {
    initialEnergy: PropTypes.number.isRequired,
  };

	// create state to track energy
  const [energy, setEnergy] = React.useState(initialEnergy);
  // eslint-disable-next-line prefer-const
  let energyInterval = null;

  console.log(energy);

  function decreaseEnergy() {
    console.log('Decrease energy funct');
    if (energy > 0) {
      console.log('updating energy');
      setEnergy((prevEnergy) => prevEnergy - 1);
    } else {
      console.log('clear interval funct', energyInterval);
      clearInterval(energyInterval);
    }
  }

  // Need to clearInterval on return (component unmounting) to avoid multiple clearInterval
  React.useEffect(() => {
    console.log('setting timer');
    energyInterval = setInterval(decreaseEnergy, 5000);
    return () => {
      console.log('useEffect return: clear int', energyInterval);
      clearInterval(energyInterval);
    };
  });

  function feedPet() {
    console.log('feeding pet');
    if (energy < 5) {
      setEnergy((prevEnergy) => prevEnergy + 1);
    }
  }

  return (
    <div>
      <h4>ENERGY</h4>
      <p>{energy}</p>
      <br />
      <button type="button" id="feed-pet" onClick={feedPet}>FEED PET</button>
    </div>
  );
}
