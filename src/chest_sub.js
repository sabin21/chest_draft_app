import '../public/css/chest_sub.css';
import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

init();

function init(){
  horizontalScroll();

  gsap.timeline().to('.redball-wrap', {rotation: 360, duration:10, repeat:-1, ease: "none"});
  gsap.timeline({
  scrollTrigger:{
    trigger:'.section-video',
    start:'top 30%',
    end:'bottom bottom',
    scrub:1,
    snap:1
  }})
  .to('.redball-wrap', { opacity: 0.3, x: 600, scale:1.5, duration:1 })
  .to('.video-mask',{width: '100%', height:'100vh', borderRadius:'0px', duration:1},-0.5);

} //---init END

//--------------------------

function horizontalScroll(){

  const bigCardInner = document.querySelector('.big-card-inner');
  let bigCards = gsap.utils.toArray('.big-card-wrap');
  const bigCardInnerWidth = (bigCards[0].offsetWidth * bigCards.length+1)+(bigCards.length-1*80);
  gsap.set('.big-card-inner', { width:bigCardInnerWidth});

  let horizontalScrollLength = bigCardInnerWidth - window.innerWidth/3;

  let scrollTween = gsap.to(bigCardInner, {
    scrollTrigger: {
      scrub: true,
      trigger: ".section-pin",
      pin: true,
      start: "top top"
    },
    x: -horizontalScrollLength,
    ease: "none"
  });
 
  let wrap2 = document.querySelector(".pin-wrap2");
  let wrapWidth2 = wrap2.offsetWidth;
  let horizontalScrollLength2 = wrapWidth2 - window.innerWidth;

  gsap.to(wrap2, {
    scrollTrigger: {
      scrub: true,
      trigger: ".section-current",
      pin: true,
      start: "top top"
    },
    x: -horizontalScrollLength2,
    // x: -1000,
    ease: "none"
  });
 
}

//--------------------------

navCommon();

function navCommon() {
    const bodyWrap = document.querySelector('.body-wrap');
    const header = document.querySelector('.header-wrap');
    const btnScrollTop = document.querySelector('.btn-page-top');
    const footer = document.querySelector('.footer');
    const bottomBar = document.querySelector('.bottom-bar');

  let pageScroll = ScrollTrigger.create({
    trigger:bodyWrap,
    start: "top 200",
    onUpdate: (self)=> {
      if(self.direction === -1 && window.scrollY > 80){
        header.classList.add('active');
        header.style.top = '0px';
        
      }else if(self.direction === -1 && window.scrollY < 80){
        header.classList.remove('active');
      }
      else{
        header.classList.remove('active');
      };
      if(self.direction === 1 && window.scrollY > 80){
        header.style.top = '-100px';
        if(document.body.contains(bottomBar)){
          bottomBar.classList.add('show');
        }
      }else if(self.direction === -1){
        if(document.body.contains(bottomBar)){
          bottomBar.classList.remove('show');
        }
      }
      if(window.scrollY >= 200){
        btnScrollTop.style.opacity = '1';
      }else {
        btnScrollTop.style.opacity = '0';
      }
      if(window.scrollY > (bodyWrap.offsetHeight - window.innerHeight*1.075)){
        btnScrollTop.style.bottom = `${footer.offsetHeight + 40}` + 'px';
      }else {
        btnScrollTop.style.bottom = '30px';
      }
      
    }
  });

  btnScrollTop.addEventListener('click', ()=>
    gsap.to(window,{scrollTo:0})
  );

  const btnDoante = document.querySelector('.btn-donate');
  const gnbDonate = document.querySelector('.gnb-donate-wrap');

  btnDoante.addEventListener('click', ()=>{
    btnDoante.classList.toggle('active');
    if(btnDoante.classList.contains('active')){
      gnbDonate.classList.add('active');
    }else {
      gnbDonate.classList.remove('active');
    }
  });

}

//-----------------

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
        // Don't start with whitespace
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

  gsap.registerPlugin(ScrollTrigger);
  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset"
      }
    });
    tl.set(element, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.25,
      delay: 0.2
    });
  });
});
