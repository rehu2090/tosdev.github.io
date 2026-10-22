// Toggle menu mobile (hamburger) -- dipakai di semua halaman.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  // Tutup menu otomatis begitu salah satu link diklik.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });
});

// Statistik pengunjung (Cloudflare Web Analytics, tanpa cookie).
// Isi CF_TOKEN dengan token dari dash.cloudflare.com > Analytics & Logs >
// Web Analytics > (situs tosdev.my.id). Kosong = tidak aktif. Satu
// tempat ini berlaku untuk SEMUA halaman (script.js dipakai semuanya).
(function () {
  var CF_TOKEN = '3dfb055b1504444a9cbd21577acf583b';
  if (!CF_TOKEN) return;
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_TOKEN }));
  document.head.appendChild(s);
})();
