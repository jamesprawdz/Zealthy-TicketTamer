import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logDetails from "../utils/logUtil";

const NavigationBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    logDetails("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="nav-left"></div>
      <div className="nav-center">
        <Link className="navbar-brand" to={token ? "/admin/tickets" : "/"}>
          <svg width="150" height="40" viewBox="0 0 193 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.2815 0H22.0774V4.79673L8.74338 18.8431H22.5641V24H0V19.0232L13.1881 5.12415H1.2815V0Z" fill="#1B1B1B"/>
            <path d="M29.1954 0H48.8883V5.12415H36.56V8.93861H47.9961V13.8336H36.56V18.5648H49.2452V24H29.1954V0Z" fill="#1B1B1B"/>
            <path d="M71.1734 20.0382H62.8031L61.6514 24H54.1408L63.0789 0H71.0923L80.0303 24H72.3413L71.1734 20.0382ZM69.6324 14.8486L67.0045 6.22101L64.3928 14.8486H69.6324Z" fill="#1B1B1B"/>
            <path d="M85.7208 0H93.0692V18.09H104.538V24H85.7208V0Z" fill="#1B1B1B"/>
            <path d="M109.531 0H131.868V5.92633H124.373V24H117.025V5.92633H109.531V0Z" fill="#1B1B1B"/>
            <path d="M138.564 0H145.912V8.39836H153.942V0H161.323V24H153.942V14.292H145.912V24H138.564V0Z" fill="#1B1B1B"/>
            <path d="M167.127 0H175.286L180.088 8.10368L184.889 0H193L183.754 13.9482V24H176.389V13.9482L167.127 0Z" fill="#1B1B1B"/>
          </svg>
        </Link>
      </div>
      <div className="nav-right">
        {!token && (
          <>
            <Link className="nav-link" to="/">
              Support
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </>
        )}
        {token && (
          <>
            <Link className="nav-link" to="/admin/tickets">
              Dashboard
            </Link>
            <Link className="nav-link" to="/login" onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
