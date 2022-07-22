import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [], // The initial users array is just an empty array
		user: {}, // An empty object
		repos: [],
		loading: false,
	};

	// It seems that a reducer works similar to useState - the first parameter is for the current state but the second is for an action
	// (state, action) => newState

	// Something like this can be done to increase a number by one:
	// const counterReducer = (state, action) => {
	// 	return state + 1;
	// };

	// The second parameter which is for actions will have a type, we interact with this by seeing what it's action.type is. We have moved that part to another file so check the GithubReducer.js to see it
	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Giving access to this data and these methods outside the GithubContext
	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};;

export default GithubContext;
