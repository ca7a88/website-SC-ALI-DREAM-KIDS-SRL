/* app.js - all interactive logic: language, mobile menu, swiper, accessibility */

/* ----- TEXTS (RO / EN) ----- */
const texts = {
  ro: {
    heroTitle: "Animatori pentru copii în Arad",
    heroDesc: "Face painting, modelaj baloane, mascote și spectacole pentru cele mai frumoase petreceri",
    btnReserve: "Rezervă acum",
    btnServices: "Vezi servicii",
    servicesTitle: "Serviciile noastre",
    services: [
      { title: "Picturi pe față", desc: "Transformăm copiii în eroii lor preferați cu picturi colorate și sigure." },
      { title: "Modelaj baloane", desc: "Distracție garantată cu baloane modelate în forme jucăușe și creative." },
      { title: "Mascote & spectacole", desc: "Personaje îndrăgite și show-uri interactive pentru întreaga familie." }
    ],
    testimonialsTitle: "Ce spun părinții",
    testimonials: [
      "Copiii s-au distrat de minune! Recomand cu drag. – Andreea M.",
      "Mascotele au fost adorabile și atmosfera perfectă. – Ioana D.",
      "Profesioniști și foarte atenți cu cei mici. – Mihai P."
    ],
    contact: {
      title: "Contact",
      alina: "📞 Alina Toma: 0740-222888",
      marius: "📞 Marius George: 0788-111112",
      location: "Arad, România"
    },
    footer: "© MASCOTE-ARAD. Toate drepturile rezervate."
  },
  en: {
    heroTitle: "Kids Entertainers in Arad",
    heroDesc: "Face painting, balloon modeling, mascots and shows for the best parties",
    btnReserve: "Book now",
    btnServices: "See services",
    servicesTitle: "Our Services",
    services: [
      { title: "Face Painting", desc: "We transform children into their favorite heroes with colorful and safe face painting." },
      { title: "Balloon Modeling", desc: "Guaranteed fun with balloons shaped in playful and creative forms." },
      { title: "Mascots & Shows", desc: "Beloved characters and interactive shows for the whole family." }
    ],
    testimonialsTitle: "What Parents Say",
    testimonials: [
      "The kids had a blast! Highly recommend. – Andreea M.",
      "The mascots were adorable and the atmosphere was perfect. – Ioana D.",
      "Professional and very attentive with the little ones. – Mihai P."
    ],
    contact: {
      title: "Contact",
      alina: "📞 Alina Toma: 0740-222888",
      marius: "📞 Marius George: 0788-111112",
      location: "Arad, Romania"
    },
    footer: "© MASCOTE-ARAD. All rights reserved."
  }
};

/* ----- UPDATE UI LANGUAGE ----- */
function updateLang(lang) {
  const data = texts[lang] || texts.ro;

  document.documentElement.lang = lang;
  document.getElementById('heroTitle').textContent = data.heroTitle;
  document.getElementById('heroDesc').textContent = data.heroDesc;
  document.getElementById('btnReserve').textContent = data.btnReserve;
  document.getElementById('btnServices').textContent = data.btnServices;

  // Services
  document.getElementById('servicesTitle').textContent = data.servicesTitle;
  data.services.forEach((s, i) => {
    const t = i + 1;
    const titleEl = document.getElementById(`service${t}Title`);
    const descEl = document.getElementById(`service${t}Desc`);
    if (titleEl) titleEl.textContent = s.title;
    if (descEl) descEl.textContent = s.desc;
  });

  // Testimonials
  document.getElementById('testimonialsTitle').textContent = data.testimonialsTitle;
  data.testimonials.forEach((t, i) => {
    const el = document.getElementById(`testimonial${i+1}`);
    if (el) el.textContent = t;
  });

  // Contact
  document.getElementById('contactTitle').textContent = data.contact.title;
  document.getElementById('contactAlina').textContent = data.contact.alina;
  document.getElementById('contactMarius').textContent = data.contact.marius;
  document.getElementById('contactLocation').textContent = data.contact.location;

  // Footer
  document.getElementById('footerText').textContent = data.footer;

  // Navbar labels (nav & mobile)
  document.querySelectorAll('[data-ro]').forEach(el => {
    el.textContent = (lang === 'ro') ? el.dataset.ro : el.dataset.en;
  });
}

/* ----- SET LANGUAGE (save to localStorage) ----- */
function setLang(lang) {
  try { localStorage.setItem('lang', lang); } catch (e) {}
  updateLang(lang);
  // update button styles/accessible labeling if needed
}

/* ----- INIT: read saved lang or default to 'ro' ----- */
(function initLang() {
  const saved = (function() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  })() || 'ro';
  setLang(saved);
})();

/* ----- UI: language buttons ----- */
document.getElementById('langRoBtn')?.addEventListener('click', () => setLang('ro'));
document.getElementById('langEnBtn')?.addEventListener('click', () => setLang('en'));

/* ----- MOBILE MENU ----- */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// close mobile menu when clicking a link
document.querySelectorAll('#mobileMenu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

/* ----- SWIPER ----- */
const swiper = new Swiper('.mySwiper', {
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});

/* ----- Accessibility: close menus on escape ----- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
  }
});
