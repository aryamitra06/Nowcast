const post = (post = [], action) => {
    switch (action.type) {
        case 'CREATE':
            return action.payload;
        case 'GET_POST_BY_ID':
            return action.payload;
        case 'UPDATE':
            return action.payload;
        case 'DELETE':
            return action.payload;
        case 'LIKE':
            return action.payload;
        default:
            return post;
    }
}

export default post;