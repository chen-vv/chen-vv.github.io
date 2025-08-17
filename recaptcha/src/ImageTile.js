import React, { useState } from "react";
import "./ImageTile.css";

const ImageTile = (imageSrc, index) => {
  const [selected, setSelected] = useState(false);

  const toggleSelection = ({ imageSrc }) => {
    setSelected(!selected);
  };

  return (
    <div
      className={`tile ${selected ? "selected" : ""}`}
      onClick={toggleSelection}
    >
      <img src={imageSrc} key={index} className="tile-image" />
      {selected && (
        <div className="checkmark">
          <span class="material-symbols-outlined">check</span>
        </div>
      )}
    </div>
  );
};

export default ImageTile;
