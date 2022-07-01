import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

//This page will help with the syntax of tailwindcss at the time of this comment we are using tailwindcss v3.1.4
//https://tailwindcss.com/docs/padding

function NotFound() {
  return <div className="hero">
    <div className="text-center hero-content">
      <div className="max-w-lg">
        <h1 className="text-8xl font-bold mb-8">Ooops!</h1>
        <div className="pb-6">
          <p1 className="text-5xl mb-8">404 - Page not found!</p1>
        </div>
        <Link to="/" className="btn btn-primary btn-lg">
          <FaHome className="mr-2"/>
          Back To Home
        </Link>
      </div>
    </div>
  </div>;
}

export default NotFound;
