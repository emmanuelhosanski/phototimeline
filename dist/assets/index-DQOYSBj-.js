(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const M=[{id:"funchal-1",src:"/photos/funchal.jpg",date:"2018-09-11T08:49:08.000Z",label:"funchal"},{id:"IMG_20181103_152841-5",src:"/photos/IMG_20181103_152841.jpg",date:"2018-11-03T14:28:42.000Z",label:"IMG_20181103_152841"},{id:"IMG_20190104_100057-6",src:"/photos/IMG_20190104_100057.jpg",date:"2019-01-04T09:00:58.000Z",label:"IMG_20190104_100057"},{id:"IMG_20191229_111522-7",src:"/photos/IMG_20191229_111522.jpg",date:"2019-12-29T10:15:23.000Z",label:"IMG_20191229_111522"},{id:"IMG_20200103_114742-8",src:"/photos/IMG_20200103_114742.jpg",date:"2020-01-03T10:47:43.000Z",label:"IMG_20200103_114742"},{id:"IMG_1863 2-3",src:"/photos/IMG_1863 2.jpeg",date:"2021-08-11T09:26:28.000Z",label:"IMG_1863 2"},{id:"IMG_1863-4",src:"/photos/IMG_1863.jpeg",date:"2021-08-11T09:26:28.000Z",label:"IMG_1863"},{id:"IMG_2257 2-9",src:"/photos/IMG_2257 2.jpeg",date:"2021-10-31T14:23:53.000Z",label:"IMG_2257 2"},{id:"IMG_2257-10",src:"/photos/IMG_2257.jpeg",date:"2021-10-31T14:23:53.000Z",label:"IMG_2257"},{id:"IMG_2606-12",src:"/photos/IMG_2606.jpg",date:"2021-12-29T16:47:16.000Z",label:"IMG_2606"},{id:"IMG_2636-13",src:"/photos/IMG_2636.jpeg",date:"2021-12-31T11:08:20.000Z",label:"IMG_2636"},{id:"IMG_3801-14",src:"/photos/IMG_3801.jpg",date:"2022-05-24T13:28:53.000Z",label:"IMG_3801"},{id:"IMG_4564-15",src:"/photos/IMG_4564.jpeg",date:"2022-08-05T07:54:11.000Z",label:"IMG_4564"},{id:"IMG_5766-16",src:"/photos/IMG_5766.jpeg",date:"2022-11-11T14:25:42.000Z",label:"IMG_5766"},{id:"IMG_6439-17",src:"/photos/IMG_6439.jpeg",date:"2023-04-09T11:33:06.000Z",label:"IMG_6439"},{id:"IMG_6703-18",src:"/photos/IMG_6703.jpeg",date:"2023-05-16T09:50:04.000Z",label:"IMG_6703"},{id:"IMG_7527-19",src:"/photos/IMG_7527.jpg",date:"2023-10-27T11:01:01.000Z",label:"IMG_7527"},{id:"IMG_1390-2",src:"/photos/IMG_1390.jpeg",date:"2023-10-29T14:01:29.000Z",label:"IMG_1390"},{id:"IMG_8016-20",src:"/photos/IMG_8016.jpg",date:"2023-12-30T16:31:29.000Z",label:"IMG_8016"},{id:"IMG_2370-11",src:"/photos/IMG_2370.jpeg",date:"2024-03-20T13:46:26.000Z",label:"IMG_2370"},{id:"IMG_9182-21",src:"/photos/IMG_9182.jpeg",date:"2024-08-13T16:39:30.000Z",label:"IMG_9182"},{id:"IMG_9382-22",src:"/photos/IMG_9382.jpg",date:"2024-09-11T12:05:07.000Z",label:"IMG_9382"},{id:"IMG_9887-23",src:"/photos/IMG_9887.jpg",date:"2025-01-01T15:56:31.000Z",label:"IMG_9887"}],Z=[{id:"demo-1",src:"/earth.jpg",date:"2022-02-14T10:00:00.000Z",label:"Souvenir 1"},{id:"demo-2",src:"/earth.jpg",date:"2023-02-14T10:00:00.000Z",label:"Souvenir 2"},{id:"demo-3",src:"/earth.jpg",date:"2024-02-14T10:00:00.000Z",label:"Souvenir 3"},{id:"demo-4",src:"/earth.jpg",date:"2024-08-14T10:00:00.000Z",label:"Souvenir 4"}],T="timeline-love-high-score-v1",y=2,j="Nounours & Nounours",l=document.querySelector("#app");if(!l)throw new Error("App root introuvable");const c={active:!1,pointerId:null,ghost:null,activeZone:null},k=t=>{const n=new Date(t.date);return Number.isNaN(n.getTime())?null:{id:t.id,src:t.src,date:n,label:t.label??"Souvenir"}},B=M.length>=3?M:[...Z],h=B.map(k).filter(t=>t!==null).sort((t,n)=>t.date.getTime()-n.date.getTime()),P=t=>t.toLocaleDateString("fr-FR",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),N=t=>t.toLocaleDateString("fr-FR",{day:"2-digit",month:"short"}),D=t=>t.toLocaleDateString("fr-FR",{year:"numeric"}),R=()=>{const t=localStorage.getItem(T),n=t?Number(t):0;return Number.isFinite(n)&&n>=0?n:0},x=t=>{localStorage.setItem(T,String(t))},q=t=>{if(t.length<y)return{seed:[],remaining:[]};const n=Math.floor(Math.random()*t.length);let r=Math.floor(Math.random()*t.length);for(;r===n;)r=Math.floor(Math.random()*t.length);const i=Math.min(n,r),s=Math.max(n,r),a=[t[i],t[s]].sort((d,p)=>d.date.getTime()-p.date.getTime()),o=t.filter((d,p)=>p!==i&&p!==s);return{seed:a,remaining:o}},A=t=>{const n=[...t];for(let r=n.length-1;r>0;r-=1){const i=Math.floor(Math.random()*(r+1));[n[r],n[i]]=[n[i],n[r]]}return n},C=()=>{const{seed:t,remaining:n}=q(h),r=A(n);return{timeline:t,upcoming:r.slice(1),current:r[0]??null,score:0,gameOver:!1,gameOverTitle:"",gameOverMessage:"",gameOverDateLabel:""}},v=()=>({...C(),highScore:R(),started:!1,hintPhotoId:null,jokers:{pass:!0,rewind:!0,hint:!0}});let e=v();const _=["❤️‍🔥","❤️","😘","🥰","🧸","💘","💕","💞"],H=()=>{const t=document.createElement("div");t.className="emoji-burst-layer";for(let n=0;n<20;n+=1){const r=document.createElement("span");r.className="emoji-burst",r.textContent=_[Math.floor(Math.random()*_.length)];const i=30+Math.random()*40,s=-90+Math.random()*180,a=Math.random()*160,o=900+Math.random()*650,d=.8+Math.random()*1.1;r.style.left=`${i}%`,r.style.setProperty("--drift",`${s}px`),r.style.animationDelay=`${a}ms`,r.style.animationDuration=`${o}ms`,r.style.transform=`translate(-50%, 0) scale(${d})`,t.appendChild(r)}document.body.appendChild(t),setTimeout(()=>t.remove(),2100)},F=(t,n,r)=>{const i=t[r-1]??null,s=t[r]??null,a=!i||i.date.getTime()<=n.date.getTime(),o=!s||n.date.getTime()<=s.date.getTime();return a&&o},Y=()=>{e.score>e.highScore&&(e.highScore=e.score,x(e.highScore))},L=(t,n,r="")=>{e.gameOver=!0,e.gameOverTitle=t,e.gameOverMessage=n,e.gameOverDateLabel=r,Y()},E=()=>{const t=e.upcoming[0]??null;e.current=t,e.upcoming=e.upcoming.slice(1),e.hintPhotoId=null,e.current||L("Parfait !","Toutes les photos sont placees.","")},w=t=>{if(!e.started||e.gameOver||!e.current)return;const n=e.current;if(!F(e.timeline,n,t)){L("Oups !","Ce n'etait pas tout a fait le bon moment pour ce souvenir...",P(n.date)),u();return}e.timeline=[...e.timeline.slice(0,t),n,...e.timeline.slice(t)],e.score+=1,H(),E(),u()},U=()=>{!e.started||e.gameOver||!e.current||!e.jokers.pass||(e.jokers.pass=!1,e.upcoming=[...e.upcoming,e.current],E(),u())},X=()=>{!e.started||e.gameOver||!e.current||!e.jokers.hint||(e.jokers.hint=!1,e.hintPhotoId=e.current.id,u())},G=()=>{!e.gameOver||!e.jokers.rewind||(e.jokers.rewind=!1,e.gameOver=!1,e.gameOverTitle="",e.gameOverMessage="",e.gameOverDateLabel="",u())},V=()=>{const t=e.highScore;e={...v(),highScore:t,started:!1},u()},z=async()=>{const t=`Score Timeline de ${j}: ${e.score} (record ${e.highScore})`;try{if(navigator.share){await navigator.share({text:t});return}await navigator.clipboard.writeText(t)}catch{}},K=()=>{e.started=!0,u()},Q=()=>{const t=e.highScore;e={...v(),highScore:t,started:!0},u()},O=()=>{c.activeZone&&(c.activeZone.classList.remove("is-drop-target"),c.activeZone=null)},m=()=>{O(),c.ghost&&c.ghost.remove(),document.body.classList.remove("is-dragging-photo"),c.active=!1,c.pointerId=null,c.ghost=null},S=(t,n)=>{const r=document.elementFromPoint(t,n),i=(r==null?void 0:r.closest(".insert-plus:not([disabled])"))??null;c.activeZone!==i&&(O(),i&&(i.classList.add("is-drop-target"),c.activeZone=i))},J=t=>{if(!e.started||e.gameOver||!e.current)return;t.preventDefault(),c.active=!0,c.pointerId=t.pointerId,document.body.classList.add("is-dragging-photo");const n=document.createElement("div");n.className="drag-ghost",n.innerHTML=`<img src="${e.current.src}" alt="Apercu" />`,document.body.appendChild(n),c.ghost=n;const r=(o,d)=>{c.ghost&&(c.ghost.style.left=`${o}px`,c.ghost.style.top=`${d}px`)};r(t.clientX,t.clientY),S(t.clientX,t.clientY);const i=o=>{!c.active||o.pointerId!==c.pointerId||(r(o.clientX,o.clientY),S(o.clientX,o.clientY))},s=o=>{if(!c.active||o.pointerId!==c.pointerId)return;const d=c.activeZone?Number(c.activeZone.dataset.insertIndex):NaN;m(),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",a),Number.isFinite(d)&&w(d)},a=o=>{o.pointerId===c.pointerId&&(m(),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",a))};window.addEventListener("pointermove",i),window.addEventListener("pointerup",s),window.addEventListener("pointercancel",a)},W=()=>{const t=[];for(let n=0;n<=e.timeline.length;n+=1){t.push(`
      <button
        class="insert-plus"
        aria-label="Inserer ici"
        data-insert-index="${n}"
        ${e.gameOver||!e.current||!e.started?"disabled":""}
      >
        <span>+</span>
      </button>
    `);const r=e.timeline[n];r&&t.push(`
        <article class="timeline-item">
          <img src="${r.src}" alt="Souvenir place" loading="lazy" />
          <div class="timeline-date">
            <p>${N(r.date)}</p>
            <strong>${D(r.date)}</strong>
          </div>
        </article>
      `)}return t.join("")},ee=()=>{const t=h[0];l.innerHTML=`
    <main class="intro-shell">
      <section class="intro-card">
        <h1>Timeline de<br />${j}</h1>
        <div class="intro-divider"></div>
        <div class="intro-visual-wrap">
          <div class="intro-float float-heart">💛</div>
          <div class="intro-float float-star">✨</div>
          <div class="intro-visual">
            <img src="${t.src}" alt="Nounours" loading="eager" />
          </div>
        </div>
        <p class="intro-subtitle">REVIVEZ VOS PLUS BEAUX MOMENTS</p>
        <button id="startBtn" class="start-btn">Jouer</button>
        <div class="intro-footer-actions">
          <span>Reglages</span>
          <span>Album</span>
          <span>Partager</span>
        </div>
      </section>
    </main>
  `;const n=l.querySelector("#startBtn");n&&n.addEventListener("click",K)},te=()=>{const t=e.current&&e.hintPhotoId===e.current.id?e.current.date.getFullYear():null,n=e.current?`
      <article class="current-card ${e.gameOver?"is-paused":""}">
        <p class="place-tag">A PLACER</p>
        <img id="dragImage" src="${e.current.src}" alt="Photo a placer" loading="eager" draggable="false" />
        <div class="current-meta">
          <p class="current-label">Place cette photo sur la timeline</p>
          <p class="current-sub">${e.current.label}</p>
          ${t?`<p class="hint-year">Indice: ${t}</p>`:""}
        </div>
      </article>
    `:`
      <article class="current-card is-finished">
        <div class="current-meta solo">
          <p class="current-label">Partie terminee</p>
        </div>
      </article>
    `,r=e.gameOver?`
      <section class="game-over-modal">
        <div class="game-over-card">
          <div class="gameover-icon">😵</div>
          <p class="panel-title">${e.gameOverTitle}</p>
          <p class="panel-message">${e.gameOverMessage}</p>
          ${e.gameOverDateLabel?`<div class="gameover-date"><span>C'ETAIT LE</span><strong>${e.gameOverDateLabel}</strong></div>`:""}
          <div class="gameover-stats">
            <div class="stat-box"><span>SCORE</span><strong>${e.score}</strong></div>
            <div class="stat-divider"></div>
            <div class="stat-box"><span>MEILLEUR</span><strong>${e.highScore}</strong></div>
          </div>
          <div class="panel-actions">
            ${e.jokers.rewind?'<button id="rewindBtn" class="primary-btn">⏪ Rewind</button>':""}
            <button id="replayBtn" class="secondary-btn">Rejouer</button>
            <button id="quitBtn" class="ghost-btn">Quitter</button>
            <button id="shareBtn" class="link-btn">Partager mon score</button>
          </div>
        </div>
      </section>
    `:"";l.innerHTML=`
    <main class="game-shell">
      <header class="top-bar">
        <div class="top-left">
          <button class="joker-btn" id="passBtn" title="Pass" aria-label="Pass" ${e.jokers.pass&&!e.gameOver&&e.current?"":"disabled"}>
            ⏭️
            <span class="joker-count">${e.jokers.pass?"1":"0"}</span>
          </button>
          <button class="joker-btn" id="rewindInlineBtn" title="Rewind" aria-label="Rewind" ${e.jokers.rewind&&e.gameOver?"":"disabled"}>
            ⏪
            <span class="joker-count">${e.jokers.rewind?"1":"0"}</span>
          </button>
          <button class="joker-btn" id="hintBtn" title="Indice" aria-label="Indice" ${e.jokers.hint&&!e.gameOver&&e.current?"":"disabled"}>
            💡
            <span class="joker-count">${e.jokers.hint?"1":"0"}</span>
          </button>
        </div>
        <div class="scoreboard">
          <div class="score-pill">SCORE: <strong>${e.score}</strong></div>
        </div>
      </header>

      <section class="play-area">
        <section class="current-area">
          ${n}
          <div class="drag-hint">
            <p>FAITES GLISSER DANS LA TIMELINE</p>
            <div class="hint-dots"><span></span><span></span><span></span></div>
          </div>
        </section>

        <section class="timeline-area">
          <div class="timeline-head">
            <h2>NOTRE HISTOIRE</h2>
            <p>${e.timeline.length} evenements</p>
          </div>
          <div class="timeline-track">${W()}</div>
        </section>
      </section>

      ${r}
    </main>
  `,l.querySelectorAll(".insert-plus").forEach(g=>{g.addEventListener("click",()=>{const $=Number(g.dataset.insertIndex);w($)})});const s=l.querySelector("#dragImage");s&&s.addEventListener("pointerdown",g=>J(g));const a=l.querySelector("#passBtn");a&&a.addEventListener("click",U);const o=l.querySelector("#hintBtn");o&&o.addEventListener("click",X);const d=l.querySelector("#rewindInlineBtn");d&&d.addEventListener("click",G);const p=l.querySelector("#rewindBtn");p&&p.addEventListener("click",G);const f=l.querySelector("#replayBtn");f&&f.addEventListener("click",Q);const I=l.querySelector("#quitBtn");I&&I.addEventListener("click",V);const b=l.querySelector("#shareBtn");b&&b.addEventListener("click",()=>{z()})},u=()=>{if(m(),!(h.length>=y+1)){l.innerHTML=`
      <main class="empty-screen">
        <section class="empty-card">
          <h1>Ajoute au moins 3 photos</h1>
          <p>
            Depose les images dans <code>public/photos</code>, puis lance
            <code>npm run photos:manifest</code>.
          </p>
        </section>
      </main>
    `;return}if(!e.started){ee();return}te()};u();
