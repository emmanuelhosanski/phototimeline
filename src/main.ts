import './styles.css';
import manifest from './data/photoManifest.json';

const demoManifest = [
  { id: 'demo-1', src: '/earth.jpg', date: '2022-02-14T10:00:00.000Z', label: 'Souvenir 1' },
  { id: 'demo-2', src: '/earth.jpg', date: '2023-02-14T10:00:00.000Z', label: 'Souvenir 2' },
  { id: 'demo-3', src: '/earth.jpg', date: '2024-02-14T10:00:00.000Z', label: 'Souvenir 3' },
  { id: 'demo-4', src: '/earth.jpg', date: '2024-08-14T10:00:00.000Z', label: 'Souvenir 4' },
] as const;

type ManifestPhoto = {
  id: string;
  src: string;
  date: string;
  label?: string;
};

type Photo = {
  id: string;
  src: string;
  date: Date;
  label: string;
};

type GameState = {
  timeline: Photo[];
  upcoming: Photo[];
  current: Photo | null;
  score: number;
  highScore: number;
  gameOver: boolean;
  gameOverTitle: string;
  gameOverMessage: string;
  gameOverDateLabel: string;
  started: boolean;
  hintPhotoId: string | null;
  jokers: {
    pass: boolean;
    rewind: boolean;
    hint: boolean;
  };
};

type DragState = {
  active: boolean;
  pointerId: number | null;
  ghost: HTMLDivElement | null;
  activeZone: HTMLButtonElement | null;
};

const HIGH_SCORE_KEY = 'timeline-love-high-score-v1';
const SEED_SIZE = 2;
const COUPLE_NAMES = 'Nounours & Nounours';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('App root introuvable');
}

const dragState: DragState = {
  active: false,
  pointerId: null,
  ghost: null,
  activeZone: null,
};

const toPhoto = (item: ManifestPhoto): Photo | null => {
  const parsedDate = new Date(item.date);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return {
    id: item.id,
    src: item.src,
    date: parsedDate,
    label: item.label ?? 'Souvenir',
  };
};

const effectiveManifest = (manifest as ManifestPhoto[]).length >= 3 ? (manifest as ManifestPhoto[]) : [...demoManifest];

const allPhotos = effectiveManifest
  .map(toPhoto)
  .filter((photo): photo is Photo => photo !== null)
  .sort((a, b) => a.date.getTime() - b.date.getTime());

const formatDate = (date: Date) =>
  date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatDayMonth = (date: Date) =>
  date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  });

const formatYear = (date: Date) =>
  date.toLocaleDateString('fr-FR', {
    year: 'numeric',
  });

const loadHighScore = () => {
  const raw = localStorage.getItem(HIGH_SCORE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

const saveHighScore = (value: number) => {
  localStorage.setItem(HIGH_SCORE_KEY, String(value));
};

const pickSeed = (photos: Photo[]) => {
  if (photos.length < SEED_SIZE) {
    return {
      seed: [] as Photo[],
      remaining: [] as Photo[],
    };
  }

  const firstIndex = Math.floor(Math.random() * photos.length);
  let secondIndex = Math.floor(Math.random() * photos.length);
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * photos.length);
  }

  const low = Math.min(firstIndex, secondIndex);
  const high = Math.max(firstIndex, secondIndex);

  const seed = [photos[low], photos[high]].sort((a, b) => a.date.getTime() - b.date.getTime());
  const remaining = photos.filter((_, index) => index !== low && index !== high);

  return { seed, remaining };
};

const shuffle = <T>(items: T[]) => {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

const buildGame = () => {
  const { seed, remaining } = pickSeed(allPhotos);
  const queue = shuffle(remaining);

  return {
    timeline: seed,
    upcoming: queue.slice(1),
    current: queue[0] ?? null,
    score: 0,
    gameOver: false,
    gameOverTitle: '',
    gameOverMessage: '',
    gameOverDateLabel: '',
  };
};

const initialState = (): GameState => {
  const game = buildGame();
  return {
    ...game,
    highScore: loadHighScore(),
    started: false,
    hintPhotoId: null,
    jokers: {
      pass: true,
      rewind: true,
      hint: true,
    },
  };
};

let state = initialState();

const emojiSet = ['❤️‍🔥', '❤️', '😘', '🥰', '🧸', '💘', '💕', '💞'];

const launchEmojiBurst = () => {
  const layer = document.createElement('div');
  layer.className = 'emoji-burst-layer';

  for (let i = 0; i < 20; i += 1) {
    const emoji = document.createElement('span');
    emoji.className = 'emoji-burst';
    emoji.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];

    const x = 30 + Math.random() * 40;
    const drift = -90 + Math.random() * 180;
    const delay = Math.random() * 160;
    const duration = 900 + Math.random() * 650;
    const scale = 0.8 + Math.random() * 1.1;

    emoji.style.left = `${x}%`;
    emoji.style.setProperty('--drift', `${drift}px`);
    emoji.style.animationDelay = `${delay}ms`;
    emoji.style.animationDuration = `${duration}ms`;
    emoji.style.transform = `translate(-50%, 0) scale(${scale})`;

    layer.appendChild(emoji);
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2100);
};

