import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// By using axios we can use github.get or post etc
const github = axios.create({
	baseURL: GITHUB_URL,
	headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Get search results
export const searchUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	});

	// With axios we don't need to use await like we would with a JSON fetch API
	// We will instead get the item with the data we want inside an object called data
	const response = await github.get(`/search/users?${params}`);
	return response.data.items;
};

// Get user and repos
export const getUserAndRepos = async (login) => {
	const [user, repos] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos`),
	]);

	return { user: user.data, repos: repos.data };
};
