// Visual display of pet stat (e.g. energy, happiness)
// eslint-disable-next-line no-unused-vars

function StatDisplay({
  filledStat,
  statName,
}: {
  filledStat: number;
  statName: string;
}) {
  // Create an array with n "undefined" slots
  // Use .map() to create a new array with n square elements
  // const filledStatSquares = [...Array(filledStat)].map((value, idx) => (
  //   // eslint-disable-next-line react/no-array-index-key
  //   <i className="fa-solid fa-square stat-square" key={idx} />
  // ));
  // const emptyStatSquares = [...Array(emptyStat)].map((value, idx) => (
  //   // eslint-disable-next-line react/no-array-index-key
  //   <i className="fa-regular fa-square stat-square" key={idx} />
  // ));

  const squareClasses: Array<string> = Array(filledStat)
    .fill("fa-solid")
    .concat(Array(5 - filledStat).fill("fa-regular"));

  // [...Array(5)].map((_, i) => (
  //   <i
  //     className={`${
  //       i < filledStat ? "fa-solid" : "fa-regular"
  //     } fa-square stat-square`}
  //     key={i}
  //   />
  // ));

  return (
    <div id={`${statName}-display`}>
      {/* bds: make constants file with max stat */}
      {squareClasses.map((squareClass, index) => (
        <i className={`${squareClass} fa-square stat-square`} key={index} />
      ))}
    </div>
  );
}
