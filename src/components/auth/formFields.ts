const loginFields = [
  {
    labelText: "Email address/ Phone number",
    labelFor: "email_phone",
    id: "email_phone",
    name: "email_phone",
    type: "text",
    autoComplete: "",
    isRequired: true,
    placeholder: "Email address/ Phone number"
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