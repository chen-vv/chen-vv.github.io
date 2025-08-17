import React from "react";
import "./Recaptcha.css";

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
        {images.map((_, index) => (
          <img
            src={`/images/chihuahua_muffin/${index + 1}.JPG`}
            key={index}
            className="grid-item"
          ></img>
        ))}
      </div>
      <div>bottom buttons</div>
    </div>
  );
};

export default Recaptcha;
