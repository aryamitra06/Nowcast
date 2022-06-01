const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'RECOMMEND_POSTS':
            return action.payload;
        case 'SEARCH_POST':
            return action.payload;
        case 'USER_POSTS':
            return action.payload;
        default:
            return posts;
    }
}

export default posts;