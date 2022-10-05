function myFunction(array) {
  const myList = array.map((word) => word.toUpperCase());

  return myList;
}

onmessage = (evt) => {
  console.log('Message received from main script');
  console.log(evt);
  console.log(evt.data);
  const keywords = evt.data;
  console.log(keywords);
  const keywordsUpper = myFunction(keywords);
  console.log('Posting message back to main script');
  console.log(keywordsUpper);
  postMessage(keywordsUpper);
};
