const githubReducer = (state, action) => {
    switch (action.type) {
		case "GET_USERS":
			return {
				...state, // The current state
				users: action.payload, // Get the payload - many users
				loading: false,
			};

		case "GET_USER_AND_REPOS":
			//setting the state to what we want it to be based off the get request
			return {
				...state, // The current state
				user: action.payload.user, // Get the payload - the single user
				repos: action.payload.repos,
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
