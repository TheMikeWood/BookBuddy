/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleBook({ isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="single-book-container">
      <img src={book.coverimage} alt={book.title} className="singbook-image" />
      <div className="single-book-details">
        <h2 className="singtitle">{book.title}</h2>
        <p className="singAuthor">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="singDescription">
          <strong>Description:</strong> {book.description}
        </p>
        {isLoggedIn && <button>Checkout</button>}
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Books
        </button>
      </div>
    </div>
  );
}

export default SingleBook;
