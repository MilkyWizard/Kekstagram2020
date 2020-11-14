'use strict';

window.photos = (function () {
  const PICTURE_VALUE = 10;

  let pictureEl = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
  let picturesEl = document.querySelector(`.pictures`);
  let imgFiltersEl = document.querySelector(`.img-filters`);
  let initialPictures = [];

  let createElement = function (photo) {
    let element = pictureEl.cloneNode(true);
    let imgEl = element.querySelector(`.picture__img`);
    imgEl.src = photo.url;

    let likesEl = element.querySelector(`.picture__likes`);
    likesEl.textContent = photo.likes;

    let commentsEl = element.querySelector(`.picture__comments`);
    commentsEl.textContent = photo.comments.length;

    return element;
  };

  let registerShowPreview = function (element, photo) {
    element.addEventListener(`click`, function () {
      window.preview.showBigPicture(photo);
    });
  };

  let clear = function () {
    picturesEl
      .querySelectorAll(`.picture`)
      .forEach(function (itemEl) {
        itemEl.remove();
      });
  };

  let render = function (photos) {
    clear();
    let fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      let element = createElement(photo);
      registerShowPreview(element, photo);
      fragment.appendChild(element);
    });

    picturesEl.appendChild(fragment);
  };

  let onLoadSuccess = function (response) {
    render(response);
    initialPictures = response;
    imgFiltersEl.classList.remove(`img-filters--inactive`);
  };

  let onLoadError = function () {
  };

  let getDiscussedPhotos = function () {
    return initialPictures
      .slice(0)
      .sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
  };

  let onFilterChange = window.debounce(function (filterType) {
    if (filterType === `random`) {
      render(window.utils.getRandomArray(initialPictures, PICTURE_VALUE));
    } else if (filterType === `discussed`) {
      render(getDiscussedPhotos());
    } else {
      render(initialPictures);
    }
  });

  window.filter.onChange(onFilterChange);

  window.backend.loadPhotos(
      onLoadSuccess,
      onLoadError
  );
})();
