const inputImage = document.getElementById("inputImage");
const preview = document.getElementById("imagePreview");
const errorText = document.getElementById("errorText");
const qrData = document.getElementById("qrData");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const MAX_SIZE = 512;

inputImage.addEventListener(
  "change",
  () => {
    errorText.textContent = "";

    const prevImage = document.getElementById("asdf");
    if (prevImage) {
      preview.removeChild(prevImage);
    }

    const fileList = inputImage.files;

    if (fileList.length === 0) {
      errorText.textContent = "No image selected";
      qrData.textContent = "";
      return;
    }

    const file = fileList[0];

    if (!file.type.startsWith("image/")) {
      errorText.textContent = "Please upload an image";
      return;
    }

    const img = document.createElement("img");
    img.id = "asdf";
    img.file = file;

    const objectUrl = URL.createObjectURL(img.file);
    img.src = objectUrl;
    preview.appendChild(img);

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
        qrData.textContent = qrCode.data;
        console.log("Found QR code", qrCode);
      } else {
        qrData.textContent = "No QR code found";
      }

      URL.revokeObjectURL(objectUrl);
    };
  },
  false
);
