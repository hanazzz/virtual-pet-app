// Visual display of pet stat (e.g. energy, happiness)
// eslint-disable-next-line no-unused-vars
function StatDisplay(props) {
  const { filledStat, emptyStat, statName } = props;

  // Create an array with n "undefined" slots
  // Use .map() to create a new array with n square elements
  const filledStatSquares = [...Array(filledStat)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className="fa-solid fa-square stat-square" key={idx} />
  ));
  const emptyStatSquares = [...Array(emptyStat)].map((value, idx) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className="fa-regular fa-square stat-square" key={idx} />
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
