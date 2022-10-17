// Display pet response ("mood") to user interactions
function Mood({ mood }) {
  // Function that add each character of a string to designated div after a specified amount of time
  // msg = message to display
  // speed = amount of time in milliseconds to wait between each character
  // elemID = ID of element in which to display message
  // idx = index of next character to display (initially starts at 0 by default)
  function typeWriter(msg, speed, elemID, idx = 0) {
    // while idx < length of msg
    if (idx < msg.length) {
      // Add next character from msg to element
      document.getElementById(elemID).innerHTML += msg.charAt(idx);
      // Wait speed-amount of time, then call typeWriter()
      // Increase idx by 1
      setTimeout(() => typeWriter(msg, speed, elemID, idx + 1), speed);
    }
  }

  // Call typeWriter() every time mood changes
  React.useEffect(() => {
    // Clear out element text
    document.getElementById('mood-text').innerHTML = null;
    typeWriter(mood, 50, 'mood-text');
  }, [mood]);

  return (
  // <Card id="mood" color="primary" addlClasses="card-compact text-xl h-3/5">
  //   <p id="mood-text" className="p-4 border-solid border-4 border-neutral" />
  // </Card>

    <div id="mood" className="text-primary-content text-xl bg-base-200 h-48 p-4 ">
      <p id="mood-text" className="border-solid border-2 border-gray-400 h-full p-4" />
    </div>
  );
}

Mood.propTypes = {
  mood: PropTypes.string.isRequired,
};
