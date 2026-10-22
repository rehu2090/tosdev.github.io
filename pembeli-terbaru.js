/* TOKKO POS - daftar pembeli terbaru (nama disamarkan, dengan izin pembeli).
   Data dibaca dari Supabase view "pembeli_publik" (hanya nama samaran,
   paket, dan bulan). Kalau belum ada data / gagal dimuat, bagian
   #pembeli disembunyikan otomatis. */
(function () {
  var URL_SUPABASE = 'https://hurkjspmrfetyvcoxcgy.supabase.co';
  var ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cmtqc3BtcmZldHl2Y294Y2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MDg2OTIsImV4cCI6MjEwODA4NDY5Mn0.T9zjXAXBxiOe-bP9kaHSjyiLiM2cjny3hBE4U_cDNbM';
  var BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  var PAKET = { basic: 'Basic', pro: 'Pro', ultimate: 'Ultimate' };

  var bagian = document.getElementById('pembeli');
  var wadah = document.getElementById('pembeli-list');
  if (!bagian || !wadah) return;

  fetch(URL_SUPABASE + '/rest/v1/pembeli_publik?select=nama_samaran,tier,bulan', {
    headers: { apikey: ANON_KEY, Authorization: 'Bearer ' + ANON_KEY }
  })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      if (!Array.isArray(data) || data.length === 0) return;
      data.forEach(function (p) {
        var kartu = document.createElement('div');
        kartu.className = 'card';
        kartu.style.padding = '16px 18px';
        var nama = document.createElement('h3');
        nama.style.margin = '0 0 4px';
        nama.style.fontSize = '1.05rem';
        nama.textContent = p.nama_samaran || '';
        var info = document.createElement('p');
        info.style.margin = '0';
        info.style.fontSize = '0.9rem';
        var tgl = p.bulan ? new Date(p.bulan + 'T00:00:00') : null;
        info.textContent = 'Paket ' + (PAKET[p.tier] || p.tier || '-') +
          (tgl ? ' · ' + BULAN[tgl.getMonth()] + ' ' + tgl.getFullYear() : '');
        kartu.appendChild(nama);
        kartu.appendChild(info);
        wadah.appendChild(kartu);
      });
      bagian.hidden = false;
    })
    .catch(function () { /* tetap tersembunyi */ });
})();
