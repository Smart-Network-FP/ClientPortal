import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import _ from "lodash";
import Button from "../../components/button";
import Input from "../../components/input";
import "./signup.css";

import UserContext from "../../context/UserContext";
import { signup } from "../../plugins/api/account";

const SignupForm = ({ showForm }) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const submitSignUpForm = () => {
    setErrors({});
    let hasError = false;

    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const fields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];

    fields.forEach((field) => {
      if (!_.get(form, field)) {
        setErrors((errors) => ({ ...errors, [field]: "Field is required" }));
        hasError = true;
      }
    });

    if (form.email && !re.test(String(form.email).toLowerCase())) {
      setErrors((errors) => ({ ...errors, email: "Email not valid" }));
      hasError = true;
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password != form.confirmPassword
    ) {
      setErrors((errors) => ({
        ...errors,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }

    if (hasError) return;

    (async () => {
      try {
        setLoading(true);
        const response = await signup(form.email, form.password, showForm);
        setUser(response.data);
        navigate("/");
      } catch ({ response }) {
        const error = _.get(response, "data.message", "Something went wrong");
        setErrors({
          email: error,
          password: error,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="signup-form">
      <div className="form">
        <img className="logo" src="/min-logo.svg" />
        <h2>Sign up</h2>

        <Input
          label="First Name"
          className="form-input"
          value={form.firstName}
          error={_.get(errors, "firstName", false)}
          setValue={(firstName) => setForm({ ...form, firstName })}
        />

        <Input
          label="Last Name"
          className="form-input"
          value={form.lastName}
          error={_.get(errors, "lastName", false)}
          setValue={(lastName) => setForm({ ...form, lastName })}
        />

        <Input
          label="Email"
          className="form-input"
          value={form.email}
          error={_.get(errors, "email", false)}
          setValue={(email) => setForm({ ...form, email })}
        />

        <Input
          label="Password"
          type="password"
          className="form-input"
          value={form.password}
          error={_.get(errors, "password", false)}
          setValue={(password) => setForm({ ...form, password })}
        />

        <Input
          label="Confirm Passowrd"
          type="password"
          className="form-input"
          value={form.confirmPassword}
          error={_.get(errors, "confirmPassword", false)}
          setValue={(confirmPassword) => setForm({ ...form, confirmPassword })}
        />

        <Button
          isLoading={isLoading}
          style={{ width: "80%", marginTop: "2rem" }}
          onClick={submitSignUpForm}
        >
          Sign up
        </Button>

        <p style={{ fontSize: "16px", marginTop: "2rem" }}>
          Already have an account? &nbsp;
          <a href="/login">Login</a>.
        </p>
      </div>
    </div>
  );
};

const SignupPage = ({ visitForm }) => {
  return (
    <div className="signup-page">
      <div className="banner"></div>
      <span className="hr"></span>
      <div className="form">
        <div className="form-container">
          <h2>Sign up</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              style={{ width: "20rem", margin: "1rem" }}
              onClick={() => visitForm("expert")}
            >
              EXPERT
            </Button>
            <Button
              style={{ width: "20rem", margin: "1rem" }}
              onClick={() => visitForm("recruiter")}
              secondary
            >
              RECRUITER
            </Button>
          </div>
          <p>
            Already have an account? &nbsp;
            <a href="/login">Login</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Signup() {
  const [showForm, setShowForm] = useState(false);
  if (showForm) return <SignupForm showForm={showForm} />;
  return <SignupPage visitForm={setShowForm} />;
}
