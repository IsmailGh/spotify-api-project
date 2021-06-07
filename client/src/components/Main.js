import React, { useState, useEffect } from "react";
import { token } from "../api";
import Profile from "./Profile";
import Login from "./Login";
import styled from "styled-components/macro";
import { GlobalStyle } from "../styles";

const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

const Main = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);
  return (
    <AppContainer>
      <GlobalStyle />
      {accessToken ? <Profile /> : <Login />}
    </AppContainer>
  );
};

export default Main;
