//@cheatsheet
//we will call updateState using useDispatch hook for changing the state and storing that in payload
// "updateState = (state)" means we will update state using useDispatch with updateState(newstate).
// the "newsate" will be stored to payload 

export const updateState = (state) => (dispatch) => {
    dispatch({ type: "TOGGLE", payload: state });
};
