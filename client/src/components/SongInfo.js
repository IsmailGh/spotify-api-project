import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { theme, mixins, media } from "../styles";
const { colors, fontSizes, spacing } = theme;

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
`;

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.md};
  ${media.tablet`
    margin-bottom: ${spacing.base};
  `};
`;
const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;
const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
`;
const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`;
const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;

const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SongInfo = ({ track }) => (
  <li>
    <TrackContainer>
      <div>
        <TrackArtwork>
          {track.album.images.length && (
            <img src={track.album.images[2].url} alt="Album Artwork" />
          )}
        </TrackArtwork>
      </div>
      <TrackMeta>
        <TrackLeft>
          {track.name && <TrackName>{track.name}</TrackName>}
          {track.artists && track.album && (
            <TrackAlbum>
              {track.artists &&
                track.artists.map(({ name }, i) => (
                  <span key={i}>
                    {name}
                    {track.artists.length > 0 && i === track.artists.length - 1
                      ? ""
                      : ","}
                    &nbsp;
                  </span>
                ))}
              &nbsp;&middot;&nbsp;&nbsp;
              {track.album.name}
            </TrackAlbum>
          )}
        </TrackLeft>
        <TrackRight>
          {track.duration_ms && (
            <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>
          )}
        </TrackRight>
      </TrackMeta>
    </TrackContainer>
  </li>
);
SongInfo.propTypes = {
  song: PropTypes.object.isRequired,
};

export default SongInfo;
