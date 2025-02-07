/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Account() {
  const [account, setAccount] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchReservations = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAccount(response.data))
      .catch((error) => {
        setError(error.response.data.message);
      });

    axios
      .get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setReservations(response.data.reservation || []);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchReservations();
  }, []);

  const handleReturnBook = async (reservationId, bookId) => {
    try {
      await axios.delete(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`Successfully returned book with reservation ID: ${reservationId}`);

      fetchReservations();
    } catch (error) {
      setError(error.response.data.message);
      fetchReservations();
    }
  };

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="account-container">
      <h2>My Account</h2>
      <p>
        <strong>Email:</strong> {account?.email}
      </p>

      <h3>Checked-Out Books</h3>
      {reservations.length > 0 ? (
        <ul className="reservations-list">
          {reservations.map((res) => (
            <li key={res.id} className="book-item">
              <img
                src={res.coverimage}
                alt={res.title}
                className="book-image"
              />
              <div>
                <p className="book-title">{res.title}</p>
                <p className="book-author">{res.author}</p>
                <button onClick={() => handleReturnBook(res.id, res.bookId)}>
                  Return Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
}

export default Account;
