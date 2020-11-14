'use strict';

window.utils = (function () {
  const ESC_KEY = 27;
  const ENTER_KEY = 13;

  let getRandomValue = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let getRandomArray = function (array, length) {
    return array
      .slice(0)
      .sort(function () {
        return Math.random() - 0.5;
      })
      .splice(0, length);
  };

  return {
    getRandomArray,
    getRandomValue,
    ESC_KEY,
    ENTER_KEY
  };
})();
