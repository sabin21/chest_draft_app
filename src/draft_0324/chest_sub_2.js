import '../public/css/chest_sub_2.scss';

import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import rive from "@rive-app/canvas";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', function(){
 
    $(this).scrollTop(0);

  init();
});


function init(){
  // imageReveal();
  // textSpliting();
  // horizontalScroll();
  // btnDonate();

  // let bodyScrollBar = Scrollbar.init(document.body, { damping: 0.1, delegateTo: document });
  // ScrollTrigger.scrollerProxy(".scroller", {
  //   scrollTop(value) {
  //     if (arguments.length) {
  //       bodyScrollBar.scrollTop = value;
  //     }
  //     return bodyScrollBar.scrollTop;
  //   }
  // });
  // bodyScrollBar.addListener(ScrollTrigger.update);
  // heroScrollEffect();
  // bodyScrollBar.addListener( status => {
  //   const offset = status.offset
  //   let navBarElem = document.querySelector('.header-bar-wrap');
  //   let navMenuElem = document.querySelector('.header-menu-wrap');
  //   let btnDonateElem = document.querySelector('.btn-donate');

  //   navBarElem.style.top = offset.y + 'px';
  //   navMenuElem.style.top = offset.y + 40 + 'px';
  //   btnDonateElem.style.top = offset.y + 40 + 'px';

  //   if(offset.y > 100){
  //     navBarElem.style.left = '0' + 'px';
  //     navMenuElem.style.left = '-200' + 'px';
  //   }else {
  //     navBarElem.style.left = '-84' + 'px';
  //     navMenuElem.style.left = '40' + 'px';
  //   }
  // });
  heroScrollEffect();
  window.addEventListener('scroll', function(){
    if(window.scrollY > 80){
      document.querySelector('.header-bar-wrap').style.left = '0' + 'px';
      document.querySelector('.header-menu-wrap').style.left = '-200' + 'px';
    }else{
      document.querySelector('.header-bar-wrap').style.left = '-84' + 'px';
      document.querySelector('.header-menu-wrap').style.left = '40' + 'px';
    }
  });
} //-- init END

function heroScrollEffect(){
  gsap.utils.toArray(".hero-card-wrap").forEach(function(card){
    let tlHeroCard = gsap.timeline({
      scrollTrigger:{
        trigger: card,
        //scroller: ".scroller",
        scrub:1,
        start:"top 600", 
        end: "bottom 70%"
      }
    });
    tlHeroCard.from(card, {
      scale: .7, duration:1, transformOrigin:"right center"
    },0);
    
  });
  // gsap.from(".hero-card-wrap", {
  //   x: -500,
  //   opacity:0,
  //   scrollTrigger: {
  //     trigger: ".hero-card-wrap",
  //     scroller: ".scroller",
  //     scrub:1,
  //     start:"top 40%", 
  //     //end: "bottom center",
  //     toggleActions: "play none none reset",
  //     // markers:true
  //   },
  // });
}

// Image Reveal
function imageReveal(){
  let revealContainers = document.querySelectorAll(".reveal-img");

  revealContainers.forEach((wrapper) => {
    let reavelImage = wrapper.querySelector("img");
    let tl = gsap.timeline({
      scrollTrigger: {
      trigger: wrapper,
      toggleActions: "restart none none reset"
      }
    });

    tl.set(wrapper, { autoAlpha: 1 });
    tl.from(wrapper, {
      xPercent: -100, duration: 1.5, ease: Power3.out
    }, 0);
    tl.from(reavelImage, {
      xPercent: 100, scale: 1.3, duration: 1.5, delay: -1.5, ease: Power3.out
    });
  });
}

// Text Spliting
function textSpliting(){
  window.addEventListener("load", function () {
    let splitWords = function (selector) {
      var elements = document.querySelectorAll(selector);
  
      elements.forEach(function (el) {
        el.dataset.splitText = el.textContent;
        el.innerHTML = el.textContent
          .split(/\s/)
          .map(function (word) {
            return word
              .split("-")
              .map(function (word) {
                return '<span class="word">' + word + "</span>";
              })
              .join('<span class="hyphen">-</span>');
          })
          .join('<span class="whitespace"> </span>');
      });
    };
  
    let splitLines = function (selector) {
      var elements = document.querySelectorAll(selector);
  
      splitWords(selector);
  
      elements.forEach(function (el) {
        var lines = getLines(el);
  
        var wrappedLines = "";
        lines.forEach(function (wordsArr) {
          wrappedLines += '<span class="line"><span class="words">';
          wordsArr.forEach(function (word) {
            wrappedLines += word.outerHTML;
          });
          wrappedLines += "</span></span>";
        });
        el.innerHTML = wrappedLines;
      });
    };
  
    let getLines = function (el) {
      var lines = [];
      var line;
      var words = el.querySelectorAll("span");
      var lastTop;
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (word.offsetTop != lastTop) {

          if (!word.classList.contains("whitespace")) {
            lastTop = word.offsetTop;
  
            line = [];
            lines.push(line);
          }
        }
        line.push(word);
      }
      return lines;
    };
  
    splitLines(".reveal-text");
  
    let revealText = document.querySelectorAll(".reveal-text");
  
    let revealLines = revealText.forEach((element) => {
      const lines = element.querySelectorAll(".words");
  
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          toggleActions: "restart none none reset"
        }
      });
      tl.set(element, { autoAlpha: 1 });
      tl.from(lines, {
        yPercent: 100, duration: 1, ease: Power3.out, stagger: 0.25, delay: 0.2
      });
    });
  });  
} // Text Spliting reveal

//----------------------

function horizontalScroll(){
  let horizontalSections = gsap.utils.toArray(".section-pin");
  horizontalSections.forEach((section) => {
    let wrap = section.querySelector(".pin-wrap");
    let pinBoxes = section.querySelectorAll(".pin-wrap > .card-wrap");
    let wrapWidth = wrap.offsetWidth;
    let horizontalScrollLength = wrapWidth - window.innerWidth;

    gsap.to(wrap, {
      scrollTrigger: {
        //scroller: horizontalSections, 
        scrub: true,
        trigger: section,
        pin: true,
        start: "top top"
      },
      x: -horizontalScrollLength,
      ease: "none"
    });
  });
}

//----------------------

// gsap.timeline({
//   scrollTrigger:{
//     trigger:'.section-2',
//     start:'top 50%',
//     end:'top top',
//     scrub:1
//   }})
// .to('.page-back-color', { backgroundColor: '#F8EFE4'},0);
