'use strict';
//DOM manpulations
// create, insert and delete elements to DOM
//Selecting elements from DOM
//querySelectorAll and querySelector will give nodeList(nodelist won't update on the fly)
const allSections = document.querySelectorAll('.section');
console.log(allSections);
// getElementById, getElementByTagName, getElementsByClassName will return HTML collection
console.log(document.getElementById('section--1'));
const header = document.querySelector('.header');
console.log(header);
console.log(document.getElementsByClassName('btn--show-modal'));

//Creating and inserting HTML elements to DOM
//option1
document.querySelector('.header').insertAdjacentHTML('afterbegin', ``);
//option2
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `Accept all cookies <button class='btn btn--close-cookie'>Yes</button>`;
// header.prepend(message.cloneNode(true)); // cloneNode will be cloned all the child nodes as well
header.append(message);
// header.after(message);

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // message element will removed from DOM
  });

// Styles (get and set)
// it will set the inline style
message.style.width = '120%';
message.style.backgroundColor = '#37383d';

// if we want to get the styles not inline or in classes or inherited we have to use getComputedStyle
console.log(getComputedStyle(message).color);
console.log(Number.parseFloat(getComputedStyle(message).height + 40));
//if we want to chnage the style
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// we can use set style as well
// document.documentElement.style.setProperty('--color-primary', 'orange');

// Attributes (get and set)
console.log(message.className);
const logo = document.querySelector('.nav__logo');
console.log(logo.src); // will give absolute logo
console.log(logo.getAttribute('src'));

//Data-attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add();
logo.classList.remove();
//logo.classList.toggle();
//logo.classList.contains();

// Event capturing and bubbling
const randomNumGen = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () =>
  `rgb(${randomNumGen(0, 255)}, ${randomNumGen(0, 255)}, ${randomNumGen(
    0,
    255
  )})`;

// DOM treversing
//child nodes
const h1 = document.querySelector('h1');
console.log(h1.childNodes);
console.log(h1.children);
// h1.firstElementChild.style.color = 'red';
// h1.lastElementChild.style.color = 'blue';

//getting parent nodes
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('h1').style.background = 'gray';

//Sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(element => {
//   if (element != h1) element.style.transform = 'scale(1.5)';
// });
//adding click for nav__link, nav__links(parent), nav(grandparent)
// if we click on the child the parents also changes its BG because of event capturing
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // we can use e.stopPropagation but its not a great idea in all situations
//   //e.stopPropagation();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const gotToSection1 = document.querySelector('#section--1');

const section1coordinates = gotToSection1.getBoundingClientRect();
console.log(section1coordinates); // it will give coord respective to View port
console.log(window.pageXOffset, window.pageYOffset); // with give pagex and y offsets respective to window

