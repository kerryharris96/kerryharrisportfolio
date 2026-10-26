document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav: background on scroll, mobile toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const links = document.getElementById('nav-links');

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});

// Scroll reveal
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    revealer.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

// Count-up for results. The final value is already in the HTML, so it reads correctly without JS.
const format = (value, decimals) =>
  value.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const countUp = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + format(target * eased, decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (!reduceMotion) {
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      counter.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => counter.observe(el));
}

// Pause background videos for reduced-motion users
if (reduceMotion) {
  document.querySelectorAll('video[autoplay]').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });
}

// Work page: filter projects by sector
const filters = document.querySelectorAll('.filter');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const sector = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', b === btn));
    document.querySelectorAll('.cards .card').forEach((card) => {
      card.hidden = sector !== 'all' && !card.dataset.sector.split(' ').includes(sector);
    });
  });
});

// Enquiry form: posts to `action` if set, otherwise opens an email draft
const form = document.getElementById('enquiry');
if (form) {
  const status = form.querySelector('.form__status');
  const fallbackEmail = form.dataset.email;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (!form.getAttribute('action')) {
      const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent('Project enquiry from ' + data.get('name'))}&body=${encodeURIComponent(body)}`;
      return;
    }

    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.statusText);
      window.location.href = '/thank-you.html';
    } catch {
      status.textContent = `Something went wrong. Please email ${fallbackEmail} directly.`;
    }
  });
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
