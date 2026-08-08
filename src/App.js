import logo from "./logo.svg";
import "./App.css";
import Recaptcha from "./Recaptcha";
import CopyButton from "./CopyButton";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function App() {
  const email = "vickychen0192@gmail.com";

  return (
    <div className="App">
      <div className="profile-column">
        <div className="profile-row">
          <h1 className="title">Vicky Chen</h1>
        </div>
        <div className="profile-row">
          <p className="subtitle">Full-Stack Software Engineer</p>
          <div className="email-row">
            <p className="subtitle underlined">{email}</p>
            <CopyButton textToCopy={email} />
          </div>
        </div>
      </div>
      <div className="links-column">
        <button
          className="rounded-rect-button"
          onClick={() => {
            window.open("/resume.pdf", "_blank");
          }}
        >
          <img
            src="/icons/notebook.png"
            className="rounded-rect-icon"
            alt="Notebook with decorative cover"
          ></img>
          <h2>Resume</h2>
        </button>
        <button
          className="rounded-rect-button"
          onClick={() =>
            openInNewTab(
              "https://drive.google.com/drive/folders/1U7gZctlvD5EIcfTJOzvSkFeeirbEVa4u?usp=drive_link",
            )
          }
        >
          <img
            src="/icons/puzzle.png"
            className="rounded-rect-icon"
            alt="Green puzzle piece"
          ></img>
          <h2>Projects</h2>
        </button>
        <button
          className="rounded-rect-button"
          onClick={() => openInNewTab("https://github.com/chen-vv")}
        >
          <img
            src="/icons/github.svg"
            className="rounded-rect-icon"
            alt="GitHub logo"
          ></img>
          <h2>GitHub</h2>
        </button>
        <button
          className="rounded-rect-button"
          onClick={() => openInNewTab("https://www.linkedin.com/in/chen-vv/")}
        >
          <img
            src="/icons/linkedin.png"
            className="rounded-rect-icon"
            alt="LinkedIn logo"
          ></img>
          <h2>LinkedIn</h2>
        </button>
      </div>
    </div>
  );
}

export default App;
