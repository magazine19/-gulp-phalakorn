"use strict";

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
}, config);
document.addEventListener("DOMContentLoaded", function (e) {
  var images = document.getElementsByClassName('ImageLazyLoad'); // console.log(images);

  Array.from(images).forEach(function (image) {
    observer.observe(image);
  });
});