const canInsertAt = (timeline: Photo[], target: Photo, insertIndex: number) => {
  const previous = timeline[insertIndex - 1] ?? null;
  const next = timeline[insertIndex] ?? null;

  const prevOk = !previous || previous.date.getTime() <= target.date.getTime();
  const nextOk = !next || target.date.getTime() <= next.date.getTime();

  return prevOk && nextOk;
};

const maybeSetHighScore = () => {
  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore(state.highScore);
  }
};

const finishGame = (title: string, message: string, dateLabel = '') => {
  state.gameOver = true;
  state.gameOverTitle = title;
  state.gameOverMessage = message;
  state.gameOverDateLabel = dateLabel;
  maybeSetHighScore();
};

const moveToNextTurn = () => {
  const next = state.upcoming[0] ?? null;
  state.current = next;
  state.upcoming = state.upcoming.slice(1);
  state.hintPhotoId = null;

  if (!state.current) {
    finishGame('Parfait !', 'Toutes les photos sont placees.', '');
  }
};

const onInsert = (insertIndex: number) => {
  if (!state.started || state.gameOver || !state.current) {
    return;
  }

  const chosen = state.current;
  const isCorrect = canInsertAt(state.timeline, chosen, insertIndex);

  if (!isCorrect) {
    finishGame(
      'Oups !',
      "Ce n'etait pas tout a fait le bon moment pour ce souvenir...",
      formatDate(chosen.date),
    );
    render();
    return;
  }

  state.timeline = [
    ...state.timeline.slice(0, insertIndex),
    chosen,
    ...state.timeline.slice(insertIndex),
  ];
  state.score += 1;
  launchEmojiBurst();
  moveToNextTurn();
  render();
};

const onPass = () => {
  if (!state.started || state.gameOver || !state.current || !state.jokers.pass) {
    return;
  }

  state.jokers.pass = false;
  state.upcoming = [...state.upcoming, state.current];
  moveToNextTurn();
  render();
};

const onHint = () => {
  if (!state.started || state.gameOver || !state.current || !state.jokers.hint) {
    return;
  }

  state.jokers.hint = false;
  state.hintPhotoId = state.current.id;
  render();
};

const onRewind = () => {
  if (!state.gameOver || !state.jokers.rewind) {
    return;
  }

  state.jokers.rewind = false;
  state.gameOver = false;
  state.gameOverTitle = '';
  state.gameOverMessage = '';
  state.gameOverDateLabel = '';
  render();
};

const onQuit = () => {
  const highScore = state.highScore;
  state = {
    ...initialState(),
    highScore,
    started: false,
  };
  render();
};

const onShareScore = async () => {
  const text = `Score Timeline de ${COUPLE_NAMES}: ${state.score} (record ${state.highScore})`;
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
    await navigator.clipboard.writeText(text);
  } catch {
    // Ignore share failures.
  }
};

const startGame = () => {
  state.started = true;
  render();
};

const onReplay = () => {
  const highScore = state.highScore;
  state = {
    ...initialState(),
    highScore,
    started: true,
  };
  render();
};

const clearActiveDropZone = () => {
  if (dragState.activeZone) {
    dragState.activeZone.classList.remove('is-drop-target');
    dragState.activeZone = null;
  }
};

const endDrag = () => {
  clearActiveDropZone();
  if (dragState.ghost) {
    dragState.ghost.remove();
  }
  document.body.classList.remove('is-dragging-photo');
  dragState.active = false;
  dragState.pointerId = null;
  dragState.ghost = null;
};

const updateDropTargetAt = (x: number, y: number) => {
  const node = document.elementFromPoint(x, y) as HTMLElement | null;
  const zone = node?.closest<HTMLButtonElement>('.insert-plus:not([disabled])') ?? null;

  if (dragState.activeZone === zone) {
    return;
  }

  clearActiveDropZone();

  if (zone) {
    zone.classList.add('is-drop-target');
    dragState.activeZone = zone;
  }
};

