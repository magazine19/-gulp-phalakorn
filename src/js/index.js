const config = {
  root: document.querySelector('#AllImages'), // avoiding 'root' or setting it to 'null' sets it to default value: viewport
  // root: null,
  rootMargin: '100px',
  threshold: 0.5
};

let isLeaving = false;
let observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // we are ENTERING the "capturing frame". Set the flag.
      isLeaving = true;
      //console.log(entry);
      //console.log(entry.target.children);
      let target = entry.target;
      let child = target.children[0];
      if (!!child.src) {
        child.src = child.getAttribute('data-src');
      }
    } else if (isLeaving) {
      // we are EXITING the "capturing frame"
      isLeaving = false;
      // Do something with exiting entry
     
    }
  });
}, config);


// document.addEventListener("DOMContentLoaded", function (e) {
//   let images = document.getElementsByClassName('ImageLazyLoad');
//  // console.log(images);

//   Array.from(images).forEach(image => {
//     observer.observe(image);
//   });
// });

class ImageLazyLoad {

  startLoadImageFromClass(ImageClass) {
  
      let images = document.getElementsByClassName(ImageClass);
     // console.log(images);
    
      Array.from(images).forEach(image => {
        observer.observe(image);
      });
  
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  const loadImage = new ImageLazyLoad();
  loadImage.startLoadImageFromClass('ImageLazyLoad');
});

