document.documentElement.classList.add("js");

/* Premium page boot */
window.addEventListener("load",()=>{
  setTimeout(()=>document.body.classList.add("loaded"),500);
});

/* Smooth anchor navigation */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

/* Navigation state */
const nav=document.querySelector(".nav");
const progressBar=document.createElement("div");
progressBar.className="scroll-progress";
document.body.appendChild(progressBar);

const updateScrollUI=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
  if(nav)nav.classList.toggle("scrolled",window.scrollY>24);
};
window.addEventListener("scroll",updateScrollUI,{passive:true});
updateScrollUI();

/* Safe custom cursor */
if(window.matchMedia("(pointer:fine)").matches){
  const dot=document.createElement("div");
  const ring=document.createElement("div");
  dot.className="cursor-dot";
  ring.className="cursor-ring";
  document.body.append(dot,ring);

  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener("pointermove",e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  const tick=()=>{
    rx+=(mx-rx)*.15;ry+=(my-ry)*.15;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.querySelectorAll("a,button,.work-card").forEach(el=>{
    el.addEventListener("mouseenter",()=>ring.classList.add("cursor-big"));
    el.addEventListener("mouseleave",()=>ring.classList.remove("cursor-big"));
  });
}

/* Magnetic buttons */
if(window.matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".button,.nav-cta").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`translate(${x*7}px,${y*7}px)`;
    });
    el.addEventListener("pointerleave",()=>el.style.transform="translate(0,0)");
  });
}

/* Scroll reveals */
const revealTargets=document.querySelectorAll(
  ".section-head,.category-heading,.work-card,.service,.about-mark,.about>div:last-child,.contact>*"
);
revealTargets.forEach(el=>el.classList.add("reveal"));

const revealObserver=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
revealTargets.forEach(el=>revealObserver.observe(el));

/* Hero motion */
const heroVisual=document.querySelector(".hero-visual");
const visualCard=document.querySelector(".visual-card");
if(heroVisual&&visualCard&&window.matchMedia("(pointer:fine)").matches){
  heroVisual.addEventListener("pointermove",e=>{
    const r=heroVisual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    visualCard.style.transform=`rotate(${4+x*2.5}deg) translate3d(${x*8}px,${y*8}px,0)`;
  });
  heroVisual.addEventListener("pointerleave",()=>{
    visualCard.style.transform="rotate(4deg)";
  });
}

/* Portfolio video system — safe on iPhone/Safari */
const portfolioVideos=[...document.querySelectorAll("video")];
portfolioVideos.forEach(video=>{
  video.setAttribute("playsinline","");
  video.setAttribute("webkit-playsinline","");
  video.preload="metadata";

  video.addEventListener("error",()=>{
    const card=video.closest(".video-card");
    if(card)card.classList.add("media-missing");
  });

  video.addEventListener("loadeddata",()=>{
    const card=video.closest(".video-card");
    if(card)card.classList.add("media-ready");
  });
});

/* Hero videos can autoplay muted; portfolio videos stay user-controlled. */
const heroVideos=[...document.querySelectorAll(".hero-media video")];
heroVideos.forEach(video=>{
  video.muted=true;
  video.defaultMuted=true;
  video.play().catch(()=>{});
});

/* 3D portfolio tilt — disabled on touch */
if(window.matchMedia("(pointer:fine)").matches){
  document.querySelectorAll(".video-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${y*-5}deg) scale(1.012)`;
    });
    card.addEventListener("pointerleave",()=>{
      card.style.transform="";
    });
  });
}

/* Floating hero particles */
const hero=document.querySelector(".hero");
if(hero){
  const fragment=document.createDocumentFragment();
  for(let i=0;i<10;i++){
    const p=document.createElement("i");
    p.className="hero-particle";
    const s=2+Math.random()*3;
    p.style.width=p.style.height=s+"px";
    p.style.left=(8+Math.random()*84)+"%";
    p.style.top=(25+Math.random()*60)+"%";
    p.style.animationDuration=(7+Math.random()*7)+"s";
    p.style.animationDelay=(Math.random()*6)+"s";
    fragment.appendChild(p);
  }
  hero.appendChild(fragment);
}
