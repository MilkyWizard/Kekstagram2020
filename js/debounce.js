'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 500;

  window.debounce = function (callback) {
    let lastTimeout = null;

    return function () {
      let parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
