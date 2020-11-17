'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callback) {
    let lastTimeout;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
