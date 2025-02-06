/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form/Form";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Register({ setToken }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();

    if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
      setError("First and last name should contain letters only.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setError("Please enter a valid email.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        alert("Successfully signed up!");
        navigate("/account");
      } else {
        setError("Error signing up. Please try again.");
      }
    } catch (err) {
      setError("Error signing up. Please try again.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Register Here</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <strong>Registration Rules:</strong>
        <br />
        1. Your password must be at least 6 characters long.
        <br />
        2. Please use a valid email address.
        <br />
        3. Make sure your passwords match.
        <br />
        4. All fields are required to complete registration.
        <br />
      </p>
      {loading && <p>Loading...</p>}
      <Form
        parent="register"
        submitFunction={registerUser}
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </div>
  );
}

export default Register;
