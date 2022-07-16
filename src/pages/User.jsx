import {FaCodepen, FaStore, FaUserFriends, FaUsers} from "react-icons/fa"
import { useEffect, useContext } from "react";
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import Spinner from "../components/layout/Spinner"
import GithubContext from "../context/github/GithubContext";

function User() {
    // We want to be able to access the 'getUser' method and the 'user' state
    const {getUser, user, loading} = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
        getUser(params.login)
    }, []) // You need this empty array or it will keep running and crash your browser

    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      type
    } = user;

    if (loading) {
      return <Spinner />
    }

    return <>
     <div className="w-full mx-auto lg:w-10/12">
      <div className="mb-4">
        <Link to="/" className="btn btn-ghost btn-outline">
          Back to search
        </Link>
      </div>
      <div className="grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
        <div className="custom-card-image mb-6 md:mb-0">
          <div className="rounded-lg shadow-xl card image-full">
            <div className="card-body justify-end">
              <h2 className="card-title mb-0">{name}</h2>
              <p>{login}</p>
            </div>
            <figure>
              <img src={avatar_url} alt="" />
            </figure>
          </div>
        </div>
        <div className="cols-span-2">
          <div className="mb-6">
            <h1 className="text-3xl card-title">
              {name}
              <div className="ml-2 mr-1 badge badge-success">
                {type}
              </div>
              {hireable && (
                <div className="mx-1 badge badge-info">
                  Hirable
                </div>
              )}
            </h1>
            <p>{bio}</p>
            <div className="mt-4 card-actions">
              <a href={html_url} target="_blank" rel="noreferrer" className="btn btn-outline">
                Visit Github Profile
              </a>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>;
}

export default User;
