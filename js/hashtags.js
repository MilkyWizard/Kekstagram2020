'use strict';

window.hashtags = (function () {
  const HASHTAGS_MIN_LENGTH = 2;
  const HASHTAGS_MAX_LENGTH = 20;
  const HASHTAGS_MAX_COUNT = 5;
  const HASHTAG_REGEX = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  let hashtagsInputEl = document.querySelector(`.text__hashtags`);
  let commentEl = document.querySelector(`.text__description`);
  let btnSubmitEl = document.querySelector(`.img-upload__submit`);

  let validateHashtag = function (hashtag) {
    if (hashtag.length < HASHTAGS_MIN_LENGTH) {
      return `Минимальная длина одного хэш-тега 2 символа, включая решётку`;
    }
    if (hashtag.length > HASHTAGS_MAX_LENGTH) {
      return `Максимальная длина одного хэш-тега 20 символов, включая решётку`;
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return `Хэш-тег должен начинаться с # и содержать только буквы и цифры`;
    }
    return ``;
  };

  let checkUniqHashtag = function (hashtags) {
    let uniqHastagsMap = [];
    for (let i = 0; i < hashtags.length; i++) {
      if (uniqHastagsMap.includes(hashtags[i])) {
        return false;
      } else {
        uniqHastagsMap.push(hashtags[i]);
      }
    }
    return true;
  };

  let validate = function (hashtagsString) {
    let hashtags = toArray(hashtagsString);
    for (let i = 0; i < hashtags.length; i++) {
      let error = validateHashtag(hashtags[i]);
      if (error) {
        return error;
      }
    }
    if (hashtags.length > HASHTAGS_MAX_COUNT) {
      return `Нельзя указать больше пяти хэш-тегов`;
    }
    if (!checkUniqHashtag(hashtags)) {
      return `Один и тот же хэш-тег не может быть использован дважды`;
    }
    return ``;
  };

  let toArray = function (hashtagStr) {
    let hashtags = hashtagStr
    .toLowerCase()
    .split(` `);
    return hashtags.filter(Boolean);
  };

  let onKeyDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      evt.stopPropagation();
    }
  };

  let onInput = function (evt) {
    let value = evt.target.value;
    let error = validate(value);
    evt.target.setCustomValidity(error);
    hideBorderError();
  };

  let showBorderError = function () {
    hashtagsInputEl.style.border = `2px solid red`;
  };

  let hideBorderError = function () {
    hashtagsInputEl.style.border = ``;
  };

  let onButtonSubmitClick = function () {
    let error = validate(hashtagsInputEl.value);
    if (error) {
      showBorderError();
    } else {
      hideBorderError();
    }
  };

  let init = function () {
    commentEl.addEventListener(`keydown`, onKeyDown);
    btnSubmitEl.addEventListener(`click`, onButtonSubmitClick);
    hashtagsInputEl.addEventListener(`keydown`, onKeyDown);
    hashtagsInputEl.addEventListener(`input`, onInput);
  };

  let reset = function () {
    commentEl.removeEventListener(`keydown`, onKeyDown);
    btnSubmitEl.removeEventListener(`click`, onButtonSubmitClick);
    hashtagsInputEl.removeEventListener(`keydown`, onKeyDown);
    hashtagsInputEl.removeEventListener(`input`, onInput);
  };

  return {
    reset,
    init
  };
})();
