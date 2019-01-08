const initState = {
    subreddit: '',
    sortBy: ''
}

const rootReducer = (state = initState, action) => {
    if(action.type === "UPDATE_SEARCH"){
        initState.subreddit = action.subreddit
    }

    if(action.type === "UPDATE_SORT"){
        initState.sortBy = action.sortBy
    }
    return state;
}

export default rootReducer;