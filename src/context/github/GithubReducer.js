const githubReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state, // The current state
                users: action.payload, // Get the payload
                loading: false,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "CLEAR_USERS":
            return {
                ...state,
                users: [], // We set the users state to empty again
            };
        default:
            return state;
    }
};

export default githubReducer;
