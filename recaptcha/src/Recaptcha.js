import "./Recaptcha.css";
import ImageTile from "./ImageTile";

const Recaptcha = () => {
  const images = Array.from({ length: 9 });
  const correct_images = [2, 5, 6];

  return (
    <div className="Recaptcha">
      <div className="blue-box">
        <p className="captcha-text-smaller">Select all squares with</p>
        <p className="captcha-text-bold">chihuahuas</p>
        <p className="captcha-text-regular">If there are none, click skip</p>
      </div>
      <div className="grid">
        {images.map((_, index) =>
          ImageTile(`/images/chihuahua_muffin/${index + 1}.JPG`, index)
        )}
      </div>
      <div className="buttons-box">
        <span class="material-symbols-outlined info-button">info</span>
        <button className="next-button">SKIP</button>
      </div>
    </div>
  );
};

export default Recaptcha;
