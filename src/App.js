import logo from "./logo.svg";
import "./App.css";
import Recaptcha from "./Recaptcha";

const openInNewTab = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

function App() {
  return (
    <div className="App">
        <div className="profile-column">
            <p id="full-name">Vicky Chen</p>
        </div>
        <div className="links-column">
          <div className="row">
              <button className="rounded-rect-button">
                  <img src="/icons/document.png" className="rounded-rect-icon" alt="Document"></img>
                  <h2>Resume</h2>
              </button>
          </div>
          <div className="row">
              <button className="rounded-rect-button" onClick={() => openInNewTab("https://github.com/chen-vv")}>
                  <img src="/icons/github.svg" className="rounded-rect-icon" alt="Document"></img>
                  <h2>GitHub</h2>
              </button>
          </div>
          <div className="row">
              <button className="rounded-rect-button" onClick={() => openInNewTab("https://www.linkedin.com/in/chen-vv/")}>
                  <img src="/icons/linkedin.png" className="rounded-rect-icon" alt="Document"></img>
                  <h2>LinkedIn</h2>
              </button>
          </div>
        </div>
      {/* <Recaptcha /> */}
    </div>
  );
}

export default App;
