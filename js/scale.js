'use strict';

window.scale = (function () {
  const MIN = 25;
  const MAX = 100;
  const STEP = 25;
  const INITIAL_VALUE = 100;

  const scaleControlValueEl = document.querySelector(`.scale__control--value`);
  const imgUploadPreviewEl = document.querySelector(`.img-upload__preview`);
  const buttonZoomOutEl = document.querySelector(`.scale__control--smaller`);
  const buttonZoomInEl = document.querySelector(`.scale__control--bigger`);

  const getValue = function () {
    return parseInt(scaleControlValueEl.value, 10);
  };

  const onButtonZoomInPressed = function () {
    const valueScale = getValue();
    setValue(valueScale < MAX ? valueScale + STEP : valueScale);
  };

  const onButtonZoomOutPressed = function () {
    const valueScale = getValue();
    setValue(valueScale > MIN ? valueScale - STEP : valueScale);
  };

  const setValue = function (valueScale) {
    scaleControlValueEl.value = valueScale + `%`;
    imgUploadPreviewEl.style.transform = `scale(` + (valueScale / INITIAL_VALUE) + `)`;
  };

  const reset = function () {
    buttonZoomInEl.removeEventListener(`click`, onButtonZoomInPressed);
    buttonZoomOutEl.removeEventListener(`click`, onButtonZoomOutPressed);
  };

  const init = function () {
    setValue(MAX);
    buttonZoomInEl.addEventListener(`click`, onButtonZoomInPressed);
    buttonZoomOutEl.addEventListener(`click`, onButtonZoomOutPressed);
  };

  return {
    init,
    reset
  };
})();
