import "./Recaptcha.css";
import ImageTile from "./ImageTile";
import { useEffect, useState } from "react";

/* TODO NOTES: Randomize images, implement skip if none */

const Recaptcha = () => {
  const images = Array.from({ length: 9 });
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [imageFolder, setImageFolder] = useState(null);
  const [imageFolderIndex, setImageFolderIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        // Choose a random folder
        var newIndex = Math.floor(Math.random() * json.recaptchas.length);

        while (imageFolderIndex === newIndex) {
          newIndex = Math.floor(Math.random() * json.recaptchas.length);
        }

        setImageFolderIndex(newIndex);

        setImageFolder(json.recaptchas[imageFolderIndex]);
      })
      .catch((err) => console.error(err));
  };

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
          alert("You failed the reCAPTCHA. Are you a bot?");
          return;
        }
      }

      alert("Good job!");
      handleRefresh();
    } else {
      alert("You failed the reCAPTCHA. Are you a bot?");
    }
  };

  const handleRefresh = () => {
    setSelectedImageIds([]);
    fetchImages();
  };

  const handleInfo = () => {
    console.log("TODO: Show info");
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
              selected={selectedImageIds.includes(`${index + 1}.JPG`)}
              selectedCallback={onImageSelected}
            />
          ))}
        </div>
      }
      <div className="buttons-box">
        <div>
          <button onClick={handleRefresh} className="icon-button">
            <span className="material-symbols-outlined icon">refresh</span>
          </button>
          <button onClick={handleInfo} className="icon-button">
            <span className="material-symbols-outlined icon">info</span>
          </button>
        </div>
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
