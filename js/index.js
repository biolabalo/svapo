const prev  = document.querySelector('.spanner-left');
const next = document.querySelector('.spanner-right');

const track = document.querySelector('.track');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
  carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
  index === 2 ? 2 :  index++;
  track.style.transform = `translateX(-${index * carouselWidth}px)`;

})

prev.addEventListener('click', () => {
    console.log( document.getElementsByTagName('body'))
  index === 0 ? 0 :  --index;
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
})

let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
  initialPosition = e.pageX;
  moving = true;
  const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
  if (transformMatrix !== 'none') {
    transform = parseInt(transformMatrix.split(',')[4].trim());
  }
};

const gestureMove = (e) => {
  if (moving) {
    const currentPosition = e.pageX;
    const diff = currentPosition - initialPosition;
    track.style.transform = `translateX(${transform + diff}px)`;  
  }
};

const gestureEnd = (e) => {
  moving = false;
};

if (window.PointerEvent) {
  window.addEventListener('pointerdown', gestureStart);
  window.addEventListener('pointermove', gestureMove);
  window.addEventListener('pointerup', gestureEnd);  
} else {
  window.addEventListener('touchdown', gestureStart);
  window.addEventListener('touchmove', gestureMove);
  window.addEventListener('touchup', gestureEnd);  

  window.addEventListener('mousedown', gestureStart);
  window.addEventListener('mousemove', gestureMove);
  window.addEventListener('mouseup', gestureEnd);  
}