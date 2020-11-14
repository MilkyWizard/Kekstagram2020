'use strict';

window.backend = (function () {
  const DOWNLOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const UPLOAD = `https://21.javascript.pages.academy/kekstagram`;
  const TIMEOUT_IN_MS = 10000;
  const STATUS_OK = 200;

  let load = function (options) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_OK) {
        options.onSuccess(xhr.response);
      } else {
        options.onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      options.onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      options.onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(options.method, options.url);
    xhr.send(options.data);
  };

  let loadPhotos = function (onSuccess, onError) {
    load(
        {
          method: `GET`,
          url: DOWNLOAD,
          data: null,
          onSuccess,
          onError
        }
    );
  };

  let sendPhoto = function (data, onSuccess, onError) {
    load(
        {
          method: `POST`,
          data,
          url: UPLOAD,
          onSuccess,
          onError
        }
    );
  };

  return {
    loadPhotos,
    sendPhoto
  };
})();
