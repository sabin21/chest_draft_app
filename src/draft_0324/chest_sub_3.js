import '../public/css/chest_sub_3.scss';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

init();

function init(){
  imageReveal();
  textSpliting();
  horizontalScroll();

  window.addEventListener('scroll', function(){
    if(window.scrollY > 80){
      $('.header-wrap').addClass('active');
      //$('.logo').addClass('active');
    }else{
      $('.header-wrap').removeClass('active');
      //$('.logo').removeClass('active');
    }
  });

  gsap.timeline()
  .to('.redball-wrap', {rotation: 360, duration:10, repeat:-1, ease: "none"});
  gsap.timeline({
  scrollTrigger:{
    trigger:'.section-3',
    start:'top center',
    end:'bottom -500',
    scrub:1
  }})
  .to('.redball-wrap', { opacity: 0.3, x: 600, scale:1.5, duration:10 },0);
} //---init END

//------------------
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

//--------------------------
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
