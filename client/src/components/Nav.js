import {
  SpotifyLogo,
  IconUser,
  IconTime,
  IconMusic,
  IconMicrophone,
  IconPlaylist,
  IconGitHub,
} from "../icons/index";
import styled from "styled-components/macro";
import { Link } from "@reach/router";

const Container = styled.nav`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #040306;
  text-align: center;
  z-index: 99;
`;
const Logo = styled.div`
  color: #1db954;
  margin-top: 30px;
  width: 70px;
  height: 70px;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
  &:hover,
  &:focus {
    color: #1ed760;
  }
  svg {
    width: 50px;
  }
`;
const Github = styled.div`
  color: #9b9b9b;
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  a {
    &:hover,
    &:focus,
    &.active {
      color: #509bf5;
    }
    svg {
      width: 30px;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled.li`
  color: #9b9b9b;
  font-size: 11px;
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    &:hover,
    &:focus,
    &.active {
      color: #ffffff;
      background-color: #181818;
      border-left: 5px solid #1ed760;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;

const isActive = ({ isCurrent }) =>
  isCurrent ? { className: "active" } : null;

const NavLink = (props) => <Link getProps={isActive} {...props} />;

const Nav = () => {
  return (
    <Container>
      <Logo>
        <SpotifyLogo />
      </Logo>
      <Menu>
        <MenuItem>
          <NavLink to="/">
            <IconUser />
            <div>Profile</div>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <a>
            <IconTime />
            <div>Recent Songs</div>
          </a>
        </MenuItem>
        <MenuItem>
          <a>
            <IconMusic />
            <div>Top songs</div>
          </a>
        </MenuItem>
        <MenuItem>
          <a>
            <IconMicrophone />
            <div>Top Artist</div>
          </a>
        </MenuItem>
        <MenuItem>
          <a>
            <IconPlaylist />
            <div>Playlists</div>
          </a>
        </MenuItem>
      </Menu>
      <div className="sourceCode">
        <a target="_blank" rel="noopener noreferrer">
          <IconGitHub />
        </a>
      </div>
    </Container>
  );
};

export default Nav;
