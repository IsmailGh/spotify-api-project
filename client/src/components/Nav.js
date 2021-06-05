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
          <a>
            <IconUser />
            <div>Profile</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconTime />
            <div>Recent Songs</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconMusic />
            <div>Top songs</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconMicrophone />
            <div>Top Artist</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconPlaylist />
            <div>Playlists</div>
          </a>
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
