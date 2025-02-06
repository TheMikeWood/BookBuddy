/* TODO - add your code to create a functional React component that renders a registration form */
import React from "react";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function registerUser(e) {
    e.preventDefault();
    alert("Successfully Signed Up!");
    navigate("/");
  }
  return (
    <>
      <h2>Register Here</h2>
      <Form parent="register" submitFunction={registerUser} />
    </>
  );
}

export default Register;
