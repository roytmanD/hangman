const initialState = { attempts:0, failed: [],  successful: []};

const AttemptsReducer = (state = initialState, action) =>{
  switch (action.type) {
    case "ATTEMPT SUCCESSFULL":
      return {
        ...state,
          attempts:state.attempts+1,
          successful: Array.from(new  Set(state.successful).add(action.payload))

      }
      case "ATTEMPT FAILED":
      return {
        ...state,
          attempts:state.attempts+1,
          failed: state.failed.concat(action.payload)
      }
      case 'RESTART':
      return initialState
    default:
      return state;
  }
}


export default AttemptsReducer;
