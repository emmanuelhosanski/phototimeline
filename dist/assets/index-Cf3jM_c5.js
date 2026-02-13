(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const T=[{id:"funchal-1",src:"/photos/funchal.jpg",date:"2018-09-11T08:49:08.000Z",label:"funchal"},{id:"IMG_20181103_152841-5",src:"/photos/IMG_20181103_152841.jpg",date:"2018-11-03T14:28:42.000Z",label:"IMG_20181103_152841"},{id:"IMG_20190104_100057-6",src:"/photos/IMG_20190104_100057.jpg",date:"2019-01-04T09:00:58.000Z",label:"IMG_20190104_100057"},{id:"IMG_20191229_111522-7",src:"/photos/IMG_20191229_111522.jpg",date:"2019-12-29T10:15:23.000Z",label:"IMG_20191229_111522"},{id:"IMG_20200103_114742-8",src:"/photos/IMG_20200103_114742.jpg",date:"2020-01-03T10:47:43.000Z",label:"IMG_20200103_114742"},{id:"IMG_1863 2-3",src:"/photos/IMG_1863 2.jpeg",date:"2021-08-11T09:26:28.000Z",label:"IMG_1863 2"},{id:"IMG_1863-4",src:"/photos/IMG_1863.jpeg",date:"2021-08-11T09:26:28.000Z",label:"IMG_1863"},{id:"IMG_2257 2-9",src:"/photos/IMG_2257 2.jpeg",date:"2021-10-31T14:23:53.000Z",label:"IMG_2257 2"},{id:"IMG_2257-10",src:"/photos/IMG_2257.jpeg",date:"2021-10-31T14:23:53.000Z",label:"IMG_2257"},{id:"IMG_2606-12",src:"/photos/IMG_2606.jpg",date:"2021-12-29T16:47:16.000Z",label:"IMG_2606"},{id:"IMG_2636-13",src:"/photos/IMG_2636.jpeg",date:"2021-12-31T11:08:20.000Z",label:"IMG_2636"},{id:"IMG_3801-14",src:"/photos/IMG_3801.jpg",date:"2022-05-24T13:28:53.000Z",label:"IMG_3801"},{id:"IMG_4564-15",src:"/photos/IMG_4564.jpeg",date:"2022-08-05T07:54:11.000Z",label:"IMG_4564"},{id:"IMG_5766-16",src:"/photos/IMG_5766.jpeg",date:"2022-11-11T14:25:42.000Z",label:"IMG_5766"},{id:"IMG_6439-17",src:"/photos/IMG_6439.jpeg",date:"2023-04-09T11:33:06.000Z",label:"IMG_6439"},{id:"IMG_6703-18",src:"/photos/IMG_6703.jpeg",date:"2023-05-16T09:50:04.000Z",label:"IMG_6703"},{id:"IMG_7527-19",src:"/photos/IMG_7527.jpg",date:"2023-10-27T11:01:01.000Z",label:"IMG_7527"},{id:"IMG_1390-2",src:"/photos/IMG_1390.jpeg",date:"2023-10-29T14:01:29.000Z",label:"IMG_1390"},{id:"IMG_8016-20",src:"/photos/IMG_8016.jpg",date:"2023-12-30T16:31:29.000Z",label:"IMG_8016"},{id:"IMG_2370-11",src:"/photos/IMG_2370.jpeg",date:"2024-03-20T13:46:26.000Z",label:"IMG_2370"},{id:"IMG_9182-21",src:"/photos/IMG_9182.jpeg",date:"2024-08-13T16:39:30.000Z",label:"IMG_9182"},{id:"IMG_9382-22",src:"/photos/IMG_9382.jpg",date:"2024-09-11T12:05:07.000Z",label:"IMG_9382"},{id:"IMG_9887-23",src:"/photos/IMG_9887.jpg",date:"2025-01-01T15:56:31.000Z",label:"IMG_9887"}],x=[{id:"demo-1",src:"/earth.jpg",date:"2022-02-14T10:00:00.000Z",label:"Souvenir 1"},{id:"demo-2",src:"/earth.jpg",date:"2023-02-14T10:00:00.000Z",label:"Souvenir 2"},{id:"demo-3",src:"/earth.jpg",date:"2024-02-14T10:00:00.000Z",label:"Souvenir 3"},{id:"demo-4",src:"/earth.jpg",date:"2024-08-14T10:00:00.000Z",label:"Souvenir 4"}],$="timeline-love-high-score-v1",Z=2,k="Nounours & Nounours",l=document.querySelector("#app");if(!l)throw new Error("App root introuvable");const a={active:!1,pointerId:null,ghost:null,activeZone:null},C=t=>{const r=new Date(t.date);return Number.isNaN(r.getTime())?null:{id:t.id,src:t.src,date:r,label:t.label??"Souvenir"}},R=T.length>=3?T:[...x],v=R.map(C).filter(t=>t!==null).sort((t,r)=>t.date.getTime()-r.date.getTime()),P=t=>t.toLocaleDateString("fr-FR",{weekday:"short",year:"numeric",month:"short",day:"numeric"}),A=t=>t.toLocaleDateString("fr-FR",{day:"2-digit",month:"short"}),F=t=>t.toLocaleDateString("fr-FR",{year:"numeric"}),H=()=>{const t=localStorage.getItem($),r=t?Number(t):0;return Number.isFinite(r)&&r>=0?r:0},Y=t=>{localStorage.setItem($,String(t))},V=t=>{if(t.length<Z)return{seed:[],remaining:[]};const r=Math.floor(Math.random()*t.length);let n=Math.floor(Math.random()*t.length);for(;n===r;)n=Math.floor(Math.random()*t.length);const o=Math.min(r,n),s=Math.max(r,n),i=[t[o],t[s]].sort((d,m)=>d.date.getTime()-m.date.getTime()),c=t.filter((d,m)=>m!==o&&m!==s);return{seed:i,remaining:c}},U=t=>{const r=[...t];for(let n=r.length-1;n>0;n-=1){const o=Math.floor(Math.random()*(n+1));[r[n],r[o]]=[r[o],r[n]]}return r},X=()=>{const{seed:t,remaining:r}=V(v),n=U(r);return{timeline:t,upcoming:n.slice(1),current:n[0]??null,score:0,gameOver:!1,gameOverTitle:"",gameOverMessage:"",gameOverDateLabel:""}},I=()=>({...X(),highScore:H(),started:!1,hintPhotoId:null,jokers:{pass:!0,rewind:!0,hint:!0},viewerPhotoId:null});let e=I();const j=["❤️‍🔥","❤️","😘","🥰","🧸","💘","💕","💞"],z=()=>{const t=document.createElement("div");t.className="emoji-burst-layer";for(let r=0;r<20;r+=1){const n=document.createElement("span");n.className="emoji-burst",n.textContent=j[Math.floor(Math.random()*j.length)];const o=30+Math.random()*40,s=-90+Math.random()*180,i=Math.random()*160,c=900+Math.random()*650,d=.8+Math.random()*1.1;n.style.left=`${o}%`,n.style.setProperty("--drift",`${s}px`),n.style.animationDelay=`${i}ms`,n.style.animationDuration=`${c}ms`,n.style.transform=`translate(-50%, 0) scale(${d})`,t.appendChild(n)}document.body.appendChild(t),setTimeout(()=>t.remove(),2100)},K=(t,r,n)=>{const o=t[n-1]??null,s=t[n]??null,i=!o||o.date.getTime()<=r.date.getTime(),c=!s||r.date.getTime()<=s.date.getTime();return i&&c},Q=()=>{e.score>e.highScore&&(e.highScore=e.score,Y(e.highScore))},B=(t,r,n="")=>{e.gameOver=!0,e.gameOverTitle=t,e.gameOverMessage=r,e.gameOverDateLabel=n,Q()},N=()=>{const t=e.upcoming[0]??null;e.current=t,e.upcoming=e.upcoming.slice(1),e.hintPhotoId=null,e.current||B("Parfait !","Toutes les photos sont placees.","")},D=t=>{if(!e.started||e.gameOver||!e.current)return;const r=e.current;if(!K(e.timeline,r,t)){B("Oups !","Ce n'etait pas tout a fait le bon moment pour ce souvenir...",P(r.date)),u();return}e.timeline=[...e.timeline.slice(0,t),r,...e.timeline.slice(t)],e.score+=1,z(),N(),u()},J=()=>{!e.started||e.gameOver||!e.current||!e.jokers.pass||(e.jokers.pass=!1,e.upcoming=[...e.upcoming,e.current],N(),u())},W=()=>{!e.started||e.gameOver||!e.current||!e.jokers.hint||(e.jokers.hint=!1,e.hintPhotoId=e.current.id,u())},E=()=>{!e.gameOver||!e.jokers.rewind||(e.jokers.rewind=!1,e.gameOver=!1,e.gameOverTitle="",e.gameOverMessage="",e.gameOverDateLabel="",u())},ee=()=>{const t=e.highScore;e={...I(),highScore:t,started:!1},u()},te=async()=>{const t=`Score Timeline de ${k}: ${e.score} (record ${e.highScore})`;try{if(navigator.share){await navigator.share({text:t});return}await navigator.clipboard.writeText(t)}catch{}},re=t=>{e.viewerPhotoId=t,u()},L=()=>{e.viewerPhotoId=null,u()},ne=()=>{e.started=!0,u()},se=()=>{const t=e.highScore;e={...I(),highScore:t,started:!0},u()},q=()=>{a.activeZone&&(a.activeZone.classList.remove("is-drop-target"),a.activeZone=null)},h=()=>{q(),a.ghost&&a.ghost.remove(),document.body.classList.remove("is-dragging-photo"),a.active=!1,a.pointerId=null,a.ghost=null},O=(t,r)=>{const n=document.elementFromPoint(t,r),o=(n==null?void 0:n.closest(".insert-plus:not([disabled])"))??null;a.activeZone!==o&&(q(),o&&(o.classList.add("is-drop-target"),a.activeZone=o))},oe=t=>{if(!e.started||e.gameOver||!e.current)return;t.preventDefault(),a.active=!0,a.pointerId=t.pointerId,document.body.classList.add("is-dragging-photo");const r=document.createElement("div");r.className="drag-ghost",r.innerHTML=`<img src="${e.current.src}" alt="Apercu" />`,document.body.appendChild(r),a.ghost=r;const n=(c,d)=>{a.ghost&&(a.ghost.style.left=`${c}px`,a.ghost.style.top=`${d}px`)};n(t.clientX,t.clientY),O(t.clientX,t.clientY);const o=c=>{!a.active||c.pointerId!==a.pointerId||(n(c.clientX,c.clientY),O(c.clientX,c.clientY))},s=c=>{if(!a.active||c.pointerId!==a.pointerId)return;const d=a.activeZone?Number(a.activeZone.dataset.insertIndex):NaN;h(),window.removeEventListener("pointermove",o),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",i),Number.isFinite(d)&&D(d)},i=c=>{c.pointerId===a.pointerId&&(h(),window.removeEventListener("pointermove",o),window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",i))};window.addEventListener("pointermove",o),window.addEventListener("pointerup",s),window.addEventListener("pointercancel",i)},ae=()=>{const t=[];for(let r=0;r<=e.timeline.length;r+=1){t.push(`
      <button
        class="insert-plus"
        aria-label="Inserer ici"
        data-insert-index="${r}"
        ${e.gameOver||!e.current||!e.started?"disabled":""}
      >
        <span>+</span>
      </button>
    `);const n=e.timeline[r];n&&t.push(`
        <article class="timeline-item">
          <button class="timeline-photo-btn" data-photo-id="${n.id}" aria-label="Voir la photo en grand">
            <img src="${n.src}" alt="Souvenir place" loading="lazy" />
          </button>
          <div class="timeline-date">
            <p>${A(n.date)}</p>
            <strong>${F(n.date)}</strong>
          </div>
        </article>
      `)}return t.join("")},ie=()=>{const t=v[0];l.innerHTML=`
    <main class="intro-shell">
      <section class="intro-card">
        <h1>Timeline de<br />${k}</h1>
        <div class="intro-divider"></div>
        <div class="intro-visual-wrap">
          <div class="intro-orbit orbit-heart"><div class="intro-float">💛</div></div>
          <div class="intro-orbit orbit-star"><div class="intro-float">✨</div></div>
          <div class="intro-visual">
            <img src="${t.src}" alt="Nounours" loading="eager" />
          </div>
        </div>
        <p class="intro-subtitle">REVIVEZ VOS PLUS BEAUX MOMENTS</p>
        <button id="startBtn" class="start-btn">Jouer</button>
      </section>
    </main>
  `;const r=l.querySelector("#startBtn");r&&r.addEventListener("click",ne)},ce=()=>{const t=e.current&&e.hintPhotoId===e.current.id?e.current.date.getFullYear():null,r=e.current?`
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
    `,n=e.gameOver?`
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
    `:"",o=e.viewerPhotoId?e.timeline.find(p=>p.id===e.viewerPhotoId)??null:null,s=o?`
      <section class="viewer-modal" id="viewerModal">
        <button class="viewer-backdrop" id="viewerBackdrop" aria-label="Fermer"></button>
        <div class="viewer-card">
          <img src="${o.src}" alt="Souvenir en grand format" loading="eager" />
          <p>${P(o.date)}</p>
          <button class="viewer-close" id="viewerClose">Fermer</button>
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
          ${r}
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
          <div class="timeline-track">${ae()}</div>
        </section>
      </section>

      ${n}
      ${s}
    </main>
  `,l.querySelectorAll(".insert-plus").forEach(p=>{p.addEventListener("click",()=>{const g=Number(p.dataset.insertIndex);D(g)})}),l.querySelectorAll(".timeline-photo-btn").forEach(p=>{p.addEventListener("click",()=>{const g=p.dataset.photoId;g&&re(g)})});const d=l.querySelector("#dragImage");d&&d.addEventListener("pointerdown",p=>oe(p));const m=l.querySelector("#passBtn");m&&m.addEventListener("click",J);const f=l.querySelector("#hintBtn");f&&f.addEventListener("click",W);const b=l.querySelector("#rewindInlineBtn");b&&b.addEventListener("click",E);const M=l.querySelector("#rewindBtn");M&&M.addEventListener("click",E);const _=l.querySelector("#replayBtn");_&&_.addEventListener("click",se);const G=l.querySelector("#quitBtn");G&&G.addEventListener("click",ee);const w=l.querySelector("#shareBtn");w&&w.addEventListener("click",()=>{te()});const S=l.querySelector("#viewerBackdrop");S&&S.addEventListener("click",L);const y=l.querySelector("#viewerClose");y&&y.addEventListener("click",L)},u=()=>{if(h(),!(v.length>=Z+1)){l.innerHTML=`
      <main class="empty-screen">
        <section class="empty-card">
          <h1>Ajoute au moins 3 photos</h1>
          <p>
            Depose les images dans <code>public/photos</code>, puis lance
            <code>npm run photos:manifest</code>.
          </p>
        </section>
      </main>
    `;return}if(!e.started){ie();return}ce()};u();
