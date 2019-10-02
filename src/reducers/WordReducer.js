const initialState = {letters:[], unguessed:[]};
const WordReducer =(state = initialState, action) =>{
  switch (action.type) {
    case 'FETCH WORD':
         return {...state, letters: action.payload[0], unguessed:action.payload[1]}
      case "ATTEMPT SUCCESSFULL":

        return {...state, unguessed: state.unguessed.filter(el=>el!==action.payload)}
      case 'RESTART':
      return initialState
    default:
    return state
  }
}

export default WordReducer;
