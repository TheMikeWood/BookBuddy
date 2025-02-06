/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="books-container">
      <h2 className="books-title">Available Books</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="book-list">
        {filteredBooks.map((book) => (
          <li key={book.id} className="book-item">
            <Link to={`/book/${book.id}`} className="book-link">
              <img
                src={book.coverimage}
                alt={book.title}
                className="book-image"
              />
              <p className="book-title">{book.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
