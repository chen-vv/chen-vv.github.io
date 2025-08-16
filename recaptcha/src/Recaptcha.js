import React from "react";
import "./Recaptcha.css";

const Recaptcha = () => {
  const images = Array.from({ length: 9 });
  return (
    <div className="Recaptcha">
      <div className="blue-box">
        <p className="captcha-text-smaller">Select all squares with</p>
        <p className="captcha-text-bold">bicycles</p>
        <p className="captcha-text-regular">If there are none, click skip</p>
      </div>
      <div className="grid">
        {images.map((_, index) => (
          <div key={index} className="grid-item"></div>
        ))}
      </div>
      <div>bottom buttons</div>
    </div>
  );
};

export default Recaptcha;
