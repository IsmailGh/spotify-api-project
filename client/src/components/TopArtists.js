import React, { useState, useEffect } from "react";
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from "../api";
import Loading from "./Loading";
import styled from "styled-components/macro";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  ${media.tablet`
    display: block;
  `};
  h2 {
    margin: 0;
  }
`;
const Ranges = styled.div`
  display: flex;
  margin-right: -11px;
  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;
const RangeButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;
  ${media.phablet`
    font-size: ${fontSizes.sm};
  `};
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid
      ${(props) => (props.isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;
const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};
  ${media.phablet`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;
const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ArtistArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  ${media.tablet`
    width: 150px;
    height: 150px;
  `};
  ${media.phablet`
    width: 120px;
    height: 120px;
  `};
  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;
    ${media.tablet`
      width: 150px;
      height: 150px;
    `};
    ${media.phablet`
      width: 120px;
      height: 120px;
    `};
  }
`;
const ArtistName = styled.div`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
`;

const TopArtists = () => {
  const catchErrors = (fn) =>
    function (...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      });
    };

  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  const apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsLong();
      setTopArtists(data);
    };
    catchErrors(fetchData());
  }, []);

  const changeRange = async (range) => {
    const { data } = await apiCalls[range];
    setTopArtists(data);
    setActiveRange(range);
  };

  const setRangeData = (range) => catchErrors(changeRange(range));

  return (
    <Main>
      <Header>
        <h2>Top Artists</h2>
        <Ranges>
          <RangeButton
            isActive={activeRange === "long"}
            onClick={() => setRangeData("long")}
          >
            <span>All Time</span>
          </RangeButton>
          <RangeButton
            isActive={activeRange === "medium"}
            onClick={() => setRangeData("medium")}
          >
            <span>Last 6 Months</span>
          </RangeButton>
          <RangeButton
            isActive={activeRange === "short"}
            onClick={() => setRangeData("short")}
          >
            <span>Last 4 Weeks</span>
          </RangeButton>
        </Ranges>
      </Header>
      <ArtistsContainer>
        {topArtists ? (
          topArtists.items.map(({ id, images, name }, i) => (
            <Artist key={i}>
              <ArtistArtwork to={`/artist/${id}`}>
                {images.length && <img src={images[1].url} alt="Artist" />}
              </ArtistArtwork>
              <ArtistName>{name}</ArtistName>
            </Artist>
          ))
        ) : (
          <Loading />
        )}
      </ArtistsContainer>
    </Main>
  );
};

export default TopArtists;
