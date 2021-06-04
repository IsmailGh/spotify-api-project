import {
  SpotifyLogo,
  IconUser,
  IconTime,
  IconMusic,
  IconMicrophone,
  IconPlaylist,
  IconGitHub,
} from "../icons/index";
import "../styles/nav.scss";

const Nav = () => {
  return (
    <div className="container">
      <div className="logo">
        <SpotifyLogo />
      </div>
      <div className="menu">
        <div className="menuItem">
          <IconUser />
          <div>Profile</div>
        </div>
        <div className="menuItem">
          <IconTime />
          <div>Recent Songs</div>
        </div>
        <div className="menuItem">
          <IconMusic />
          <div>Top songs</div>
        </div>
        <div className="menuItem">
          <IconMicrophone />
          <div>Top Artist</div>
        </div>
        <div className="menuItem">
          <IconPlaylist />
          <div>Playlists</div>
        </div>
      </div>
      <div className="sourceCode">
        <a target="_blank" rel="noopener noreferrer">
          <IconGitHub />
        </a>
      </div>
    </div>
  );
};

export default Nav;
