'use strict';

window.filter = (function () {
  let buttonsEl = document.querySelectorAll(`.img-filters__button`);
  let type = {
    0: `initial`,
    1: `random`,
    2: `discussed`
  };
  let currentButtonIndex = 0;
  let callbacks = [];

  let fireCallbacks = function () {
    callbacks.forEach(function (callback) {
      callback(type[currentButtonIndex]);
    });
  };

  buttonsEl.forEach(function (buttonEl, index) {
    buttonEl.addEventListener(`click`, function (evt) {
      buttonsEl[currentButtonIndex].classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      currentButtonIndex = index;
      fireCallbacks();
    });
  });

  let onChange = function (callback) {
    callbacks.push(callback);
  };

  return {
    onChange,
  };
})();
