import { Link } from "react-router-dom"
import "../css/Navbar.css"
function NavBar(){
    return(
        <>
        <nav className="navbar">
            <div className="app-name">
                <Link to="/" className="nav-links">Student App</Link>
            </div>
            <div className="routes">
                <Link to="/login" className="nav-links">Login</Link>
                <Link to="/registration" className="nav-links">Register</Link>
                <Link to="/contact" className="nav-links">Contact us</Link>
                <Link to="/about" className="nav-links">Know us</Link>
            </div>

        </nav>

        </>
    )
}
export default NavBar