const comments = (comments = [], action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS':
            return action.payload;
        default:
            return comments;
    }
}

export default comments;