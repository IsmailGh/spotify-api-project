import React from "react";
import Nav from "./Nav";
import Landing from "./Landing";
import TopSongs from "./TopSongs";
import styled from "styled-components/macro";
import { theme, media } from "../styles";
import { Router } from "@reach/router";
import Recents from "./Recents";
import TopArtists from "./TopArtists";
import Playlists from "./Playlists";

const PageWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Profile = () => (
  <PageWrapper>
    <Nav />
    <Router>
      <Landing path="/" />
      <Recents path="recent" />
      <TopSongs path="tracks" />
      <TopArtists path="artists" />
      <Playlists path="playlists" />
    </Router>
  </PageWrapper>
);

export default Profile;
