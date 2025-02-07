/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from "react";

import { Link } from "react-router-dom";
import bookLogo from "/src/assets/books.png";

function Navigations({ token, setToken, handleLogout }) {
  return (
    <header>
      <nav>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Book Logo" />
          Library App
        </h1>
        <Link to="/">Home</Link>
        {!token ? (
          <>
            <Link to="/register">Register!</Link>
            <Link to="/login">Log In Here</Link>
          </>
        ) : (
          <>
            <Link to="/me">My Account</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );

}

export default Navigations;
