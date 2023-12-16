import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import _ from "lodash";
import Button from "../../components/button";
import Input from "../../components/input";
import "./login.css";

import UserContext from "../../context/UserContext";
import { login } from "../../plugins/api/account";

const LoginForm = ({ showForm }) => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState();
  const [isLoading, setLoading] = useState(false);

  const submitLoginForm = () => {
    setErrors({});

    const fields = ["email", "password"];

    fields.forEach((field) => {
      if (!_.get(form, field)) {
        setErrors((errors) => ({ ...errors, [field]: "Field is required" }));
      }
    });

    if (!_.isEmpty(errors)) return;

    (async () => {
      try {
        setLoading(true);
        const response = await login(form.email, form.password, showForm);
        setUser(response.data);
        if (response.data?.expert?.firstName == "") {
          navigate("/onboarding");
        } else {
          navigate("/");
        }
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
        <h2>Login</h2>

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

        <Button
          isLoading={isLoading}
          style={{ width: "80%", marginTop: "2rem" }}
          onClick={submitLoginForm}
        >
          Login
        </Button>

        <p style={{ fontSize: "16px", marginTop: "2rem" }}>
          Don't have an account? &nbsp;
          <a href="/signup">Signup</a>.
        </p>
      </div>
    </div>
  );
};

const LoginPage = ({ visitForm }) => {
  return (
    <div className="signup-page">
      <div className="banner"></div>
      <span className="hr"></span>
      <div className="form">
        <div className="form-container">
          <h2>Log In</h2>
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
            Don't have an account? &nbsp;
            <a href="/register">Register</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Login() {
  const [showForm, setShowForm] = useState(false);
  if (showForm) return <LoginForm showForm={showForm} />;
  return <LoginPage visitForm={setShowForm} />;
}
