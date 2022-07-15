import { useEffect, useContext } from "react";
import {useParams} from "react-router-dom"
import GithubContext from "../context/github/GithubContext";

function User() {
    // We want to be able to access the 'getUser' method and the 'user' state
    const {getUser, user} = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
        getUser(params.login)
    }, []) // You need this empty array or it will keep running and crash your browser
  return <div>{user.login}</div>;
}

export default User;