const startDrag = (event: PointerEvent) => {
  if (!state.started || state.gameOver || !state.current) {
    return;
  }

  event.preventDefault();

  dragState.active = true;
  dragState.pointerId = event.pointerId;
  document.body.classList.add('is-dragging-photo');

  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  ghost.innerHTML = `<img src="${state.current.src}" alt="Apercu" />`;
  document.body.appendChild(ghost);
  dragState.ghost = ghost;

  const moveGhost = (x: number, y: number) => {
    if (!dragState.ghost) return;
    dragState.ghost.style.left = `${x}px`;
    dragState.ghost.style.top = `${y}px`;
  };

  moveGhost(event.clientX, event.clientY);
  updateDropTargetAt(event.clientX, event.clientY);

  const onMove = (moveEvent: PointerEvent) => {
    if (!dragState.active || moveEvent.pointerId !== dragState.pointerId) return;
    moveGhost(moveEvent.clientX, moveEvent.clientY);
    updateDropTargetAt(moveEvent.clientX, moveEvent.clientY);
  };

  const onUp = (upEvent: PointerEvent) => {
    if (!dragState.active || upEvent.pointerId !== dragState.pointerId) return;

    const dropIndex = dragState.activeZone ? Number(dragState.activeZone.dataset.insertIndex) : NaN;
    endDrag();

    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);

    if (Number.isFinite(dropIndex)) {
      onInsert(dropIndex);
    }
  };

  const onCancel = (cancelEvent: PointerEvent) => {
    if (cancelEvent.pointerId !== dragState.pointerId) return;
    endDrag();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
  };

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onCancel);
};

const renderTimelineSequence = () => {
  const parts: string[] = [];

  for (let index = 0; index <= state.timeline.length; index += 1) {
    parts.push(`
      <button
        class="insert-plus"
        aria-label="Inserer ici"
        data-insert-index="${index}"
        ${state.gameOver || !state.current || !state.started ? 'disabled' : ''}
      >
        <span>+</span>
      </button>
    `);

    const photo = state.timeline[index];
    if (photo) {
      parts.push(`
        <article class="timeline-item">
          <img src="${photo.src}" alt="Souvenir place" loading="lazy" />
          <div class="timeline-date">
            <p>${formatDayMonth(photo.date)}</p>
            <strong>${formatYear(photo.date)}</strong>
          </div>
        </article>
      `);
    }
  }

  return parts.join('');
};

const renderIntro = () => {
  const coverPhoto = allPhotos[0];
  app.innerHTML = `
    <main class="intro-shell">
      <section class="intro-card">
        <h1>Timeline de<br />${COUPLE_NAMES}</h1>
        <div class="intro-divider"></div>
        <div class="intro-visual-wrap">
          <div class="intro-float float-heart">💛</div>
          <div class="intro-float float-star">✨</div>
          <div class="intro-visual">
            <img src="${coverPhoto.src}" alt="Nounours" loading="eager" />
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
  `;

  const startBtn = app.querySelector<HTMLButtonElement>('#startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startGame);
  }
};

