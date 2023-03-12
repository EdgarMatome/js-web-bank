'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Adding Smooth Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// adding cookies
const header = document.querySelector('.header');
const message = document.createElement('div');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scroll



// adding cookies
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for improved functionality and analytrics.\
 <button class="btn btn--close-cookie">Got it!</button>'

//  prpend adds to the top first child 
// header.prepend(message);
//  append adds to the bottom last child
header.append(message);
//  Deleting Elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove()
})


// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '104%'
// message.style.padding = '20px 0';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// Adding Smooth Scroll

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect()

  section1.scrollIntoView({ behavior: 'smooth' })
});


//PAGE NAVIGATION withouth EVENT DELEGATION
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log("LINK", id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});s
//   })
// })

//PAGINATION WITH EVENT DELEGATION
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);

  //Mathcing strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log("LINK", id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT



tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // console.log(clicked);

  // Guard Clause
  if (!clicked) return;


  // ACTIVE TAB
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(cs => cs.classList.remove('operations__content--active'));

  // ACTIVE CONTENT AREA
  // console.log(clicked.dataset.tab);
  // Remove active area

  // activate Content Area
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});



const handleHover = function (e) {

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// MENU FADE ANIMATION
// PASSING CALLBACK FUNCTION WITGH PARAMETERS
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// GOOD STICKY NAV WITH intersection api
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root:null,
//   threshold: [0, 0.2],

// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries

  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);


// reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}


const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,

});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');

console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return

  //REPLACE SRC WITH data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0
  });

imgTargets.forEach(img => imgObserver.observe(img));



// SLIDER
const slider = function () {

}

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

// slides.forEach((s, i) => s.style.transform = ` translateX(${100 * i})`);

//  Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}">
    </button>`);
  });
}


const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot =>
    dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
}



const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = ` 
  translateX(${100 * (i - slide)}%)`);
}



const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
}

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
}

init();

// Event Handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
})


// sticky nave
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function(e){
//   // console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// })


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////


// rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

// const rabdomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = rabdomColor();
//   console.log('LINK', e.target, e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = rabdomColor();
//   console.log('Container', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = rabdomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });


