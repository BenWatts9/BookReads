import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <>
    <Card style={{ width: '18rem' }}>
    <CardBody >
    <Form onSubmit={loginSubmit}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </CardBody>
    </Card>
            </>
  );
}