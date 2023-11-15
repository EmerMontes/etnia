/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

import {userLogout} from "../../redux/actions";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { logout } = useAuth0();

  const handleLogOut = ()=>{
    dispatch(userLogout());
    localStorage.setItem('initialFilters', {});
    navigate("/");
  }

  return (
    <button onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogoutButton;