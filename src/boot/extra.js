import { Loading, QSpinnerGears, QSpinnerBall, QSpinnerPie } from "quasar";

Loading.setDefaults({
  spinner: QSpinnerPie,
  spinnerSize: "sm",
  spinnerColor: "white"
});

// ini untuk rezise image
export let resizeImage = function(settings) {
  let file = settings.file;
  let maxSize = settings.maxSize;
  let reader = new FileReader();
  let image = new Image();
  let canvas = document.createElement("canvas");
  let dataURItoBlob = function(dataURI) {
    let bytes =
      dataURI.split(",")[0].indexOf("base64") >= 0
        ? atob(dataURI.split(",")[1])
        : unescape(dataURI.split(",")[1]);
    let mime = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    let max = bytes.length;
    let ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    let blob = new Blob([ia], {
      type: mime
    });
    let file = new File([blob], "image.jpg", {
      type: mime
    });
    return file;
  };
  let resize = function() {
    let width = image.width;
    let height = image.height;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    let dataUrl = canvas.toDataURL("image/jpeg");
    return dataURItoBlob(dataUrl);
    // return dataUrl;
  };
  return new Promise(function(ok, no) {
    if (!file.type.match(/image.*/)) {
      no(new Error("Not an image"));
      return;
    }
    reader.onload = function(readerEvent) {
      image.onload = function() {
        return ok(resize());
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};
