const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/comment.js",
    "./js/debounce.js",
    "./js/editor.js",
    "./js/effect.js",
    "./js/filter.js",
    "./js/hashtags.js",
    "./js/photos.js",
    "./js/popups.js",
    "./js/preview.js",
    "./js/scale.js",
    "./js/upload.js",
    "./js/utils.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
