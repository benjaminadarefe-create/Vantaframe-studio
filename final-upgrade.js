
/* Vantaframe Studio — final upgrade behavior
   Does not replace, edit, or change any existing video source. */
(function(){
  function makeIcon(type){
    if(type==="whatsapp") return '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.8 1.9 6.8L3 29l6.8-2.1c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.6 12.7-12.6C28.7 8.6 23 3 16 3Zm0 23c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.2 1.2-3.9-.3-.4a10.3 10.3 0 0 1-1.7-5.6C5.3 9.7 10.1 5 16 5c5.9 0 10.7 4.7 10.7 10.6 0 5.9-4.8 10.4-10.7 10.4Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.5.7.3 1.3.5 1.7.6.7.2 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/></svg>';
    if(type==="instagram") return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4" y="4" width="24" height="24" rx="7"/><circle cx="16" cy="16" r="6.2"/><circle cx="23" cy="9" r="1.4" fill="currentColor" stroke="none"/></svg>';
    return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="3"/><path d="M5.5 9 16 18l10.5-9"/></svg>';
  }

  const contact=document.querySelector(".contact-links");
  const inquiryMessage="Hi Vantaframe Studio, I found you through your website and I'm interested in getting an AI advertisement for my business. I'd like to know more about your services, pricing, and how we can get started.";
  const whatsappUrl="https://wa.me/2348102992744?text="+encodeURIComponent(inquiryMessage);
  const emailUrl="mailto:benjaminadarefe@gmail.com?subject="+encodeURIComponent("AI Advertisement Inquiry")+"&body="+encodeURIComponent(inquiryMessage);
  if(contact){
    contact.classList.add("vf-icon-links");
    contact.innerHTML=[
      '<a class="vf-icon-btn" href="'+emailUrl+'" aria-label="Email" title="Email">'+makeIcon("email")+"</a>",
      '<a class="vf-icon-btn" href="https://www.instagram.com/_vantaframestudio_?stkn=cmJqMzNidmhxMHB2&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">'+makeIcon("instagram")+"</a>",
      '<a class="vf-icon-btn" href="'+whatsappUrl+'" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">'+makeIcon("whatsapp")+"</a>"
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
  /* Vantaframe AI assistant — static lead-generation bot.
     No private API key is exposed in the browser. */
  const botStylesReady = document.getElementById("vf-bot-root");
  if(!botStylesReady){
    const bot=document.createElement("div");
    bot.id="vf-bot-root";
    bot.innerHTML=`
      <button class="vf-bot-launch" aria-label="Open Vantaframe AI assistant">
        <span class="vf-bot-dot"></span><span class="vf-bot-spark">✦</span>
      </button>
      <section class="vf-bot-panel" aria-label="Vantaframe AI assistant" aria-hidden="true">
        <header class="vf-bot-head">
          <div><span class="vf-bot-status"></span><strong>Vantaframe AI</strong><small>AI advertising assistant</small></div>
          <button class="vf-bot-close" aria-label="Close assistant">×</button>
        </header>
        <div class="vf-bot-messages"></div>
        <div class="vf-bot-chips">
          <button data-q="What does Vantaframe Studio do?">What do you do?</button>
          <button data-q="How much does an AI ad cost?">Pricing</button>
          <button data-q="I want an AI ad for my business.">I want an ad</button>
        </div>
        <form class="vf-bot-form">
          <input class="vf-bot-input" autocomplete="off" placeholder="Ask Vantaframe AI..." aria-label="Message"/>
          <button type="submit" aria-label="Send message">↑</button>
        </form>
      </section>`;
    document.body.appendChild(bot);

    const panel=bot.querySelector(".vf-bot-panel");
    const launch=bot.querySelector(".vf-bot-launch");
    const close=bot.querySelector(".vf-bot-close");
    const messages=bot.querySelector(".vf-bot-messages");
    const form=bot.querySelector(".vf-bot-form");
    const input=bot.querySelector(".vf-bot-input");
    const chips=bot.querySelector(".vf-bot-chips");
    const lead={name:"",business:"",need:""};

    function addMessage(text,who="bot",actions=[]){
      const row=document.createElement("div");
      row.className="vf-bot-msg "+who;
      const bubble=document.createElement("div");
      bubble.className="vf-bot-bubble";
      bubble.textContent=text;
      row.appendChild(bubble);
      if(actions.length){
        const a=document.createElement("div"); a.className="vf-bot-actions";
        actions.forEach(item=>{
          const b=document.createElement("button"); b.type="button"; b.textContent=item.label;
          b.addEventListener("click",item.onClick); a.appendChild(b);
        });
        row.appendChild(a);
      }
      messages.appendChild(row);
      messages.scrollTop=messages.scrollHeight;
    }
    function openBot(){
      panel.classList.add("open"); panel.setAttribute("aria-hidden","false"); launch.classList.add("hidden");
      if(!messages.children.length){
        addMessage("Hi! I’m Vantaframe AI. I can explain our AI advertising services, give basic pricing guidance, and help you start a project.");
      }
      setTimeout(()=>input.focus(),150);
    }
    function closeBot(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");launch.classList.remove("hidden");}
    function send(text){
      text=(text||"").trim(); if(!text)return;
      addMessage(text,"user"); input.value="";
      setTimeout(()=>reply(text),220);
    }
    function reply(raw){
      const q=raw.toLowerCase();
      if(q.includes("price")||q.includes("cost")||q.includes("how much")||q.includes("pricing")){
        addMessage("Pricing depends on the ad length, number of scenes, AI production, editing, voice-over, and revisions. I can help you get a project quote from Vantaframe Studio.");
        addMessage("To start, tell me your name and the business you want to advertise.");
        lead.need="pricing";
        return;
      }
      if(q.includes("what do you")||q.includes("what is vantaframe")||q.includes("services")||q.includes("offer")){
        addMessage("Vantaframe Studio creates premium AI-powered advertisements and short-form commercial content for businesses. We can create product ads, service ads, social media commercials, real-estate promos, automotive ads, and more.");
        return;
      }
      if(q.includes("ai ad")||q.includes("advert")||q.includes("business")||q.includes("want an ad")||q.includes("need an ad")){
        addMessage("Absolutely. Tell me your name, your business name, and what you want to advertise. I’ll prepare the details for a quick handoff to the Vantaframe team.");
        lead.need=raw;
        return;
      }
      if(q.includes("contact")||q.includes("whatsapp")||q.includes("talk")||q.includes("human")){
        addMessage("You can contact Vantaframe Studio directly on WhatsApp. I can also prepare a message for you with the details you give me.", "bot", [{
          label:"Open WhatsApp",
          onClick:()=>window.open("https://wa.me/2348102992744?text="+encodeURIComponent(inquiryMessage)," _blank")
        }]);
        return;
      }
      if(q.includes("video")||q.includes("commercial")||q.includes("ugc")||q.includes("reels")||q.includes("tiktok")){
        addMessage("Yes. Vantaframe Studio can create short-form AI video ads designed for platforms like TikTok, Instagram, YouTube Shorts, and WhatsApp.");
        return;
      }
      if(q.includes("nigeria")||q.includes("nigerian")){
        addMessage("Yes. Vantaframe can create ads tailored to Nigerian businesses, locations, audiences, and brand styles.");
        return;
      }
      if(lead.name==="" && raw.split(/\\s+/).length<=5){
        lead.name=raw; addMessage("Nice to meet you, "+raw+"! What’s the name of your business?");
        return;
      }
      if(lead.name && !lead.business){
        lead.business=raw; addMessage("Got it. What product or service would you like the ad to promote?");
        return;
      }
      if(lead.business && !lead.need){
        lead.need=raw; addMessage("Perfect. I have the basics. You can send these details to Vantaframe Studio on WhatsApp to continue.", "bot", [{
          label:"Send to WhatsApp",
          onClick:()=>{
            const msg="Hi Vantaframe Studio, I’d like an AI advertisement. My name is "+lead.name+". My business is "+lead.business+". I want to promote: "+lead.need+". I found you through your website.";
            window.open("https://wa.me/2348102992744?text="+encodeURIComponent(msg),"_blank");
          }
        }]);
        return;
      }
      addMessage("I can help with Vantaframe’s AI advertising services, pricing guidance, project details, and contacting the team. What would you like to know?");
    }
    launch.addEventListener("click",openBot); close.addEventListener("click",closeBot);
    form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});
    chips.addEventListener("click",e=>{if(e.target.matches("button"))send(e.target.dataset.q);});
  }

})();