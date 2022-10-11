// TODO: REMOVE THE BELOW BEFORE DEPLOYMENT
/* eslint-disable no-console */

// eslint-disable-next-line no-unused-vars
function Stat({ statName, statInteraction, stat, setStat }) {
  // eslint-disable-next-line prefer-const
  let intervalID = null;
  // Add stat data to local storage or update if already present. Updates whenever stat changes.
  React.useEffect(() => {
    localStorage.setItem(statName, stat);
  }, [stat]);

  console.log(`*** rendering Stat: ${statName} // ${stat} ***`);

  // SET UP TIMER
  // callback function for timer: decreases stat by 1
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
    intervalID = setInterval(decreaseStat, 10000);
    return () => {
      clearInterval(intervalID);
    };
  });

  // TODO: Remove before deployment
  // // interactWithPet() gets called on button click, increases stat by 1
  // function interactWithPet() {
  //   if (stat < 5) {
  //     setStat((prevStat) => prevStat + 1);
  //   }
  // }

  // <button type="button" onClick={interactWithPet}>{statInteraction}</button>

  // <div id={statName} className="flex flex-row items-center justify-between">
  //   <h3>{statName}</h3>
  //   <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
  // </div>

  return (
  // <div id={statName} className="text-center">
  //   <h3>{statName}</h3>

  //   <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
  // </div>

    <Card id={statName} color="accent" addlClasses="text-center card-compact">
      <h3>{statName}</h3>

      <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
    </Card>
  );
}

Stat.propTypes = {
  statName: PropTypes.string.isRequired,
  statInteraction: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  setStat: PropTypes.func.isRequired,
};
