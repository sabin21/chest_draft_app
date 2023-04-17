import '../public/css/chest_sub_1.scss';

import { gsap, Power3 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

init();

function init(){
  // imageReveal();
  // textSpliting();
  // horizontalScroll();
  function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
  }

  const header = document.querySelector('.header-wrap');
  const btnDponateCircle = document.querySelector('.btn-donate-circle');
  
  ScrollTrigger.create({
    trigger:'.body-wrap',
    start: "top 200",
    onUpdate: (self)=> {
      if(self.direction === -1 && window.scrollY > 80){
        header.classList.add('active');
        btnDponateCircle.classList.add('hide');
        header.style.top = '0px';
        if(hasClass(header, 'white')){
          header.classList.remove('white');
        };
      }else if(self.direction === -1 && window.scrollY < 80){
        header.classList.remove('active');
        btnDponateCircle.classList.remove('hide');
        header.classList.add('white');
      }
      else{
        header.classList.remove('active');
      };
      if(self.direction === 1 && window.scrollY > 80){
        header.style.top = '-200px';
      }
    }
  });

  const btnDoante = document.querySelector('.btn-donate-circle');
  const quickLinks = document.querySelectorAll('.quick-link') ;

  btnDoante.addEventListener('click', ()=>{
    btnDoante.classList.toggle('active');
    if(btnDoante.classList.contains('active')){
      quickLinks.forEach((quickLink)=>{
        quickLink.classList.add('show');
        quickReveal(quickLink);
      });
    }else {
      quickLinks.forEach((quickLink)=>{
        quickLink.classList.remove('show');
      });
    } 
  });

  function quickReveal(el){
    gsap.timeline()
    .from(el, { y:-100, duration:0.5, stagger: 1});
  }
  
}
