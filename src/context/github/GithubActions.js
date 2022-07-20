const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Get search results
export const searchUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	});

	const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});

	const { items } = await response.json();

	return items;
};

// Get a single user
export const getUser = async (login) => {

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

        return data
	}
};

export const getUserRepos = async (login) => {

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

    return data;
};
