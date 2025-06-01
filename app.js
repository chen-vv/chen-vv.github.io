const inputImage = document.getElementById("inputImage");
const preview = document.getElementById("imagePreview");
const errorText = document.getElementById("errorText");

inputImage.addEventListener(
  "change",
  () => {
    errorText.textContent = "";

    const prevImage = document.getElementById("asdf");
    if (prevImage) {
      preview.removeChild(prevImage);
    }

    const fileList = inputImage.files;
    const file = fileList[0];

    if (!file.type.startsWith("image/")) {
      errorText.textContent = "Please upload an image";
      return;
    }

    const img = document.createElement("img");
    img.id = "asdf";
    img.file = file;
    preview.appendChild(img);

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },
  false
);
