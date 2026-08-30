/* ===========================
   PARTICLES — INTRO
=========================== */
(function spawnIntroParticles() {
  const container = document.getElementById('particles-container');
  const colors = ['#6c63ff', '#ff6584', '#43e97b', '#fff', '#ffda77'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (Math.random() * 5 + 2) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 8 + 5) + 's';
    p.style.animationDelay = (Math.random() * 6) + 's';
    container.appendChild(p);
  }
})();

/* ===========================
   ENTER SITE
=========================== */
function enterSite() {
  const intro = document.getElementById('intro-screen');
  intro.style.animation = 'fadeOutIntro 0.8s ease forwards';
  setTimeout(() => {
    intro.style.display = 'none';
    const main = document.getElementById('main-site');
    main.classList.remove('hidden');
    main.style.animation = 'fadeInMain 0.8s ease forwards';
    startTyping();
    observeTimeline();
  }, 800);
}

// Inject keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOutIntro {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(1.05); }
  }
  @keyframes fadeInMain {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(style);

/* ===========================
   TYPING EFFECT — HOME
=========================== */
function startTyping() {
  const roles = [
    'BCA Graduate 🎓',
    'Web Developer 💻',
    'GitHub Enthusiast 🐙',
    'Tech Explorer 🚀'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const el = document.querySelector('.typing-text');

  function type() {
    const current = roles[roleIndex];
    if (deleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }

    let speed = deleting ? 60 : 100;

    if (!deleting && charIndex === current.length + 1) {
      speed = 1800;
      deleting = true;
    } else if (deleting && charIndex === -1) {
      deleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
}

/* ===========================
   TIMELINE SCROLL REVEAL
=========================== */
function observeTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  items.forEach(item => observer.observe(item));
}

/* ===========================
   NAVBAR SCROLL STYLE
=========================== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(7,7,15,0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(13,13,26,0.85)';
    navbar.style.boxShadow = 'none';
  }
});

/* ===========================
   OUTRO — TRIGGER ON SCROLL END
=========================== */
let outroShown = false;

window.addEventListener('scroll', () => {
  if (outroShown) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollTop >= docHeight - 10 && docHeight > 0) {
    outroShown = true;
    showOutro();
  }
});

function showOutro() {
  const outro = document.getElementById('outro-screen');
  outro.classList.remove('hidden');
  outro.style.opacity = '0';
  outro.style.transition = 'opacity 0.8s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      outro.style.opacity = '1';
    });
  });

  spawnOutroParticles();

  // After 6 seconds, close outro and scroll back to top
  setTimeout(() => {
    outro.style.opacity = '0';
    setTimeout(() => {
      outro.classList.add('hidden');
      outroShown = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  }, 6000);
}

function spawnOutroParticles() {
  const container = document.getElementById('outro-particles');
  container.innerHTML = '';
  const colors = ['#6c63ff', '#ff6584', '#43e97b', '#ffda77', '#fff'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 8 + 3}px;
      height: ${Math.random() * 8 + 3}px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: outroParticle ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 2}s infinite alternate;
      opacity: ${Math.random() * 0.7 + 0.3};
    `;
    container.appendChild(p);
  }

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes outroParticle {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*60+20)}px,
             ${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random()*60+20)}px) scale(1.5); }
    }
  `;
  document.head.appendChild(styleEl);
}

/* ===========================
   SMOOTH ACTIVE NAV HIGHLIGHT
=========================== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#6c63ff';
    }
  });
});
