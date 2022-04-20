import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {

    const { isLogged } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.reload();
    }

    return (
        <div className="header">
            <nav className="header-top-navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {
                        isLogged ? <li onClick={logout} style={{ cursor: 'pointer' }}>Logout</li> :
                            <li><Link to="/login"><button>Log In</button></Link></li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export { Header };