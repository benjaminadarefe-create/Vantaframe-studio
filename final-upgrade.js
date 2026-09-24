
/* Vantaframe Studio — final upgrade behavior
   Does not replace, edit, or change any existing video source. */
(function(){
  function makeIcon(type){
    if(type==="whatsapp") return '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 1.9 6.8L3 29l6.8-2.1c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.6 12.7-12.6C28.7 8.6 23 3 16 3Zm0 23c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.2 1.2-3.9-.3-.4a10.3 10.3 0 0 1-1.7-5.6C5.3 9.7 10.1 5 16 5c5.9 0 10.7 4.7 10.7 10.6 0 5.9-4.8 10.4-10.7 10.4Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.7.6.7.2 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>';
    if(type==="instagram") return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4" y="4" width="24" height="24" rx="7"/><circle cx="16" cy="16" r="6.2"/><circle cx="23" cy="9" r="1.4" fill="currentColor" stroke="none"/></svg>';
    return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="3"/><path d="M5.5 9 16 18l10.5-9"/></svg>';
  }

  const contact=document.querySelector(".contact-links");
  if(contact){
    contact.classList.add("vf-icon-links");
    contact.innerHTML=[
      '<a class="vf-icon-btn" href="mailto:benjaminadarefe@gmail.com" aria-label="Email" title="Email">'+makeIcon("email")+"</a>",
      '<a class="vf-icon-btn" href="https://www.instagram.com/_vantaframestudio_?stkn=cmJqMzNidmhxMHB2&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">'+makeIcon("instagram")+"</a>",
      '<a class="vf-icon-btn" href="https://wa.me/2348102992744" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">'+makeIcon("whatsapp")+"</a>"
    ].join("");
  }

  /* Add a light cinematic hover response to the existing hero videos. */
  document.querySelectorAll(".hero-media").forEach(function(card){
    card.addEventListener("pointermove",function(e){
      if(!window.matchMedia("(pointer:fine)").matches) return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      if(card.classList.contains("hero-media-one")){
        card.style.transform="translate(-50%,-50%) rotateY("+(x*3)+"deg) rotateX("+(-y*3)+"deg) scale(1.015)";
      }else{
        card.style.transform="rotateY("+(x*3)+"deg) rotateX("+(-y*3)+"deg)";
      }
    });
    card.addEventListener("pointerleave",function(){
      if(card.classList.contains("hero-media-one")) card.style.transform="translate(-50%,-50%)";
      else if(card.classList.contains("hero-media-two")) card.style.transform="rotate(-5deg)";
      else card.style.transform="rotate(5deg)";
    });
  });
})();
