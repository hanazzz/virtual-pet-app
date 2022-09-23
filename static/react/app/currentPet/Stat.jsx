// REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */
/* eslint-disable no-alert */

// eslint-disable-next-line no-unused-vars
function Stat(props) {
  // Get initialStat from petData (which is from db)
  const { initialStat, statName, statInteraction } = props;

  // If stat data is in local storage, set as initial  state value.
  // If not, use initialStat passed through as prop (data retrieved from db at user log in).
  const statInStorage = JSON.parse(localStorage.getItem(statName));
  const [stat, setStat] = React.useState(
    Number.isInteger(statInStorage) ? statInStorage : initialStat,
  );
  // eslint-disable-next-line prefer-const
  let intervalID = null;
  // Add stat data to local storage or update if already present. Updates whenever stat changes.
  React.useEffect(() => {
    localStorage.setItem(statName, stat);
  }, [stat]);

  console.log(`*** rendering Stat: ${statName} // ${stat} ***`);

  // SET UP TIMER
  // callback function for timer
  function decreaseStat() {
    if (stat > 0) {
      setStat((prevStat) => prevStat - 1);
    } else {
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
    <div id={statName} className="col">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <h4>{statName}: {stat}</h4>
      <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
      <br />
      <button type="button" onClick={interactWithPet}>{statInteraction}</button>
    </div>
  );
}

Stat.propTypes = {
  initialStat: PropTypes.number.isRequired,
  statName: PropTypes.string.isRequired,
  statInteraction: PropTypes.string.isRequired,
};
