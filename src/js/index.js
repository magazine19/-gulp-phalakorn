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
    console.log(this.startObserb);
  
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

document.addEventListener('keyup', function (event) {
  if (event.defaultPrevented) {
      return;
  }
  var key =  event.keyCode;
  if (key === 39){ 
    plus_item(1);
  }else if (key === 37){
    plus_item(-1);
  }

});


$( window ).load(function() {
  var total_item_width = 0;
  var block_slide_width = $(".block_slide").width();
  $(".slide .item").each(function() {
    var item_width = $(this).outerWidth();
    total_item_width = total_item_width + item_width;  
  });
  
  $(".slide").css('width',total_item_width*2);
  slide(slideIndex);

});

var slideIndex = 0;

function plus_item(n) {
  var check_num_of_div = document.getElementsByClassName("slide-item").length;
  if(slideIndex+n >= 0 && slideIndex+n < check_num_of_div){
    $(".slide-item").removeClass('slide-active');
    slide(slideIndex += n);
  }
}

function slide(n) {
  
  var i;
  var width_before = 0;
  var item_width;
  var transfrom_num;
  var block_slide_width = $(".block_slide").width();
  var x = document.getElementsByClassName("slide-item");
  
  if (n == 0) {
    x[0].classList.add("slide-active");
  }
  var item_width = x[n].offsetWidth;
  var left = x[n].offsetLeft;
  var transfrom_num = ((block_slide_width - item_width)/2)-(left);

   $(".slide").css('transform',"translate3d("+transfrom_num+"px, 0px, 0px)");  
   x[slideIndex].classList.add("slide-active");
   
   $(".slide .slide-item.slide-active").click(function() {
      $(".buttons").css('display','flex');  
    });

         delete_item();
    save_item();

}

function delete_item(){
  $(".button-remove").click(function() {
    var r = window.confirm("Are you sure you want to delete this item?");
    if (r == true) {
      $(".slide-item.slide-active").remove(); 
      slide(0);
      slideIndex = 0;
    } 
    $(".buttons").css('display','none');
    $(".button-remove").reset();
  });

}
function save_item(){
  var src = $(".slide .slide-item.slide-active img").attr('src');
  $(".button-save").attr('href',src);
  $(".button-save").click(function() {
    $(".buttons").css('display','none');
  });
}



