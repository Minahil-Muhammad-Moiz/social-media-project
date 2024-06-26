import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Nav = () => {
  const [user] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!user ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="/CreatePost"> +Post </Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || "profile picture"} width='20' height='20' />
            <br />
            <button onClick={logout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
