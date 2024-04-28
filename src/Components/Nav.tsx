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
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <div>
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || "profile picture"} />
            <br />
            <button onClick={logout}>Log Out</button>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
