// Pet's energy and happiness stats
function Stat({ statName, stat, setStat }) {
  // eslint-disable-next-line prefer-const
  let intervalID = null;
  // Add stat data to local storage or update if already present. Updates whenever stat changes.
  React.useEffect(() => {
    localStorage.setItem(statName, stat);
  }, [stat]);

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
    intervalID = setInterval(decreaseStat, (20 * 1000));
    return () => {
      clearInterval(intervalID);
    };
  });

  return (
    <Card id={statName} color="accent" addlClasses="text-center card-compact gap-0 mb-4 md:my-0">
      <div className="font-lcd text-xl">{statName}</div>

      <StatDisplay filledStat={stat} emptyStat={5 - stat} statName={statName} />
    </Card>
  );
}

Stat.propTypes = {
  statName: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  setStat: PropTypes.func.isRequired,
};
