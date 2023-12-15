import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

import Button from "../button";
import UserContext from "../../context/UserContext";

export default function Navbar() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img onClick={() => navigate("/")} src="/logo.png" />
      <div className="buttons">
        {(user?.expert?.id || user?.user?.id) && (
          <>
            <Button
              onClick={() => {
                setUser({});
                navigate("/login");
              }}
              secondary
            >
              Logout
            </Button>
            {user?.expert?.id && (
              <Button onClick={() => navigate(`/profile/${user?.expert?.id}`)}>
                Profile
              </Button>
            )}
          </>
        )}

        {!(user?.expert?.id || user?.user?.id) && (
          <>
            <Button onClick={() => navigate("/login")} secondary>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
        )}
      </div>
    </div>
  );
}
