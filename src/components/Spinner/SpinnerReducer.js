

const initialState = {
  isSpinnerOn: true,
  usersSpinner: 0,
}

export const turnOnSpinner = () => dispatch =>

  dispatch({
      type: 'TURN_ON_SPINNER',
  });

export const turnOffSpinner = () => dispatch => 
  dispatch({
      type: 'TURN_OFF_SPINNER'
  });

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TURN_ON_SPINNER': {
			return {
        ...state,
        usersSpinner: state.usersSpinner + 1,
			}
    }
        
		case 'TURN_OFF_SPINNER': {
			return {
        ...state,
        usersSpinner: (state.usersSpinner - 1) >= 0 ? (state.usersSpinner - 1) : 0,
			}
    }

    default: {
			return state;
		}
  }
}

export default reducer