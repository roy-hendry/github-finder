import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

//The standard way of using enviroment variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [], // The initial users array is just an empty array
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get a single user
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        if (response.status === 404) {
            window.location = "/notfound";
        } else {
            // data will be holding the single response (the single user) that is sent to it
            const data = await response.json();

            // All of the dispatch actions are in the reducer
            dispatch({
                type: "GET_USER",
                payload: data,
            });
        }
    };

    const getUserRepos = async (login) => {
        setLoading();

        // Filtering results so that the repos are sorted by the date they were created and there is only the first 10 per page
        const params = new URLSearchParams({
            sort: "created",
            per_page: 10,
        });

        const response = await fetch(
            `${GITHUB_URL}/users/${login}/repos?${params}`,
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            }
        );

        const data = await response.json();

        // All of the dispatch actions are in the reducer
        dispatch({
            type: "GET_REPOS",
            payload: data,
        });
    };

    // Set loading
    const setLoading = () =>
        dispatch({
            type: "SET_LOADING",
        });

    const clearUsers = () => {
        dispatch({
            type: "CLEAR_USERS",
        });
    };

    // Giving access to this data and these methods outside the GithubContext
    return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
				getUser,
				clearUsers,
				getUserRepos,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
