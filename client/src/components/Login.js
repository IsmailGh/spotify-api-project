import React from "react";

const LOGIN_URI = "http://localhost:8888/login";

const Login = () => {
  return (
    <div className="container">
      <h1>Spotify Login</h1>
      <button href={LOGIN_URI}>Log In</button>
    </div>
  );
};

export default Login;
