"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var config = {
  root: document.querySelector('#AllImages'),
  // avoiding 'root' or setting it to 'null' sets it to default value: viewport
  // root: null,
  rootMargin: '100px',
  threshold: 0.5
};
var isLeaving = false;
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // we are ENTERING the "capturing frame". Set the flag.
      isLeaving = true; //console.log(entry);
      //console.log(entry.target.children);

      var target = entry.target;
      var child = target.children[0];

      if (!!child.src) {
        child.src = child.getAttribute('data-src');
      }
    } else if (isLeaving) {
      // we are EXITING the "capturing frame"
      isLeaving = false; // Do something with exiting entry
    }
  });
}, config); // document.addEventListener("DOMContentLoaded", function (e) {
//   let images = document.getElementsByClassName('ImageLazyLoad');
//  // console.log(images);
//   Array.from(images).forEach(image => {
//     observer.observe(image);
//   });
// });

var ImageLazyLoad =
/*#__PURE__*/
function () {
  function ImageLazyLoad() {
    _classCallCheck(this, ImageLazyLoad);
  }

  _createClass(ImageLazyLoad, [{
    key: "startLoadImageFromClass",
    value: function startLoadImageFromClass(ImageClass) {
      var images = document.getElementsByClassName(ImageClass); // console.log(images);

      Array.from(images).forEach(function (image) {
        observer.observe(image);
      });
    }
  }]);

  return ImageLazyLoad;
}();

document.addEventListener("DOMContentLoaded", function (e) {
  var loadImage = new ImageLazyLoad();
  loadImage.startLoadImageFromClass('ImageLazyLoad');
});