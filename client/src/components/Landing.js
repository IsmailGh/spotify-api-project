import React, { useState, useEffect } from "react";
import { getUserInfo, logout } from "../api";
import SongInfo from "../components/SongInfo";
import styled from "styled-components/macro";
import { Link } from "@reach/router";
import IconUser from "../icons/profileImage";
import Loading from "./Loading";
import { theme, mixins, media, Main } from "../styles";
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`;
const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;
const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;
const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;
const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;
  ${media.tablet`
    display: block;
    margin-top: 70px;
  `};
`;
const Tracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;
const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;

const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};
  ${media.tablet`
    margin-bottom: ${spacing.base};
  `};
  &:hover,
  &:focus {
  }
`;
const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin-right: ${spacing.base};
    border-radius: 100%;
  }
`;

const ArtistName = styled(Link)`
  flex-grow: 1;
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

const Landing = () => {
  const catchErrors = (fn) =>
    function (...args) {
      return fn(...args).catch((err) => {
        console.error(err);
      });
    };

  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        user,
        followedArtists,
        playlists,
        topArtists,
        topTracks,
      } = await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
    };
    catchErrors(fetchData());
  }, []);

  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <>
      {user ? (
        <Main>
          <Header>
            <Avatar>
              {user.images.length > 0 ? (
                <img src={user.images[0].url} alt="avatar" />
              ) : (
                <NoAvatar>
                  <IconUser />
                </NoAvatar>
              )}
            </Avatar>
            <UserName
              href={user.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Name>{user.display_name}</Name>
            </UserName>
            <Stats>
              <Stat>
                <Number>{user.followers.total}</Number>
                <NumLabel>Followers</NumLabel>
              </Stat>
              {followedArtists && (
                <Stat>
                  <Number>{followedArtists.artists.items.length}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
              )}
              {totalPlaylists && (
                <Stat>
                  <Number>{totalPlaylists}</Number>
                  <NumLabel>Playlists</NumLabel>
                </Stat>
              )}
            </Stats>
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </Header>

          <Preview>
            <Tracklist>
              <TracklistHeading>
                <h3>Top Artists of All Time</h3>
              </TracklistHeading>
              <div>
                {topArtists ? (
                  <ul>
                    {topArtists.items.slice(0, 10).map((artist, i) => (
                      <Artist key={i}>
                        <ArtistArtwork to={`/artist/${artist.id}`}>
                          {artist.images.length && (
                            <img src={artist.images[2].url} alt="Artist" />
                          )}
                        </ArtistArtwork>
                        <ArtistName to={`/artist/${artist.id}`}>
                          <span>{artist.name}</span>
                        </ArtistName>
                      </Artist>
                    ))}
                  </ul>
                ) : (
                  <Loading />
                )}
              </div>
            </Tracklist>

            <Tracklist>
              <TracklistHeading>
                <h3>Top Tracks of All Time</h3>
              </TracklistHeading>
              <ul>
                {topTracks ? (
                  topTracks.items
                    .slice(0, 10)
                    .map((track, i) => <SongInfo track={track} key={i} />)
                ) : (
                  <Loading />
                )}
              </ul>
            </Tracklist>
          </Preview>
        </Main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Landing;
