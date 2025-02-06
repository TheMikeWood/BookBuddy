/* TODO - add your code to create a functional React component that renders a login form */
import React from "react";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function loginUser(e) {
    e.preventDefault();
    alert("Logged In!");
    navigate("/");
  }
  return (
    <>
      <h2>Login</h2>
      <Form submitFunction={loginUser} />
    </>
  );
}

export default Login;
