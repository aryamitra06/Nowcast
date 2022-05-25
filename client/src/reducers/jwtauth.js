const jwtauth = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            return {...state, authData: action?.payload};
        case 'SIGN_UP':
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            return {...state, authData: action?.payload};
        default:
            return state;
    }
}

export default jwtauth;