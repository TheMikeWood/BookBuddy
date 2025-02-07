/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);

  useEffect(() => {
    axios
      .get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message);
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
    .filter(
      (book) =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!isAvailableOnly || book.available === true)
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const handleCheckboxChange = () => {
    setIsAvailableOnly(!isAvailableOnly);
  };

  return (
    <div className="books-container">
      <h2 className="books-title">
        {isAvailableOnly ? "Available Books" : "All Books"}
      </h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="filter-container">
        <label>
          <input
            type="checkbox"
            checked={isAvailableOnly}
            onChange={handleCheckboxChange}
          />
          Only show available books
        </label>
      </div>

      <ul className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.id} className="book-item">
              <Link to={`/book/${book.id}`} className="book-link">
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="book-image"
                />
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.author}</p>
              </Link>
            </li>
          ))
        ) : (
          <p>No books found</p>
        )}
      </ul>
    </div>
  );

}

export default Books;
