import { useState } from "react";
import "./ImageTile.css";

const ImageTile = ({ imageSrc, index, selected, selectedCallback }) => {
  const toggleSelection = () => {
    selectedCallback(index);
  };

  return (
    <div
      className={`tile ${selected ? "selected" : ""}`}
      onClick={toggleSelection}
    >
      <img src={imageSrc} key={index} className="tile-image" />
      {selected && (
        <div className="checkmark">
          <span className="material-symbols-outlined">check</span>
        </div>
      )}
    </div>
  );
};

export default ImageTile;
