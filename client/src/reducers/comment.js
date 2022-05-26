const comment = (comment = [], action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return action.payload;
        case 'DELETE_COMMENT':
            return action.payload;
        default:
            return comment;
    }
}

export default comment;