'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
