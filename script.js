// ✨ Animação ao rolar a página
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('active');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// 🎞️ Swiper (carrossel)
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});