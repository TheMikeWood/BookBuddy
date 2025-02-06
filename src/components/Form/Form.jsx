import React, { useState } from "react";

function Form({ parent, submitFunction }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <label>
        <h3>Username</h3>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      {parent === "register" && (
        <label>
          <h3>Email</h3>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      )}
      <label>
        <h3>Password</h3>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      {parent === "register" && (
        <label>
          <h3>Confirm Password</h3>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
      )}
      <button type="submit" className="auth-button">
        {parent === "register" ? "Register" : "Log In"}
      </button>
    </form>
  );
}

export default Form;
