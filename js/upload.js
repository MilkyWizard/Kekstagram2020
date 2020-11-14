
'use strict';

window.upload = (function () {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  let imgPreviewEl = document.querySelector(`.img-upload__preview img`);
  let effectsPreviewEl = document.querySelectorAll(`.effects__preview`);
  let openPopupEditImgEl = document.querySelector(`.img-upload__input`);

  let setPreviews = function (src) {
    imgPreviewEl.src = src;
    effectsPreviewEl.forEach(function (item) {
      item.style.backgroundImage = `url(` + src + `)`;
    });
  };

  let reset = function () {
    setPreviews(`img/upload-default-image.jpg`);
  };

  let addNewImg = function () {
    reset();

    let file = openPopupEditImgEl.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let objectUrl = URL.createObjectURL(file);
      setPreviews(objectUrl);
    }
  };

  return {
    addNewImg,
  };
})();
