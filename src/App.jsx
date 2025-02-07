import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Navigations from "./components/Navigations";
import Account from "./components/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const fetchReservations = () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    axios
      .get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      fetchReservations();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <>
      <Navigations
        token={token}
        setToken={setToken}
        handleLogout={handleLogout}
      />

      {loading && <p>Loading reservations...</p>}
      {error && <p>{error}</p>}

      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="*" element={<Books />} />
        <Route
          path="/book/:id"
          element={
            <SingleBook token={token} fetchReservations={fetchReservations} />
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route element={<ProtectedRoute setToken={setToken} />}>
          <Route
            path="/me"
            element={
              <Account
                token={token}
                reservations={reservations}
                fetchReservations={fetchReservations}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
