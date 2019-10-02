const WrongChoice = (letter) => ({
  type: 'ATTEMPT FAILED',
  payload: letter
});


export default WrongChoice;
