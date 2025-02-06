/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function registerUser(formData) {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Simulate API request (can be replaced with real registration logic)
    setErrorMessage(""); // Clear any previous errors
    alert("Successfully Signed Up!");
    navigate("/");
  }

  return (
    <div className="register-container">
      <h2>Register Here</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Form parent="register" submitFunction={registerUser} />
    </div>
  );
}

export default Register;
