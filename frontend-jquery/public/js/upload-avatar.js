const fileReader = new FileReader();
const file = document.getElementById("avatar-upload-input").files[0];
const preview = document.getElementById("avatar-preview");

$("avatar-upload-input").on("change", () => {
  updateAvatarPreview();
});

const updateAvatarPreview = () => {
  fileReader.addEventListener(
    "load",
    () => {
      console.log("zzz");
      preview.src = fileReader.result;
    },
    false
  );

  if (file) {
    fileReader.readAsDataURL(file);
  }
};

const getAvatarData = () => {
  if (fileReader.result) {
    console.log("result", fileReader.result);
    return fileReader.result;
  } else {
    console.log(document.getElementById("avatar-upload-input").files);
    console.log(preview);
    console.log("no avatar data");
  }
};
