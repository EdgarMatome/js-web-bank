'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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


// adding cookies
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');


message.innerHTML = 'We use cookies for improved functionality and analytrics.\
 <button class="btn btn--close-cookie">Got it!</button>'

//  prpend adds to the top first child 
// header.prepend(message);
//  append adds to the bottom last child
 header.append(message);


//  Deleting Elements
document.querySelector('.btn--close-cookie').addEventListener('click', function (){
  message.remove()
})


// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '104%'
// message.style.padding = '20px 0';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';


// Adding Smooth Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  // const s1coords = section1.getBoundingClientRect()

  section1.scrollIntoView({behavior: 'smooth'})
})

