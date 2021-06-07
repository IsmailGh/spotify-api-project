import React, { useState, useEffect } from "react";
import { getRecentlyPlayed } from "../api";

import SongInfo from "./SongInfo";

import styled from "styled-components/macro";
import { Main } from "../styles";
import Loading from "./Loading";

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const Recents = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  const catchErrors = (fn) =>
    function (...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      });
    };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getRecentlyPlayed();
      setRecentlyPlayed(data);
    };
    catchErrors(fetchData());
  }, []);

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed ? (
          recentlyPlayed.items.map(({ track }, i) => (
            <SongInfo track={track} key={i} />
          ))
        ) : (
          <Loading />
        )}
      </TracksContainer>
    </Main>
  );
};

export default Recents;
