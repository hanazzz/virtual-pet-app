function WorkerTest() {
  const keywords = ['cat', 'bat', 'rat', 'sat', 'hat'];

  function handleClick() {
    const myWorker = new Worker('../static/worker.js');
    myWorker.postMessage(keywords);
    console.log('Message posted to worker');
    myWorker.onerror = (err) => alert(err);
    myWorker.onmessage = (evt) => {
      console.log('Message received from worker');
      console.log(evt);
      console.log(evt.data);
      const keywordsUpper = evt.data;
      myWorker.terminate();
      alert(keywordsUpper);
    };
  }

  return (
    <button type="button" onClick={handleClick} className="btn">
      Click me!
    </button>
  );
}
