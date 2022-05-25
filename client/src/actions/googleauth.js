export const saveAuth = (state) => (dispatch) => {
    dispatch({ type: "AUTH", payload: state });
};