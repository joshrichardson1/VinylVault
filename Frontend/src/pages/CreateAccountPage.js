import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import VinylAPI from "../api/VinylAPI"

const CreateAccountPage = () => {

  const navigate = useNavigate();

  const handleSumbit = async (event) => {
    event.preventDefault();
    let userData = {
      first_name: event.target.firstName.value,
      last_name: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    let res = await VinylAPI.addUser(userData);
    if (res.message) {
      console.log(res.message);
    } else {
      <Alert key="success" variant="success">
        Account created successfully! Welcome!
      </Alert>;
      setTimeout(() => {
        navigate("/login/");
      }, 3000);
      console.log(res);
    }
  };

  return (
    <div className id="createAccountMain">
      <div id="createAccountForm" className="pt-3 pb-5">
        <h3 id="createAccountHeader">
          Please fill out all fields to create an account
        </h3>
        <Form onSubmit={handleSumbit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="mb-3" controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="firstName"
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                size="small"
                type="text"
                placeholder="Last name"
                name="lastName"
                required
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              size="small"
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label column lg={2}>
                Email address:
              </Form.Label>
              <Col>
                <Form.Control
                  className="col-sm"
                  size="md"
                  type="email"
                  placeholder="Email address"
                  name="email"
                  required
                />
              </Col>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </Form.Group>
          <Button
            variant="danger"
            onClick={() => navigate("/")}
            className="m-2"
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="m-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccountPage;