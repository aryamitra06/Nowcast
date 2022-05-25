const googleauth = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({...action?.payload}));
            return {...state, authData: action?.payload};
        default:
            return state;
    }
}

export default googleauth;