const renderGame = () => {
  const hintYear = state.current && state.hintPhotoId === state.current.id ? state.current.date.getFullYear() : null;

  const currentCard = state.current
    ? `
      <article class="current-card ${state.gameOver ? 'is-paused' : ''}">
        <p class="place-tag">A PLACER</p>
        <img id="dragImage" src="${state.current.src}" alt="Photo a placer" loading="eager" draggable="false" />
        <div class="current-meta">
          <p class="current-label">Place cette photo sur la timeline</p>
          <p class="current-sub">${state.current.label}</p>
          ${hintYear ? `<p class="hint-year">Indice: ${hintYear}</p>` : ''}
        </div>
      </article>
    `
    : `
      <article class="current-card is-finished">
        <div class="current-meta solo">
          <p class="current-label">Partie terminee</p>
        </div>
      </article>
    `;

  const gameOverPanel = state.gameOver
    ? `
      <section class="game-over-modal">
        <div class="game-over-card">
          <div class="gameover-icon">😵</div>
          <p class="panel-title">${state.gameOverTitle}</p>
          <p class="panel-message">${state.gameOverMessage}</p>
          ${
            state.gameOverDateLabel
              ? `<div class="gameover-date"><span>C'ETAIT LE</span><strong>${state.gameOverDateLabel}</strong></div>`
              : ''
          }
          <div class="gameover-stats">
            <div class="stat-box"><span>SCORE</span><strong>${state.score}</strong></div>
            <div class="stat-divider"></div>
            <div class="stat-box"><span>MEILLEUR</span><strong>${state.highScore}</strong></div>
          </div>
          <div class="panel-actions">
            ${state.jokers.rewind ? '<button id="rewindBtn" class="primary-btn">⏪ Rewind</button>' : ''}
            <button id="replayBtn" class="secondary-btn">Rejouer</button>
            <button id="quitBtn" class="ghost-btn">Quitter</button>
            <button id="shareBtn" class="link-btn">Partager mon score</button>
          </div>
        </div>
      </section>
    `
    : '';

  app.innerHTML = `
    <main class="game-shell">
      <header class="top-bar">
        <div class="top-left">
          <button class="joker-btn" id="passBtn" title="Pass" aria-label="Pass" ${state.jokers.pass && !state.gameOver && state.current ? '' : 'disabled'}>
            ⏭️
            <span class="joker-count">${state.jokers.pass ? '1' : '0'}</span>
          </button>
          <button class="joker-btn" id="rewindInlineBtn" title="Rewind" aria-label="Rewind" ${state.jokers.rewind && state.gameOver ? '' : 'disabled'}>
            ⏪
            <span class="joker-count">${state.jokers.rewind ? '1' : '0'}</span>
          </button>
          <button class="joker-btn" id="hintBtn" title="Indice" aria-label="Indice" ${state.jokers.hint && !state.gameOver && state.current ? '' : 'disabled'}>
            💡
            <span class="joker-count">${state.jokers.hint ? '1' : '0'}</span>
          </button>
        </div>
        <div class="scoreboard">
          <div class="score-pill">SCORE: <strong>${state.score}</strong></div>
        </div>
      </header>

      <section class="play-area">
        <section class="current-area">
          ${currentCard}
          <div class="drag-hint">
            <p>FAITES GLISSER DANS LA TIMELINE</p>
            <div class="hint-dots"><span></span><span></span><span></span></div>
          </div>
        </section>

        <section class="timeline-area">
          <div class="timeline-head">
            <h2>NOTRE HISTOIRE</h2>
            <p>${state.timeline.length} evenements</p>
          </div>
          <div class="timeline-track">${renderTimelineSequence()}</div>
        </section>
      </section>

      ${gameOverPanel}
    </main>
  `;

  const plusButtons = app.querySelectorAll<HTMLButtonElement>('.insert-plus');
  plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const insertIndex = Number(button.dataset.insertIndex);
      onInsert(insertIndex);
    });
  });

  const dragImage = app.querySelector<HTMLImageElement>('#dragImage');
  if (dragImage) {
    dragImage.addEventListener('pointerdown', (event) => startDrag(event));
  }

  const passBtn = app.querySelector<HTMLButtonElement>('#passBtn');
  if (passBtn) {
    passBtn.addEventListener('click', onPass);
  }

  const hintBtn = app.querySelector<HTMLButtonElement>('#hintBtn');
  if (hintBtn) {
    hintBtn.addEventListener('click', onHint);
  }

  const rewindInlineBtn = app.querySelector<HTMLButtonElement>('#rewindInlineBtn');
  if (rewindInlineBtn) {
    rewindInlineBtn.addEventListener('click', onRewind);
  }

  const rewindBtn = app.querySelector<HTMLButtonElement>('#rewindBtn');
  if (rewindBtn) {
    rewindBtn.addEventListener('click', onRewind);
  }

  const replayBtn = app.querySelector<HTMLButtonElement>('#replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', onReplay);
  }

  const quitBtn = app.querySelector<HTMLButtonElement>('#quitBtn');
  if (quitBtn) {
    quitBtn.addEventListener('click', onQuit);
  }

  const shareBtn = app.querySelector<HTMLButtonElement>('#shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      void onShareScore();
    });
  }
};

const render = () => {
  endDrag();

  const hasEnoughPhotos = allPhotos.length >= SEED_SIZE + 1;

  if (!hasEnoughPhotos) {
    app.innerHTML = `
      <main class="empty-screen">
        <section class="empty-card">
          <h1>Ajoute au moins 3 photos</h1>
          <p>
            Depose les images dans <code>public/photos</code>, puis lance
            <code>npm run photos:manifest</code>.
          </p>
        </section>
      </main>
    `;
    return;
  }

  if (!state.started) {
    renderIntro();
    return;
  }

  renderGame();
};

render();
