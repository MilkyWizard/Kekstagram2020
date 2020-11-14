'use strict';

window.effect = (function () {
  const MAX_SATURATION = 1;
  const MAX_PHOBOS = 3;
  const MAX_HEAT = 3;
  const MIN_HEAT = 1;
  const MAX_EFFECT_VALUE = 100;

  let effectLevelEl = document.querySelector(`.effect-level`);
  let effectsRadiosEl = document.querySelectorAll(`.effects__radio`);
  let imgPreviewEl = document.querySelector(`.img-upload__preview img`);
  let effectLevelValueEl = document.querySelector(`.effect-level__value`);
  let effectLevelLineEl = document.querySelector(`.effect-level__line`);
  let effectLevelPinEl = document.querySelector(`.effect-level__pin`);
  let depthRangeEl = document.querySelector(`.effect-level__depth`);
  let currentEffect = null;

  let effects = {
    chrome: {
      setSaturation(percent) {
        imgPreviewEl.style.filter = `grayscale(` + percent + `)`;
      },
      className: `effects__preview--chrome`,
    },
    sepia: {
      setSaturation(percent) {
        imgPreviewEl.style.filter = `sepia(` + percent + `)`;
      },
      className: `effects__preview--sepia`,
    },
    marvin: {
      setSaturation(percent) {
        imgPreviewEl.style.filter = `invert(` + percent * 100 + `%)`;
      },
      className: `effects__preview--marvin`,
    },
    phobos: {
      setSaturation(percent) {
        imgPreviewEl.style.filter = `blur(` + MAX_PHOBOS * percent + `px)`;
      },
      className: `effects__preview--phobos`,
    },
    heat: {
      setSaturation(percent) {
        imgPreviewEl.style.filter = `brightness(` + ((MAX_HEAT - MIN_HEAT) * percent + MIN_HEAT) + `)`;
      },
      className: `effects__preview--heat`,
    }
  };

  let showLevelSlider = function () {
    effectLevelEl.classList.remove(`hidden`);
  };

  let hideLevelSlider = function () {
    effectLevelEl.classList.add(`hidden`);
  };

  let removeCurrentEffect = function () {
    if (currentEffect) {
      imgPreviewEl.classList.remove(currentEffect.className);
    }
  };

  let onChange = function (evt) {
    removeCurrentEffect();
    currentEffect = effects[evt.target.value];

    if (currentEffect) {
      showLevelSlider();
      imgPreviewEl.classList.add(currentEffect.className);
      setSaturation(MAX_SATURATION);
      setSliderPosition(MAX_SATURATION);
    } else {
      setDefaults();
    }
  };

  let setSaturation = function (percent) {
    currentEffect.setSaturation(percent);
    effectLevelValueEl.value = Math.round(percent * 100);
  };

  let setSliderPosition = function (percent) {
    let offset = percent * 100;
    effectLevelPinEl.style.left = offset + `%`;
    depthRangeEl.style.width = offset + `%`;
  };

  let onSaturationChange = function (evt) {
    let percent = getSaturationPercent(evt);
    setSaturation(percent);
    setSliderPosition(percent);
  };

  let reset = function () {
    onPinMouseUp();
    effectLevelLineEl.removeEventListener(`mouseup`, onSaturationChange);
    effectLevelPinEl.removeEventListener(`mousedown`, onPinMouseDown);
    for (let radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
      effectsRadiosEl[radioIndex].removeEventListener(`change`, onChange);
    }
  };

  let getSaturationPercent = function (evt) {
    let rect = effectLevelLineEl.getBoundingClientRect();
    let offsetX = evt.clientX - rect.left;
    let percent = offsetX / rect.width;
    let roundedPercent = Math.min(1, Math.max(0, percent));

    return roundedPercent;
  };

  let onPinMouseUp = function () {
    document.removeEventListener(`mousemove`, onSaturationChange);
    document.removeEventListener(`mouseup`, onPinMouseUp);
  };

  let onPinMouseDown = function () {
    document.addEventListener(`mouseup`, onPinMouseUp);
    document.addEventListener(`mousemove`, onSaturationChange);
  };

  let setDefaults = function () {
    removeCurrentEffect();
    imgPreviewEl.style.filter = ``;
    hideLevelSlider();
    effectLevelValueEl.value = MAX_EFFECT_VALUE;
    currentEffect = null;
    effectsRadiosEl[0].checked = true;
  };

  let init = function () {
    setDefaults();

    effectLevelLineEl.addEventListener(`mouseup`, onSaturationChange);
    effectLevelPinEl.addEventListener(`mousedown`, onPinMouseDown);
    for (let radioIndex = 0; radioIndex < effectsRadiosEl.length; radioIndex++) {
      effectsRadiosEl[radioIndex].addEventListener(`change`, onChange);
    }
  };

  return {
    init,
    reset
  };
})();
