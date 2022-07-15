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
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // Get search results
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text,
        });

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        const { items } = await response.json();

        // All of the dispatch actions are in the reducer
        dispatch({
            type: "GET_USERS",
            payload: items,
        });
    };

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
                users: state.users,

                loading: state.loading,
                user: state.user,
                searchUsers,
                getUser,
                clearUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
