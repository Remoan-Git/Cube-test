import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LogoutButton = () => {
  const { auth, logout } = useContext(AuthContext);

  return auth?.token ? (
    <div className="logout-container">
      <h4 className="user-greeting">
        Welcome {auth?.user?.firstName} {auth?.user?.lastName}
      </h4>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  ) : null;
};

export default LogoutButton;
