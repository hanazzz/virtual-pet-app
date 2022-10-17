// Visual display of pet stat (e.g. energy, happiness)
function StatDisplay({ filledStat, emptyStat, statName }) {
  const icon = statName === 'Energy' ? 'bolt-lightning' : 'heart';

  // Create an array with n "undefined" slots
  // Use .map() to create a new array with n square elements
  const filledStatSquares = [...Array(filledStat)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className={`fa-solid fa-${icon} fa-2x px-2 py-1`} key={idx} />
  ));
  const emptyStatSquares = [...Array(emptyStat)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className={`fa-solid fa-${icon} text-neutral-400 fa-2x px-2 py-1`} key={idx} />
  ));

  return (
    <div id={`${statName}-display`}>
      {filledStatSquares}
      {emptyStatSquares}
    </div>
  );
}

StatDisplay.propTypes = {
  filledStat: PropTypes.number.isRequired,
  emptyStat: PropTypes.number.isRequired,
  statName: PropTypes.string.isRequired,
};
