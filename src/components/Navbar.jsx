import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppContext from "./context/AppContext";
import { fetcher } from "./utils/fetcher";

function Navbar() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    async function handleLogout(e) {
      e.preventDefault();

      const data = await fetcher('/api/logout', "POST", {headers});

      if (data.message === 'Logout successful') {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          navigate("/");
      }else {
        setError("Unable to Logout please try again!.")
      }
    }
    return(
        <>
            <header className="mb-5">
                <nav>
                <Link to="/" className="nav-link">
                    Home
                </Link>

                {user ? (
                    <div className="flex items-center space-x-4">
                    <p className="text-slate-400 text-xs">Welcome back {user.name}</p>
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                    <Link to="/feed" className="nav-link">
                        Feed
                    </Link>
                    <form onSubmit={handleLogout}>
                        <button className="nav-link">Logout</button>
                    </form>
                    </div>
                ) : (
                    <div className="space-x-4">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                    </div>
                )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Navbar;