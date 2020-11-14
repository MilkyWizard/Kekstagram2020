'use strict';

window.comment = (function () {
  let bigPictureEl = document.querySelector(`.big-picture`);
  let commentsBlockEl = bigPictureEl.querySelector(`.social__comments`);
  let socialCommentEl = commentsBlockEl.querySelector(`.social__comment`);

  let createElement = function (comment) {
    let commentEl = socialCommentEl.cloneNode(true);
    let commentPictureEl = commentEl.querySelector(`.social__picture`);
    let commentTextEl = commentEl.querySelector(`.social__text`);

    commentPictureEl.src = comment.avatar;
    commentPictureEl.alt = comment.name;
    commentTextEl.textContent = comment.message;
    return commentEl;
  };

  let render = function (comments) {
    let fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      let itemComment = createElement(comment);
      fragment.appendChild(itemComment);
    });

    commentsBlockEl.textContent = ``;
    commentsBlockEl.appendChild(fragment);
  };

  return {
    render
  };
})();
