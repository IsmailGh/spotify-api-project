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
            <div className="text">Profile</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconTime />
            <div className="text">Recent Songs</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconMusic />
            <div className="text">Top songs</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconMicrophone />
            <div className="text">Top Artist</div>
          </a>
        </div>
        <div className="menuItem">
          <a>
            <IconPlaylist />
            <div className="text">Playlists</div>
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
