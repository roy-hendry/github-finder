import {FaGithub} from "react-icons/fa"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import { Container } from "postcss"

function Navbar({title}) {
    return (
        <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <FaGithub className="inline pr-2 text-3xl"/>
                    <Link to="/" className="text-lg font-bold align-middle">
                        {title}
                    </Link>
                </div>
                <div className="flex-1 px-2 mx-2">
                    {/* flex is basically the ratio of how much of a section something covers. So 3 things all having a flex of 1 would mean they would take up 1/3 of the section each
                    https://tailwindcss.com/docs/flex-basis
                    */}
                    <div className="flex justify-end">
                        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
                            Home
                        </Link>
                        <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    title: "GithubFinder"
}

Navbar.propTypes = {
    title: PropTypes.string,
}

export default Navbar