import React from "react";

function Form({ parent, submitFunction }) {
  return (
    <form onSubmit={submitFunction}>
      <label>
        <h3>Username</h3>
        <input type="text" />
      </label>
      {parent && (
        <label>
          <h3>Email</h3>
          <input type="email" />
        </label>
      )}
      <label>
        <h3>Password</h3>
        <input type="password" />
      </label>
      {parent && (
        <label>
          <h3>Confirm Password</h3>
          <input type="password" />
        </label>
      )}
      <button>{parent === "register" ? "Register" : "Log In"}</button>
    </form>
  );
}

export default Form;
