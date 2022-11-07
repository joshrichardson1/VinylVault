import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import VinylAPI from "../api/VinylAPI";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSumbit = async (event) => {
    event.preventDefault();
    let userEmail = event.target.email.value;
    let userPassword = event.target.password.value;
    let res = await VinylAPI.fetchUser(userEmail);
    if (userPassword === res[0].password) {
      window.localStorage.setItem("user", JSON.stringify(res[0]));
      navigate("/home/my-collection/", { user: res[0] });
    } else {
      alert("Login Failed");
    }
  };

  return (
    <div className="pb-4" id="loginFormFields">
      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3">
          <Form.Control
            id="emalFormField"
            className="loginField"
            type="email"
            placeholder="Enter email"
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            id="pwFormFields"
            className="loginField"
            // style={{ width: "30rem" }}
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
