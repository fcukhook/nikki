const hero = document.getElementById('hero');
const revealSection = document.getElementById('reveal');
const messageLines = document.querySelector('.message-lines');
const openButton = document.getElementById('openSurprise');
const audio = document.getElementById('bgMusic');
const particlesLayer = document.getElementById('particles');
const heartsLayer = document.getElementById('floatingHearts');
const audioPrompt = document.getElementById('audioPrompt');
const CLICK_PLAY_FLAG = 'friendshipRevealPlay';

const messageText = `Belated Happy Friendship Day, Nikki...

its hard to belive almost.. manam frnds ayyi 6 years aina.. still aa new or freshnesh particular ga ni dagara always untadii.. i dont know why , but you are always special to me..and i truly hope our friendship last a lifetime.

you are one of the most imp person in my life.. maybe nik gurtundo ledho i dont know.. suspend ayyaka ni valle nijam ga clg ki vacha... just okka mata chalu for me diryam ravadaniki... anduke i will give you so much respect... type chestunde eyes nundi water ostunnaye.., you cant understand le... thats why i wont expect anything except time..

i may not always say it , but i care you a lot. Yes, im a litte possessive simetimes..... but thats only because youre someone i never want to loose...

ah... genral ga i always wanted to hug cz... antha istam... but.. antey limits lo undali ga...

no matter where life takes us or how busy we become, youll always have a special place in my heart.

thankyou for being the amazing person you are. I can never imagine my life without bestfriend like you..

belated happy friendship day... once again....Wishing us many more years of memories and an unbreakable bond

                                     - nii comrade`;

function createParticles() {
  for (let i = 0; i < 40; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.setProperty('--move-x', `${(Math.random() - 0.5) * 220}px`);
    particle.style.setProperty('--move-y', `${Math.random() * 140 + 100}px`);
    particle.style.animationDuration = `${Math.random() * 7 + 7}s`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particlesLayer.appendChild(particle);
  }

  for (let i = 0; i < 14; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '💖';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.setProperty('--move-x', `${(Math.random() - 0.5) * 220}px`);
    heart.style.setProperty('--move-y', `${Math.random() * 180 + 100}px`);
    heart.style.animationDuration = `${Math.random() * 15 + 12}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    heartsLayer.appendChild(heart);
  }
}

function burstConfetti(x, y) {
  for (let i = 0; i < 70; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.background = ['#ff6fb5', '#ffd26f', '#ffffff', '#8c6dff'][i % 4];
    piece.style.width = `${Math.random() * 8 + 6}px`;
    piece.style.height = `${Math.random() * 14 + 8}px`;
    piece.style.setProperty('--x-end', `${(Math.random() - 0.5) * 260}px`);
    piece.style.animationDuration = `${Math.random() * 0.6 + 0.9}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

function burstHearts(x, y) {
  for (let i = 0; i < 10; i += 1) {
    const heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.innerHTML = '💗';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.setProperty('--x-end', `${(Math.random() - 0.5) * 160}px`);
    heart.style.animationDuration = `${Math.random() * 0.5 + 0.9}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
}

function typeMessage() {
  if (!messageLines) return;

  const lines = messageText.split('\n');
  messageLines.innerHTML = '';

  lines.forEach((line, index) => {
    const lineEl = document.createElement('div');
    lineEl.className = 'line';
    lineEl.textContent = line;

    messageLines.appendChild(lineEl);

    setTimeout(() => {
      lineEl.classList.add('visible');
    }, index * 450 + 200);
  });
}

function startReveal() {
  if (hero) hero.classList.add('opening');
  if (revealSection) revealSection.classList.add('opening');
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
  burstHearts(window.innerWidth / 2, window.innerHeight / 2);

  if (audio && typeof audio.play === 'function') {
    const tryPlay = () => {
      audio.currentTime = 87;
      audio.play().then(() => {
        localStorage.removeItem(CLICK_PLAY_FLAG);
        if (audioPrompt) audioPrompt.classList.add('hidden');
      }).catch(() => {
        if (audioPrompt) audioPrompt.classList.remove('hidden');
      });
    };

    if (localStorage.getItem(CLICK_PLAY_FLAG) === '1') {
      if (audio.readyState >= 2) {
        tryPlay();
      } else {
        audio.addEventListener('canplay', tryPlay, { once: true });
        audio.load();
      }
    }
  }

  if (window.gsap && hero && revealSection) {
    const tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(hero, { scale: 1.03, duration: 0.7 })
      .to('.gift-wrapper', { y: -18, scale: 1.04, duration: 0.55 }, '-=0.25')
      .to('.banner-left', { x: '100%', duration: 1.05 }, '-=0.2')
      .to('.banner-right', { x: '-100%', duration: 1.05 }, '-=0.2')
      .to('.hero', { opacity: 0.1, duration: 0.55 }, '-=0.55')
      .to('.message-card', { opacity: 1, y: 0, scale: 1, duration: 0.9 }, '-=0.35');
  } else {
    if (revealSection) revealSection.classList.add('opening');
    const card = document.querySelector('.message-card');
    if (card) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    }
  }

  setTimeout(typeMessage, 1270);
}

function handleParallax() {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--scroll', `${scrollY * 0.08}px`);
  document.querySelectorAll('.bg-orb').forEach((orb, index) => {
    orb.style.transform = `translateY(${scrollY * (index === 1 ? 0.08 : 0.04)}px)`;
  });
}

if (openButton) {
  openButton.addEventListener('click', () => {
    localStorage.setItem(CLICK_PLAY_FLAG, '1');
  });
}

if (!openButton && revealSection) {
  setTimeout(startReveal, 600);
}

if (audioPrompt) {
  audioPrompt.addEventListener('click', () => {
    if (audio && typeof audio.play === 'function') {
      audio.currentTime = 87;
      audio.play().catch(() => {});
      audioPrompt.classList.add('hidden');
    }
  });
}

window.addEventListener('scroll', handleParallax, { passive: true });
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--screen-width', `${window.innerWidth}px`);
});

createParticles();
handleParallax();
