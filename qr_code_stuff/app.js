const fileInput = document.getElementById("file-input");
const chooseImageButton = document.getElementById("choose-image-button");
const inputPreview = document.getElementById("input-preview");
const outputPreview = document.getElementById("output-preview");
const intro = document.getElementById("intro");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});

const MAX_SIZE = 512;

const retryButton = document.createElement("button");
retryButton.id = "retry-button";
retryButton.style.display = "None";
outputPreview.appendChild(retryButton);

const retryIcon = document.createElement("img");
retryIcon.src = "assets/retry.png";
retryIcon.alt = "Retry with another image";
retryIcon.id = "retry-icon";
retryButton.appendChild(retryIcon);

retryButton.addEventListener("click", () => {
  fileInput.click();
});

chooseImageButton.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener(
  "change",
  () => {
    clearPreviousElements();

    intro.style.display = "none";
    chooseImageButton.style.display = "none";
    retryButton.style.display = "";

    const fileList = fileInput.files;

    if (fileList.length === 0) {
      showErrorMessage();
      return;
    }

    const file = fileList[0];

    if (!file.type.startsWith("image/")) {
      showErrorMessage();
      return;
    }

    const img = document.createElement("img");
    img.style.maxWidth = "30%";
    img.style.height = "auto";
    img.id = "image";
    img.file = file;

    const objectUrl = URL.createObjectURL(img.file);
    img.src = objectUrl;
    inputPreview.appendChild(img);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      const scale = Math.min(MAX_SIZE / width, MAX_SIZE / height, 1);
      const newWidth = Math.floor(width * scale);
      const newHeight = Math.floor(height * scale);

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

      if (qrCode) {
        const data = qrCode.data;
        var outputData;

        if (isUrl(data)) {
          outputData = document.createElement("a");
          outputData.setAttribute("href", data);
        } else {
          outputData = document.createElement("p");
        }

        outputData.textContent = data;
      } else {
        outputData = document.createElement("p");
        outputData.textContent = "No QR code found";
      }

      outputData.id = "output-data";
      outputPreview.insertBefore(outputData, outputPreview.firstChild);

      URL.revokeObjectURL(objectUrl);
    };
  },
  false
);

/**
 * Checks whether a string of text is a URL that starts with http:// or https://
 * @param {str} text The text to check
 * @returns Whether text is a URL
 */
function isUrl(text) {
  const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/;
  return regex.test(text);
}

/**
 * Removes the DOM elements associated with the previous QR code scan.
 */
function clearPreviousElements() {
  const prevInput = document.getElementById("image");
  const prevOutput = document.getElementById("output-data");

  if (prevInput) {
    inputPreview.removeChild(prevInput);
  }
  if (prevOutput) {
    outputPreview.removeChild(prevOutput);
  }
}

/**
 * Adds error message text prompting the user to select an image.
 */
function showErrorMessage() {
  const outputData = document.createElement("p");
  outputData.textContent = "Please select an image";

  outputData.id = "output-data";
  outputPreview.insertBefore(outputData, outputPreview.firstChild);
}
