//@cheatsheet
// we make a state that is initial state. (here that is "initial") we update this state with action
// action.payload will return the final state (we can update action.payload with useDispatch hook)

//useDispatch -> to dispatch/use/update an action
//useSelector -> to use a state

const updatestate = (initial=[], action) => {
    switch (action.type) {
        case 'TOGGLE':
            return action.payload;
        default:
            return initial;
    }
}

export default updatestate;