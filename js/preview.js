'use strict';

window.preview = (function () {
  const DISPLAY_COMMENTS_COUNT = 5;
  let bodyEl = document.querySelector(`body`);
  let bigPictureEl = document.querySelector(`.big-picture`);
  let bigImgEl = bigPictureEl.querySelector(`.big-picture__img img`);
  let likesBigImgEl = bigPictureEl.querySelector(`.likes-count`);
  let commentsBigImgEl = bigPictureEl.querySelector(`.comments-count`);
  let captionBigImgEl = bigPictureEl.querySelector(`.social__caption`);
  let buttonEl = document.querySelector(`.big-picture__cancel`);
  let commentEl = document.querySelector(`.social__footer-text`);
  let commentsLoaderEl = bigPictureEl.querySelector(`.comments-loader`);
  let commentsCountEl = bigPictureEl.querySelector(`.social__comment-count`);
  let page = 0;
  let currentComments = [];

  let showBigPicture = function (currentPhoto) {
    page = 0;
    currentComments = currentPhoto.comments;
    bigImgEl.src = currentPhoto.url;
    likesBigImgEl.textContent = currentPhoto.likes;
    commentsBigImgEl.textContent = currentPhoto.comments.length;
    captionBigImgEl.textContent = currentPhoto.description;

    let commentsOnPage = getNextComments();
    window.comment.render(commentsOnPage);

    if (!isLastPage()) {
      commentsLoaderEl.classList.remove(`hidden`);
    } else {
      commentsLoaderEl.classList.add(`hidden`);
    }

    setNumberCommentsString(commentsOnPage);
    openBigPicture();
  };

  let setNumberCommentsString = function (commentsOnPage) {
    commentsCountEl.textContent = commentsOnPage.length + ` из ` + currentComments.length + ` комментариев`;
  };

  let openBigPicture = function () {
    bigPictureEl.classList.remove(`hidden`);
    bodyEl.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onPopupEscPress);
    buttonEl.addEventListener(`click`, onButtonCloseClick);
    commentEl.addEventListener(`keydown`, onKeyDown);
    commentsLoaderEl.addEventListener(`click`, onCommentsLoaderClick);
  };

  let closeBigPicture = function () {
    bigPictureEl.classList.add(`hidden`);
    bodyEl.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    buttonEl.removeEventListener(`click`, onButtonCloseClick);
    commentEl.removeEventListener(`keydown`, onKeyDown);
    commentsLoaderEl.removeEventListener(`click`, onCommentsLoaderClick);
  };

  let onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      closeBigPicture();
    }
  };

  let onKeyDown = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEY) {
      evt.stopPropagation();
    }
  };

  let getCommentsCountOnPage = function () {
    return DISPLAY_COMMENTS_COUNT * page;
  };

  let getNextComments = function () {
    page += 1;
    return currentComments.slice(0, getCommentsCountOnPage());
  };

  let isLastPage = function () {
    return currentComments.length <= getCommentsCountOnPage();
  };

  let onButtonCloseClick = function () {
    closeBigPicture();
  };

  let onCommentsLoaderClick = function () {
    let commentsOnPage = getNextComments();
    window.comment.render(commentsOnPage);

    if (isLastPage()) {
      commentsLoaderEl.classList.add(`hidden`);
    }

    setNumberCommentsString(commentsOnPage);
  };

  return {
    showBigPicture,
  };
})();
