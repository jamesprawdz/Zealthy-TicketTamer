import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logDetails from "../utils/logUtil";

const NavigationBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    logDetails("User logged out");
  };

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/admin/tickets">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Support</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
