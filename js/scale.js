'use strict';

window.scale = (function () {
  const MIN = 25;
  const MAX = 100;
  const STEP = 25;
  const INITIAL_VALUE = 100;

  let scaleControlValueEl = document.querySelector(`.scale__control--value`);
  let imgUploadPreviewEl = document.querySelector(`.img-upload__preview`);
  let buttonZoomOutEl = document.querySelector(`.scale__control--smaller`);
  let buttonZoomInEl = document.querySelector(`.scale__control--bigger`);

  let getValue = function () {
    return parseInt(scaleControlValueEl.value, 10);
  };

  let onButtonZoomInPressed = function () {
    let valueScale = getValue();
    if (valueScale < MAX) {
      valueScale += STEP;
    }
    setValue(valueScale);
  };

  let onButtonZoomOutPressed = function () {
    let valueScale = getValue();
    if (valueScale > MIN) {
      valueScale -= STEP;
    }
    setValue(valueScale);
  };

  let setValue = function (valueScale) {
    scaleControlValueEl.value = valueScale + `%`;
    imgUploadPreviewEl.style.transform = `scale(` + (valueScale / INITIAL_VALUE) + `)`;
  };

  let reset = function () {
    buttonZoomInEl.removeEventListener(`click`, onButtonZoomInPressed);
    buttonZoomOutEl.removeEventListener(`click`, onButtonZoomOutPressed);
  };

  let init = function () {
    setValue(MAX);
    buttonZoomInEl.addEventListener(`click`, onButtonZoomInPressed);
    buttonZoomOutEl.addEventListener(`click`, onButtonZoomOutPressed);
  };

  return {
    init,
    reset
  };
})();
