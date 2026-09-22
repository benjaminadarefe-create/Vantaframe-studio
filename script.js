/* ===== Preloader ===== */
window.addEventListener("load",()=>{
  setTimeout(()=>document.body.classList.add("loaded"),450);
});

/* ===== Split headings into words for mask reveal ===== */
document.querySelectorAll(".mask-heading").forEach(heading=>{
  const walk=node=>{
    node.childNodes.forEach(child=>{
      if(child.nodeType===3){
        const frag=document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(chunk=>{
          if(chunk.trim()===""){frag.appendChild(document.createTextNode(chunk));return}
          const word=document.createElement("span");
          word.className="word";
          const inner=document.createElement("span");
          inner.className="word-inner";
          inner.textContent=chunk;
          word.appendChild(inner);
          frag.appendChild(word);
        });
        node.replaceChild(frag,child);
      }else if(child.nodeType===1){
        walk(child);
      }
    });
  };
  walk(heading);
});
const maskObserver=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const words=entry.target.querySelectorAll(".word-inner");
      words.forEach((w,i)=>{w.style.transitionDelay=(i*35)+"ms"});
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }
  });
},{threshold:.2});
document.querySelectorAll(".mask-heading").forEach(h=>maskObserver.observe(h));

/* ===== Custom cursor ===== */
if(window.matchMedia("(pointer:fine)").matches){
  const dot=document.querySelector(".cursor-dot");
  const ring=document.querySelector(".cursor-ring");
  let rx=0,ry=0,mx=0,my=0;
  window.addEventListener("pointermove",e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  const animRing=()=>{
    rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animRing);
  };
  animRing();
  document.querySelectorAll("a,button,.work-card,.nav-cta").forEach(el=>{
    el.addEventListener("mouseenter",()=>ring.classList.add("cursor-big"));
    el.addEventListener("mouseleave",()=>ring.classList.remove("cursor-big"));
  });
  document.addEventListener("mouseleave",()=>{dot.classList.add("cursor-hidden");ring.classList.add("cursor-hidden")});
  document.addEventListener("mouseenter",()=>{dot.classList.remove("cursor-hidden");ring.classList.remove("cursor-hidden")});
}

/* ===== Magnetic buttons ===== */
if(window.matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".button,.nav-cta").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`translate(${x*10}px,${y*10}px)`;
    });
    el.addEventListener("pointerleave",()=>{el.style.transform="translate(0,0)"});
  });
}

/* ===== Scroll progress bar ===== */
const progressBar=document.createElement("div");
progressBar.className="scroll-progress";
document.body.appendChild(progressBar);
const updateProgress=()=>{
  const h=document.documentElement;
  const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progressBar.style.width=scrolled+"%";
};
window.addEventListener("scroll",updateProgress,{passive:true});
updateProgress();

/* ===== Parallax orbs ===== */
const orbA=document.querySelector(".orb-a"),orbB=document.querySelector(".orb-b");
if(orbA&&orbB&&window.matchMedia("(pointer:fine)").matches){
  window.addEventListener("scroll",()=>{
    const y=window.scrollY;
    orbA.style.transform=`translate3d(0,${y*.12}px,0)`;
    orbB.style.transform=`translate3d(0,${y*-.08}px,0)`;
  },{passive:true});
}

const links=document.querySelectorAll('a[href^="#"]');
links.forEach(link=>link.addEventListener("click",e=>{const target=document.querySelector(link.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}}));

const nav=document.querySelector(".nav");
const onScroll=()=>nav&&nav.classList.toggle("scrolled",window.scrollY>24);
window.addEventListener("scroll",onScroll,{passive:true});onScroll();

const revealTargets=document.querySelectorAll(".section-head,.category-heading,.work-card,.service,.about-mark,.about>div:last-child,.contact>*");
revealTargets.forEach(el=>el.classList.add("reveal"));
const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
revealTargets.forEach(el=>observer.observe(el));

const rotateTargets=document.querySelectorAll(".service span,.video-label span");
rotateTargets.forEach(el=>el.classList.add("reveal-rotate"));
const rotateObserver=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}})},{threshold:.4});
rotateTargets.forEach(el=>rotateObserver.observe(el));

/* ===== Hero floating particles ===== */
const heroEl=document.querySelector(".hero");
if(heroEl){
  for(let i=0;i<14;i++){
    const p=document.createElement("div");
    p.className="hero-particle";
    const size=2+Math.random()*4;
    p.style.width=size+"px";p.style.height=size+"px";
    p.style.left=Math.random()*100+"%";
    p.style.top=40+Math.random()*55+"%";
    p.style.animationDuration=(6+Math.random()*8)+"s";
    p.style.animationDelay=(Math.random()*8)+"s";
    heroEl.appendChild(p);
  }
}

/* ===== 3D tilt on video cards ===== */
if(window.matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".video-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`rotateY(${x*10}deg) rotateX(${y*-10}deg) scale(1.02)`;
    });
    card.addEventListener("pointerleave",()=>{card.style.transform="rotateY(0) rotateX(0) scale(1)"});
  });
}

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
