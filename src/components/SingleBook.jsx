/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleBook({ token, reservations, fetchReservations }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const isBookCheckedOut = reservations?.some((res) => res.bookid === book?.id);

  // Toggle book availability (for marking it available or unavailable manually)
  const handleToggleAvailability = async () => {
    if (!token) {
      setMessage("You must be logged in to update availability.");
      return;
    }

    setMessage(null);

    try {
      const newAvailability = !book.available; // Toggle availability

      // Send PATCH request to update book availability
      const updatedBook = await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`,
        { available: newAvailability },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setBook(updatedBook.data);
      setMessage(
        `Book marked as ${newAvailability ? "available" : "unavailable"}`
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update the book's availability."
      );
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      setMessage("You must be logged in to check out books.");
      return;
    }

    if (!book?.available) {
      setMessage("This book is currently unavailable.");
      return;
    }

    setIsCheckingOut(true);
    setMessage(null);

    try {
      await axios.patch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`,
        { available: false },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await axios
        .post(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
          { bookId: book.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Reservation made successfully", response.data);
        })
        .catch((error) => {
          console.error("Error making reservation:", error);
          if (error.response) {
            console.error("API Error Response:", error.response.data);
          } else {
            console.error("Network Error:", error.message);
          }
        });

      setMessage("Book checked out successfully!");
      setBook((prevBook) => ({ ...prevBook, available: false }));
      fetchReservations();
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to check out the book."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="single-book-container">
      <img
        src={book.coverimage}
        alt={book.title}
        className="singlebook-image"
      />
      <div className="single-book-details">
        <h2 className="single-title">{book.title}</h2>
        <p className="single-author">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="single-description">
          <strong>Description:</strong> {book.description}
        </p>

        {message && <p className="checkout-message">{message}</p>}

        {token && !isBookCheckedOut && (
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut || isBookCheckedOut}
          >
            {isBookCheckedOut
              ? "Already Checked Out"
              : isCheckingOut
              ? "Checking out..."
              : "Checkout"}
          </button>
        )}

        {token && (
          <button onClick={handleToggleAvailability}>
            {book.available ? "Mark as Unavailable" : "Mark as Available"}
          </button>
        )}

        <button className="back-button" onClick={() => navigate("/")}>
          Back to Books
        </button>
      </div>
    </div>
  );
}

export default SingleBook;
