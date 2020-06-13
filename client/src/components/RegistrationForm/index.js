import React from "react";
import {
  Button,
  Form,
  FormGroup,
} from "reactstrap";

const RegistrationForm = () => {
  return (
    <Form action="/users/register" method="POST">
      <FormGroup>
        <label for="fNameInput">First Name</label>
        <input
          type="text"
          name="firstName"
          class="form-control"
          id="fNameInput"
        //   value="<%= typeof firstName != 'undefined' ? firstName : '' %>"
        />
      </FormGroup>
      <label for="lNameInput">Last Name</label>
      <input
        type="text"
        name="lastName"
        class="form-control"
        id="lNameInput"
        // value="<%= typeof lastName != 'undefined' ? lastName : '' %>"
      />
      <FormGroup>
        <label for="emailInput">Email</label>
        <input
          type="text"
          name="email"
          class="form-control"
          id="emailInput"
        //   value="<%= typeof email != 'undefined' ? email : '' %>"
        />
      </FormGroup>
      <label for="newPasswordInput">Password</label>
      <input
        type="password"
        name="password"
        class="form-control"
        id="newPasswordInput"
        // value="<%= typeof password != 'undefined' ? password : '' %>"
      />
      <FormGroup>
        <label for="newPasswordInput">Confirm Password</label>
        <input
          type="password"
          name="password2"
          class="form-control"
          id="newPasswordInput2"
        //   value="<%= typeof password2 != 'undefined' ? password2 : '' %>"
        />
      </FormGroup>
      <Button type="submit" class="btn" id="register-btn">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;
