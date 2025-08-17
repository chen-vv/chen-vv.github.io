import "./Recaptcha.css";
import ImageTile from "./ImageTile";
import { useEffect, useState } from "react";

/* TODO NOTES: Randomize images, implement skip if none */

const Recaptcha = () => {
  const images = Array.from({ length: 9 });
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [imageFolder, setImageFolder] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        // Choose a random folder
        setImageFolder(
          json.recaptchas[Math.floor(Math.random() * json.recaptchas.length)]
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const onImageSelected = (imageId) => {
    console.log(`${imageId} was selected`);

    setSelectedImageIds((prevIds) => {
      if (prevIds.includes(imageId)) {
        return prevIds.filter((id) => id !== imageId);
      } else {
        return [...prevIds, imageId];
      }
    });
  };

  const onProceed = () => {
    const correctIds = imageFolder.correctIds;
    if (selectedImageIds.length === correctIds.length) {
      for (const id of correctIds) {
        if (selectedImageIds.includes(id) === false) {
          alert("Bot has failed the reCAPTCHA.");
          return;
        }
      }

      alert("Good job, human!");
    } else {
      alert("Bot has failed the reCAPTCHA.");
    }
  };

  return imageFolder ? (
    <div className="Recaptcha">
      <div className="blue-box">
        <p className="captcha-text-smaller">Select all squares with</p>
        <p className="captcha-text-bold">{imageFolder.subject}</p>
        <p className="captcha-text-regular">If there are none, click skip</p>
      </div>
      {
        <div className="grid">
          {images.map((_, index) => (
            <ImageTile
              imageSrc={`/images/${imageFolder.folderName}/${index + 1}.JPG`}
              index={`${index + 1}.JPG`}
              selectedCallback={onImageSelected}
            />
          ))}
        </div>
      }
      <div className="buttons-box">
        <span className="material-symbols-outlined info-button">info</span>
        <button className="proceed-button" onClick={onProceed}>
          {selectedImageIds.length === 0 ? "SKIP" : "VERIFY"}
        </button>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Recaptcha;
