/* global React PropTypes StatDisplay */

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
function Stat(props) {
  console.log('*** rendering stat ***');

  // Get initialStat from petData (which is from db)
  const { initialStat, statName, statInteraction } = props;
  Stat.propTypes = {
    initialStat: PropTypes.number.isRequired,
    statName: PropTypes.string.isRequired,
    statInteraction: PropTypes.string.isRequired,
  };

  const [stat, setStat] = React.useState(initialStat);
  // eslint-disable-next-line prefer-const
  let intervalID = null;

  // SET UP TIMER
  // callback function for timer
  function decreaseStat() {
    if (stat > 0) {
      setStat((prevStat) => prevStat - 1);
    } else {
      console.log('clear interval funct', intervalID);
      clearInterval(intervalID);
    }
  }

  // Use setInterval() on render to call decreaseStat() every n milliseconds
  // Need to clearInterval on return (component unmounting) to avoid multiple intervals
  React.useEffect(() => {
    intervalID = setInterval(decreaseStat, 5000);
    return () => {
      clearInterval(intervalID);
    };
  });

  // interactWithPet() gets called on button click, increases stat by 1
  function interactWithPet() {
    if (stat < 5) {
      setStat((prevStat) => prevStat + 1);
    }
  }

  return (
    <div id={statName}>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h4>{statName}: {stat}</h4>
      <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
      <br />
      <button type="button" onClick={interactWithPet}>{statInteraction}</button>
    </div>
  );
}
