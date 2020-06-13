import React from 'react';
import { Button, Form, FormGroup } from 'reactstrap';

const LoginForm = () => {
    return (
      <Form>
        <FormGroup>
          <label htmlFor="emailInput">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="emailInput"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="passwordInput"
          />
        </FormGroup>
        <Button type="submit" className="btn login-btn">
          Login
        </Button>
      </Form>
    );
}

export default LoginForm;