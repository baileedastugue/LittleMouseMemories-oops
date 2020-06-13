import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const LoginForm = () => {
    return (
      <Form>
        <FormGroup>
          <label for="emailInput">Email</label>
          <input
            type="text"
            name="email"
            class="form-control"
            id="emailInput"
          />
        </FormGroup>
        <FormGroup>
          <label for="passwordInput">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="passwordInput"
          />
        </FormGroup>
        <Button type="submit" class="btn login-btn">
          Login
        </Button>
      </Form>
    );
}

export default LoginForm;