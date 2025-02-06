import React, { useEffect, useState } from "react";

import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log("effect running...");
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <Navigations token={token} setToken={setToken} />

      <p>
        Complete the React components needed to allow users to browse a library
        catalog, check out books, review their account, and return books that
        they've finished reading.
      </p>

      <p>
        You may need to use the `token` in this top-level component in other
        components that need to know if a user has logged in or not.
      </p>

      <p>
        Don't forget to set up React Router to navigate between the different
        views of your single-page application!
      </p>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
