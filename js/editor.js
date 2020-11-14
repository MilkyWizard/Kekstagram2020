'use strict';

window.editor = (function () {
  let bodyEl = document.querySelector(`body`);
  let popupEditImgEl = document.querySelector(`.img-upload__overlay`);
  let openPopupEditImgEl = document.querySelector(`.img-upload__input`);
  let closePopupEditImgEl = document.querySelector(`.img-upload__cancel`);
  let formEl = document.querySelector(`.img-upload__form`);
  let hashtagsInputEl = document.querySelector(`.text__hashtags`);
  let descriptionInputEl = document.querySelector(`.text__description`);

  let onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      onClosePopup();
    }
  };

  let onOpenPopup = function () {
    popupEditImgEl.classList.remove(`hidden`);
    bodyEl.classList.add(`modal-open`);
    window.upload.addNewImg();
    window.scale.init();
    window.effect.init();
    window.hashtags.init();
    closePopupEditImgEl.addEventListener(`click`, onClosePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
    formEl.addEventListener(`submit`, onFormSubmit);
  };

  let onClosePopup = function () {
    popupEditImgEl.classList.add(`hidden`);
    bodyEl.classList.remove(`modal-open`);
    hashtagsInputEl.style.border = `2px solid transparent`;
    resetForm();
    window.scale.reset();
    window.effect.reset();
    window.hashtags.reset();
    closePopupEditImgEl.removeEventListener(`click`, onClosePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
    formEl.removeEventListener(`submit`, onFormSubmit);
  };

  let onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.sendPhoto(new FormData(formEl), window.popups.showLoadSuccess, window.popups.showLoadError);
    onClosePopup();
  };

  let resetForm = function () {
    openPopupEditImgEl.value = ``;
    hashtagsInputEl.value = ``;
    descriptionInputEl.value = ``;
  };

  openPopupEditImgEl.addEventListener(`change`, onOpenPopup);
})();
