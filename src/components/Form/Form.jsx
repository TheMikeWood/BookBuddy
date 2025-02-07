import React from "react";

function Form({
  parent,
  submitFunction,
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) {
  return (
    <form className="form-container" onSubmit={submitFunction}>
      {parent === "register" && (
        <>
          <label>
            <h3>First Name</h3>
            <input
              type="text"
              placeholder="First Name..."
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </label>
          <label>
            <h3>Last Name</h3>
            <input
              type="text"
              placeholder="Last Name..."
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
        </>
      )}
      <label>
        <h3>Email</h3>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {parent === "register" && (
        <label>
          <h3>Confirm Password</h3>
          <input
            type="password"
            placeholder="Confirm Password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
      )}
      <button>{parent === "register" ? "Register" : "Log In"}</button>
    </form>
  );
}

export default Form;