btnScrollTo.addEventListener('click', function (e) {
  // old way
  // window.scrollTo({
  //   left: section1coordinates.left + window.scrollX,
  //   top: section1coordinates.top + window.scrollX,
  //   behavior: 'smooth',
  // });
  // new way using scrollIntoView- only work in latest browsers
  gotToSection1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth navigation
//get all navlinks and loop through them to add click event and get href and add scrollIntoView smooth
// document.querySelectorAll('.nav__link').forEach(function (currentElement) {
//   console.log(currentElement);
//   currentElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// using Event deligation --> we have to implement eventlist on parent of all the elements in above case navlinks element and use e. target to get current value
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //if(e.target )
  const id = e.target.getAttribute('href');
  // if statement is to handle the navigation only on nav__link class not outside
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Implementing Tabs part
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//adding event hndlers to all tabs using event deligation
tabsContainer.addEventListener('click', function (e) {
  // e.target will give the button, if we click on span inside button it will give span, to get button we have to get parent of that span using closet
  const currentBtn = e.target.closest('.operations__tab');
  // used to return form the handler when the btn is not clicked or clicked outside btn
  if (!currentBtn) return;
  // removing active class for all the buttons
  tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
  //add the active class to the current btn
  currentBtn.classList.add('operations__tab--active');

  // removing active class to tabs content
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  //adding tabs content active when the particular tabs clicked
  //getting the data-tab value of the current button using currentBtn.dataset.tab and passing the data-tab value dynamically
  document
    .querySelector(`.operations__content--${currentBtn.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Navigation opacity changes based on active nav link
const navlinksparent = document.querySelector('.nav');

const handlerOpacity = function (e) {
  // cheking if the target contains a tags
  if (e.target.classList.contains('nav__link')) {
    console.log(e.target);
    const link = e.target;
    // getting siblings using using target.parent.childs, but here a tags parent is li but we have to select nav
    //selecting parent using closet and selecting all child elements
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};
// event deligation to parent
// navlinksparent.addEventListener('mouseover', function (e) {
//   handlerOpacity(e, 0.5);
// });

// navlinksparent.addEventListener('mouseout', function (e) {
//   handlerOpacity(e, 1);
// });
//-----------------or--------------------
// using bind method to Pass argument to handler
// passing 0.5 as bind arg, so it will go as this keyword to handler function and e is the event from event listener
//In JavaScript, the bind() method is used to create a new function with a specified this value and initial arguments. Syntax: function.bind(thisArg[, arg1[, arg2[, ...]]])

navlinksparent.addEventListener('mouseover', handlerOpacity.bind(0.5));
navlinksparent.addEventListener('mouseout', handlerOpacity.bind(1));

//Sticky navigation when the scroll reaches to section1
//using section1coordinates.top already used above
// using Scroll is a bad practice because it generates the callback function alot of times so better way is intersection observer API
// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1coordinates.top)
//     navlinksparent.classList.add('sticky');
//   else navlinksparent.classList.remove('sticky');
// });

// using intersection abserver api for scrolling
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navlinksparent.classList.add('sticky');
  else navlinksparent.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navlinksparent.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

//reveal sections effect
const revealObsfun = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const revealObs = new IntersectionObserver(revealObsfun, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  revealObs.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading Images for performence
const imgTargets = document.querySelectorAll('img[data-src]');

const imageObsFun = function (entries, observer) {
  // only one thresold so one entry will be there
  const [entry] = entries;

  // adding guard clause
  if (!entry.isIntersecting) return;

  // functionolity is to change src of the image to data src and remove class lazy-img
  entry.target.src = entry.target.dataset.src;

  // we are removing the class lazy-img once image is fully loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObs = new IntersectionObserver(imageObsFun, {
  root: null,
  threshold: 0,
  // rootMargin: '200px',
});

// looping through the images and adding observer for all
imgTargets.forEach(img => imageObs.observe(img));

// Sliding effect
// to slide from one picture to another we will add translate css effect dynamically.
const slides = document.querySelectorAll('.slide');
let curSlide = 0;
const maxSlide = slides.length;

const gotoSlide = function (cSlide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - cSlide)}%)`)
  );
};

// Creating dots on slider
const dotsContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, index) {
    // dot buttons were created based on slides length
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide='${index}'></button>`
    );
  });
};
//calling the function to create dots on page load
createDots(); // 3 dots will create

// adding btn clicks to dot using event deligation means selecting parent
dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    console.log(e.target);
    const { slide } = e.target.dataset; // slide = e.target.dataset.slide// used destructring on obj // Slide number will come because when adding the dots we added data-slide on each dot with correspoding index
    gotoSlide(slide);
    activeDot(slide);
  }
});
// adding active class to the button
const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  // fecting the active dot
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add('dots__dot--active');
};

gotoSlide(0);
activeDot(curSlide);
const slideRight = document.querySelector('.slider__btn--right');
const rightSlideClick = function () {
  // incresing current slide value
  // adding condition to handle last slide after right click
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activeDot(curSlide);
};
slideRight.addEventListener('click', rightSlideClick);

const slideLeft = document.querySelector('.slider__btn--left');
const leftSlideClick = function () {
  // incresing current slide value
  // adding condition to handle last slide after right click
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activeDot(curSlide);
};
slideLeft.addEventListener('click', leftSlideClick);
