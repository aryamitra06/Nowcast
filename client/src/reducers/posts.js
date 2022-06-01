const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'RECOMMEND_POSTS':
            return { ...posts, posts: action.payload.data };
        case 'SEARCH_POST':
            return action.payload;
        case 'USER_POSTS':
            return { posts: action.payload };
        default:
            return posts;
    }
}

export default posts;