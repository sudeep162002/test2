import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Header() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout().then(() => history.push("/"));
    } catch (error) {}
  };
  return (
    <div className="navbar container">
      <a href="/" className="brand">
        Quizard
      </a>
      <nav className="nav">
        {currentUser ? (
          <span>
            <Link to="/admin">My Quizzes</Link>
            <Link to="/create">create</Link>
            <span onClick={handleLogout}>logout</span>
          </span>
        ) : (
          <span>
            <Link to="/signup">signup</Link>
            <Link to="/login">login</Link>
          </span>
        )}
      </nav>
    </div>
  );
}

export default Header;
