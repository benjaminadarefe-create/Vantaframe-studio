
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
  /* Vantaframe AI assistant — upgraded lead-generation assistant. */
  const botRoot=document.getElementById("vf-bot-root");
  if(!botRoot){
    const bot=document.createElement("div");
    bot.id="vf-bot-root";
    bot.innerHTML=`
      <button class="vf-bot-launch" aria-label="Open Vantaframe AI assistant"><span class="vf-bot-dot"></span><span class="vf-bot-spark">✦</span></button>
      <section class="vf-bot-panel" aria-label="Vantaframe AI assistant" aria-hidden="true">
        <header class="vf-bot-head">
          <div><span class="vf-bot-status"></span><strong>Vantaframe AI</strong><small>Your AI advertising assistant</small></div>
          <button class="vf-bot-close" aria-label="Close assistant">×</button>
        </header>
        <div class="vf-bot-messages"></div>
        <div class="vf-bot-chips">
          <button data-q="What services do you offer?">Services</button>
          <button data-q="How does pricing work?">Pricing</button>
          <button data-q="I want to create an ad">Start a project</button>
          <button data-q="I want to speak to someone">Contact</button>
        </div>
        <form class="vf-bot-form"><input class="vf-bot-input" autocomplete="off" placeholder="Ask Vantaframe AI..." aria-label="Message"/><button type="submit" aria-label="Send message">↑</button></form>
      </section>`;
    document.body.appendChild(bot);

    const panel=bot.querySelector(".vf-bot-panel"), launch=bot.querySelector(".vf-bot-launch"), close=bot.querySelector(".vf-bot-close");
    const messages=bot.querySelector(".vf-bot-messages"), form=bot.querySelector(".vf-bot-form"), input=bot.querySelector(".vf-bot-input"), chips=bot.querySelector(".vf-bot-chips");
    const lead={name:"",business:"",service:"",format:"",budget:"",contact:""};
    let captureStep="";

    function addMessage(value,who="bot",actions=[]){
      const row=document.createElement("div"); row.className="vf-bot-msg "+who;
      const bubble=document.createElement("div"); bubble.className="vf-bot-bubble"; bubble.textContent=value; row.appendChild(bubble);
      if(actions.length){
        const a=document.createElement("div"); a.className="vf-bot-actions";
        actions.forEach(item=>{const b=document.createElement("button");b.type="button";b.textContent=item.label;b.addEventListener("click",item.onClick);a.appendChild(b);});
        row.appendChild(a);
      }
      messages.appendChild(row); messages.scrollTop=messages.scrollHeight;
    }
    function openBot(){
      panel.classList.add("open");panel.setAttribute("aria-hidden","false");launch.classList.add("hidden");
      if(!messages.children.length) addMessage("Hi! I’m Vantaframe AI. I can answer questions about our advertising services, explain how projects work, and help you prepare a project request.");
      setTimeout(()=>input.focus(),120);
    }
    function closeBot(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");launch.classList.remove("hidden");}
    function send(value){value=(value||"").trim();if(!value)return;addMessage(value,"user");input.value="";setTimeout(()=>reply(value),180);}
    function handoff(){
      const lines=[
        "Hi Vantaframe Studio, I’d like to discuss an AI advertisement.",
        "Name: "+(lead.name||"Not provided"),
        "Business: "+(lead.business||"Not provided"),
        "Product/service: "+(lead.service||"Not provided"),
        "Preferred format: "+(lead.format||"Not provided"),
        "Budget range: "+(lead.budget||"Not provided"),
        "Contact: "+(lead.contact||"Not provided"),
        "I found Vantaframe through the website."
      ];
      window.open("https://wa.me/2348102992744?text="+encodeURIComponent(lines.join("\n")),"_blank");
    }
    function startProject(){
      captureStep="name";
      addMessage("Great. Let’s get the project details together. What’s your name?");
    }
    function reply(raw){
      const q=raw.toLowerCase();

      if(captureStep==="name"){lead.name=raw;captureStep="business";addMessage("Nice to meet you, "+raw+"! What’s the name of your business?");return;}
      if(captureStep==="business"){lead.business=raw;captureStep="service";addMessage("What product or service do you want the ad to promote?");return;}
      if(captureStep==="service"){lead.service=raw;captureStep="format";addMessage("What kind of content are you looking for? For example: product ad, service ad, social media commercial, real estate, automotive, or something else.");return;}
      if(captureStep==="format"){lead.format=raw;captureStep="budget";addMessage("Do you already have a budget range in mind? You can say something like ₦50k–₦100k, or simply say “not sure.”");return;}
      if(captureStep==="budget"){lead.budget=raw;captureStep="contact";addMessage("Finally, what’s the best WhatsApp number or contact detail for the project?");return;}
      if(captureStep==="contact"){
        lead.contact=raw;captureStep="";
        addMessage("Perfect. I’ve got the project brief. You can send it directly to Vantaframe Studio on WhatsApp.", "bot", [{label:"Send project to WhatsApp",onClick:handoff}]);
        return;
      }

      if(q.includes("service")||q.includes("what do you")||q.includes("offer")||q.includes("what is vantaframe")){
        addMessage("Vantaframe Studio creates premium AI-powered advertisements and short-form commercial content for businesses — including product ads, service ads, social media commercials, real estate, automotive, fashion, and other promotional videos.");
        return;
      }
      if(q.includes("price")||q.includes("cost")||q.includes("pricing")||q.includes("how much")){
        addMessage("Project pricing is customized rather than one fixed price. It can depend on the video length, number of scenes, production complexity, editing, voice-over, and revisions.");
        addMessage("If you want, I can collect your project details and send a ready-to-review brief to Vantaframe Studio.");
        addMessage("Would you like to start a project?", "bot", [{label:"Yes, start",onClick:startProject}]);
        return;
      }
      if(q.includes("start")||q.includes("want an ad")||q.includes("need an ad")||q.includes("create an ad")||q.includes("advert")){
        startProject();return;
      }
      if(q.includes("contact")||q.includes("whatsapp")||q.includes("human")||q.includes("speak to someone")){
        addMessage("Absolutely. You can contact the Vantaframe team directly on WhatsApp, or I can prepare a project brief for you first.", "bot", [
          {label:"Open WhatsApp",onClick:()=>window.open("https://wa.me/2348102992744?text="+encodeURIComponent(inquiryMessage),"_blank")},
          {label:"Prepare project brief",onClick:startProject}
        ]);
        return;
      }
      if(q.includes("video")||q.includes("commercial")||q.includes("ugc")||q.includes("reels")||q.includes("tiktok")||q.includes("youtube")||q.includes("instagram")){
        addMessage("Yes. The ads can be designed for platforms such as TikTok, Instagram, YouTube Shorts, WhatsApp, and other social platforms.");
        return;
      }
      if(q.includes("nigeria")||q.includes("nigerian")){
        addMessage("Yes. Vantaframe can tailor the creative to Nigerian businesses, locations, audiences, products, and brand styles.");
        return;
      }
      if(q.includes("how does it work")||q.includes("how it works")||q.includes("process")){
        addMessage("The usual process is: understand your business and offer → plan the creative → produce the AI visuals → edit the commercial → review and refine → deliver the final video.");
        return;
      }
      if(q.includes("realistic")||q.includes("look real")){
        addMessage("Yes. The creative can be directed toward realistic, premium-looking visuals rather than an obviously artificial style.");
        return;
      }
      addMessage("I can help with Vantaframe’s services, pricing approach, ad formats, project process, or getting your project brief to the team. Try asking me about any of those.");
    }

    launch.addEventListener("click",openBot);close.addEventListener("click",closeBot);
    form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});
    chips.addEventListener("click",e=>{if(e.target.matches("button"))send(e.target.dataset.q);});
  }

})();