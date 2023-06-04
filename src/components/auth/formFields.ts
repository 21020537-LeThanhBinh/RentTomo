const loginFields = [
  {
    labelText: "Email address/ Username",
    labelFor: "email_username",
    id: "email_username",
    name: "email_username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Email address/ Username"
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password"
  }
]

const signupFields = [
  {
    labelText: "Phone number",
    labelFor: "phone_number",
    id: "phone_number",
    name: "phone",
    type: "text",
    autoComplete: "phone",
    isRequired: true,
    placeholder: "Phone number"
  },
  {
    labelText: "Email address",
    labelFor: "email_address",
    id: "email_address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address"
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password"
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm_password",
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    autoComplete: "confirm-password",
    isRequired: true,
    placeholder: "Confirm Password"
  }
]

export { loginFields, signupFields }