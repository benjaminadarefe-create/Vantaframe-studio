const links=document.querySelectorAll('a[href^="#"]');
links.forEach(link=>link.addEventListener("click",e=>{const target=document.querySelector(link.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}}));

const nav=document.querySelector(".nav");
const onScroll=()=>nav&&nav.classList.toggle("scrolled",window.scrollY>24);
window.addEventListener("scroll",onScroll,{passive:true});onScroll();

const revealTargets=document.querySelectorAll(".section-head,.category-heading,.work-card,.service,.about-mark,.about>div:last-child,.contact>*");
revealTargets.forEach(el=>el.classList.add("reveal"));
const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
revealTargets.forEach(el=>observer.observe(el));

const heroVisual=document.querySelector(".hero-visual");
const visualCard=document.querySelector(".visual-card");
if(heroVisual&&visualCard&&window.matchMedia("(pointer:fine)").matches){
  heroVisual.addEventListener("pointermove",e=>{
    const r=heroVisual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    visualCard.style.transform=`rotate(${4+x*3}deg) translate(${x*7}px,${y*7}px)`;
  });
  heroVisual.addEventListener("pointerleave",()=>visualCard.style.transform="rotate(4deg)");
}
