'use strict';

window.popups = (function () {
  let mainBlockEl = document.querySelector(`main`);
  let templateSuccessEl = document.querySelector(`#success`).
    content.querySelector(`.success`);
  let templateErrorEl = document.querySelector(`#error`).
    content.querySelector(`.error`);

  let openPopup = function (popupEl) {
    mainBlockEl.appendChild(popupEl);

    let closePopup = function () {
      popupEl.remove();
      popupEl.removeEventListener(`click`, onButtonClick);
      document.removeEventListener(`click`, onSectionClick);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };

    let onButtonClick = function (evt) {
      if (evt.target.nodeName === `BUTTON`) {
        closePopup();
      }
    };

    let onPopupEscPress = function (evt) {
      if (evt.keyCode === window.utils.ESC_KEY) {
        closePopup();
      }
    };

    let onSectionClick = function (evt) {
      if (evt.target.nodeName === `SECTION`) {
        closePopup();
      }
    };

    popupEl.addEventListener(`click`, onButtonClick);
    document.addEventListener(`click`, onSectionClick);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  let showLoadSuccess = function () {
    let popupSuccessEl = templateSuccessEl.cloneNode(true);
    openPopup(popupSuccessEl);
  };

  let showLoadError = function () {
    let popupErrorEl = templateErrorEl.cloneNode(true);
    openPopup(popupErrorEl);
  };

  return {
    showLoadSuccess,
    showLoadError
  };
})();
