// ============================================================
//  STUDYSPOT SEMARANG — script.js
//  Sistem Rekomendasi Tempat Nugas Berbasis Bobot Preferensi
//  Dibuat untuk Tugas Pemrograman Komputer
// ============================================================


// ============================================================
//  BAGIAN 1: DATA DUMMY TEMPAT
//  Setiap objek mewakili satu tempat dengan properti:
//  - id          : identitas unik tempat
//  - nama        : nama tempat
//  - jenis       : "kafe" | "perpustakaan" | "coworking"
//  - lokasi      : alamat singkat
//  - budget      : "murah" | "sedang" | "mahal"
//  - suasana     : "tenang" | "sedang" | "ramai"
//  - rating      : skala 1–5
//  - wifi        : true/false
//  - colokan     : true/false
//  - kursi       : true/false
//  - bukaMalam   : true/false
//  - cocokBelajar: true/false
//  - deskripsi   : teks deskripsi singkat
// ============================================================
const daftarTempat = [
  {
    id: 1,
    nama: "Filosofi Kopi Tembalang",
    jenis: "kafe",
    lokasi: "Jl. Ngesrep Timur V, Tembalang",
    budget: "sedang",
    suasana: "tenang",
    rating: 4.5,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Kafe estetik bernuansa kayu dan hijau, favorit mahasiswa Undip. Musik jazz pelan, colokan di setiap meja, dan WiFi kencang. Cocok banget buat marathon nugas.",
  },
  {
    id: 2,
    nama: "Perpustakaan Pusat Undip",
    jenis: "perpustakaan",
    lokasi: "Kampus Undip Tembalang, Semarang",
    budget: "murah",
    suasana: "tenang",
    rating: 4.3,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: false,
    cocokBelajar: true,
    deskripsi:
      "Perpustakaan modern 5 lantai dengan koleksi buku lengkap, ruang baca ber-AC, dan area diskusi. Gratis untuk mahasiswa Undip.",
  },
  {
    id: 3,
    nama: "Kopi Kenangan Banyumanik",
    jenis: "kafe",
    lokasi: "Jl. Setiabudi, Banyumanik",
    budget: "murah",
    suasana: "sedang",
    rating: 4.1,
    wifi: true,
    colokan: false,
    kursi: false,
    bukaMalam: true,
    cocokBelajar: false,
    deskripsi:
      "Harga terjangkau mulai 15rb, cocok mampir cepat. Tempatnya ramai di jam sibuk tapi WiFi-nya lumayan stabil.",
  },
  {
    id: 4,
    nama: "Roti Bakar 88 Co-working",
    jenis: "coworking",
    lokasi: "Jl. Prof. Sudarto, Tembalang",
    budget: "murah",
    suasana: "sedang",
    rating: 4.2,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Ruang kerja bareng dengan harga teman. Ada colokan di setiap kursi, snack murah, dan buka sampai tengah malam. Komunitas mahasiswa aktif di sini.",
  },
  {
    id: 5,
    nama: "Kedai Kopi Tuku Semarang",
    jenis: "kafe",
    lokasi: "Jl. Singosari Raya, Semarang Timur",
    budget: "sedang",
    suasana: "sedang",
    rating: 4.4,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Kopi susu kekinian dengan area duduk luas. Dua lantai, lantai atas lebih tenang untuk belajar. Staff ramah, tidak keberatan kamu duduk lama.",
  },
  {
    id: 6,
    nama: "Perpustakaan Daerah Jawa Tengah",
    jenis: "perpustakaan",
    lokasi: "Jl. Sriwijaya No.29, Candisari",
    budget: "murah",
    suasana: "tenang",
    rating: 4.0,
    wifi: true,
    colokan: false,
    kursi: true,
    bukaMalam: false,
    cocokBelajar: true,
    deskripsi:
      "Perpustakaan provinsi dengan koleksi jurnal dan buku teks. Suasana sangat hening, AC dingin. Ideal untuk riset dan membaca serius.",
  },
  {
    id: 7,
    nama: "Makerspace Telkom Semarang",
    jenis: "coworking",
    lokasi: "Jl. Gajah Mada No.18, Semarang Tengah",
    budget: "sedang",
    suasana: "sedang",
    rating: 4.6,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: false,
    cocokBelajar: true,
    deskripsi:
      "Ruang inovasi dengan fasilitas lengkap: printer, proyektor, papan tulis besar. Cocok untuk mengerjakan tugas kelompok atau proyek teknik.",
  },
  {
    id: 8,
    nama: "Cafe Nol Derajat",
    jenis: "kafe",
    lokasi: "Jl. Pandanaran, Semarang Tengah",
    budget: "mahal",
    suasana: "tenang",
    rating: 4.7,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Kafe premium dengan interior industrial dan pemandangan kota. Harga di atas rata-rata tapi fasilitas bintang lima — WiFi fiber, kursi ergonomis, dan tenang sepanjang hari.",
  },
  {
    id: 9,
    nama: "Warkop Mas Bro Tembalang",
    jenis: "kafe",
    lokasi: "Jl. Tirto Agung, Tembalang",
    budget: "murah",
    suasana: "ramai",
    rating: 3.8,
    wifi: false,
    colokan: false,
    kursi: false,
    bukaMalam: true,
    cocokBelajar: false,
    deskripsi:
      "Warkop klasik mahasiswa. Kopi 5 ribu, mie instan 8 ribu. Ramai dan seru, tapi kurang ideal untuk fokus belajar. Cocok kalau cuma mau nongkrong santai.",
  },
  {
    id: 10,
    nama: "Green Library Polines",
    jenis: "perpustakaan",
    lokasi: "Jl. Prof. Sudarto No.13, Tembalang",
    budget: "murah",
    suasana: "tenang",
    rating: 4.2,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: false,
    cocokBelajar: true,
    deskripsi:
      "Perpustakaan Politeknik Negeri Semarang yang modern dan luas. Koleksi buku teknik lengkap, ada ruang computer lab, dan loker gratis.",
  },
  {
    id: 11,
    nama: "Kopiku Nusantara Banyumanik",
    jenis: "kafe",
    lokasi: "Jl. Sukun Raya, Banyumanik",
    budget: "sedang",
    suasana: "tenang",
    rating: 4.3,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Kafe dengan nuansa alam — dinding bambu, tanaman hijau, dan musik akustik pelan. Menu kopi Nusantara beragam. Sering jadi lokasi foto estetik sekaligus tempat nugas.",
  },
  {
    id: 12,
    nama: "HUB Co-working Simpang Lima",
    jenis: "coworking",
    lokasi: "Jl. Pahlawan No.5, Simpang Lima",
    budget: "mahal",
    suasana: "sedang",
    rating: 4.8,
    wifi: true,
    colokan: true,
    kursi: true,
    bukaMalam: true,
    cocokBelajar: true,
    deskripsi:
      "Co-working space profesional dengan fasilitas meeting room, standing desk, dan internet gigabit. Harga harian tersedia. Cocok untuk tugas akhir atau startup project.",
  },
];


// ============================================================
//  BAGIAN 2: VARIABEL PREFERENSI PENGGUNA
//  Menyimpan pilihan pengguna dari form
// ============================================================
let preferensiPengguna = {
  jenis: "semua",
  budget: "semua",
  suasana: "semua",
  wifi: false,
  colokan: false,
  kursi: false,
  bukaMalam: false,
  cocokBelajar: false,
};

// Menyimpan halaman sebelumnya (untuk navigasi tombol back detail)
let halamanSebelumDetail = "page-results";


// ============================================================
//  BAGIAN 3: SISTEM NAVIGASI HALAMAN
//  Fungsi untuk berpindah antar halaman
// ============================================================

/**
 * Menampilkan halaman yang dipilih dan menyembunyikan halaman lainnya.
 * @param {string} idHalaman - ID elemen section yang ingin ditampilkan
 */
function showPage(idHalaman) {
  // Ambil semua halaman
  const semuaHalaman = document.querySelectorAll(".page");

  // Sembunyikan semua halaman
  semuaHalaman.forEach((halaman) => {
    halaman.classList.remove("active");
  });

  // Tampilkan halaman yang dipilih
  const halamanTuju = document.getElementById(idHalaman);
  if (halamanTuju) {
    halamanTuju.classList.add("active");
    window.scrollTo(0, 0); // Scroll ke atas saat ganti halaman
  }

  // Kalau buka halaman favorit, refresh isinya
  if (idHalaman === "page-favorites") {
    tampilkanFavorit();
  }
}


// ============================================================
//  BAGIAN 4: MANAJEMEN CHIP (PILIHAN KATEGORI)
//  Fungsi agar chip aktif hanya satu dalam satu group
// ============================================================

/**
 * Inisialisasi semua grup chip agar bisa diklik
 * dan menyimpan nilai ke preferensiPengguna
 */
function inisialisasiChip() {
  const grupChip = [
    { id: "chip-jenis", key: "jenis" },
    { id: "chip-budget", key: "budget" },
    { id: "chip-suasana", key: "suasana" },
  ];

  grupChip.forEach(({ id, key }) => {
    const kontainer = document.getElementById(id);
    const chips = kontainer.querySelectorAll(".chip");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        // Hapus aktif dari semua chip dalam grup ini
        chips.forEach((c) => c.classList.remove("active"));

        // Tandai chip yang diklik sebagai aktif
        chip.classList.add("active");

        // Simpan nilai ke preferensiPengguna
        preferensiPengguna[key] = chip.dataset.value;
      });
    });
  });
}


// ============================================================
//  BAGIAN 5: SISTEM PERHITUNGAN SKOR (INTI REKOMENDASI)
//
//  Cara Kerja:
//  Setiap tempat dibandingkan dengan preferensi pengguna.
//  Jika cocok, maka poin dijumlahkan sesuai bobot masing-masing.
//
//  Bobot Kriteria:
//  - Harga sesuai    : 20 poin
//  - Suasana sesuai  : 20 poin
//  - WiFi            : 15 poin
//  - Colokan         : 15 poin
//  - Kursi nyaman    : 10 poin
//  - Buka malam      : 10 poin
//  - Cocok belajar   : 10 poin
//  Total maksimal    : 100 poin
// ============================================================

/**
 * Menghitung skor kecocokan antara satu tempat dan preferensi pengguna.
 * @param {Object} tempat - Objek data tempat dari daftarTempat
 * @returns {Object} { skor, alasan } - Skor total dan daftar alasan rekomendasi
 */
function hitungSkor(tempat) {
  let skor = 0;
  let alasan = []; // Menyimpan penjelasan kenapa tempat ini cocok

  // --- Kriteria 1: Kesesuaian Harga (20 poin) ---
  if (
    preferensiPengguna.budget === "semua" ||
    preferensiPengguna.budget === tempat.budget
  ) {
    skor += 20;
    alasan.push(`Budget sesuai (kategori: ${tempat.budget})`);
  }

  // --- Kriteria 2: Kesesuaian Suasana (20 poin) ---
  if (
    preferensiPengguna.suasana === "semua" ||
    preferensiPengguna.suasana === tempat.suasana
  ) {
    skor += 20;
    alasan.push(`Suasana sesuai (kategori: ${tempat.suasana})`);
  }

  // --- Kriteria 3: WiFi (15 poin) ---
  // Poin diberikan jika: pengguna tidak wajibkan WiFi, ATAU tempat punya WiFi
  if (!preferensiPengguna.wifi || tempat.wifi) {
    skor += 15;
    if (tempat.wifi) alasan.push("WiFi tersedia");
  }

  // --- Kriteria 4: Colokan Listrik (15 poin) ---
  if (!preferensiPengguna.colokan || tempat.colokan) {
    skor += 15;
    if (tempat.colokan) alasan.push("Colokan listrik tersedia");
  }

  // --- Kriteria 5: Kursi Nyaman (10 poin) ---
  if (!preferensiPengguna.kursi || tempat.kursi) {
    skor += 10;
    if (tempat.kursi) alasan.push("Kursi nyaman");
  }

  // --- Kriteria 6: Buka Malam (10 poin) ---
  if (!preferensiPengguna.bukaMalam || tempat.bukaMalam) {
    skor += 10;
    if (tempat.bukaMalam) alasan.push("Buka sampai malam");
  }

  // --- Kriteria 7: Cocok Belajar Lama (10 poin) ---
  if (!preferensiPengguna.cocokBelajar || tempat.cocokBelajar) {
    skor += 10;
    if (tempat.cocokBelajar) alasan.push("Cocok untuk belajar lama");
  }

  return { skor, alasan };
}

/**
 * Fungsi utama: membaca preferensi, menghitung skor semua tempat,
 * lalu menampilkan hasil rekomendasi.
 * Dipanggil saat tombol "Cari Rekomendasi" diklik.
 */
function hitungRekomendasi() {
  // Ambil nilai toggle (checkbox on/off)
  preferensiPengguna.wifi        = document.getElementById("pref-wifi").checked;
  preferensiPengguna.colokan     = document.getElementById("pref-colokan").checked;
  preferensiPengguna.kursi       = document.getElementById("pref-kursi").checked;
  preferensiPengguna.bukaMalam   = document.getElementById("pref-malam").checked;
  preferensiPengguna.cocokBelajar = document.getElementById("pref-belajar").checked;

  // Filter tempat berdasarkan jenis yang dipilih
  let tempat = daftarTempat;
  if (preferensiPengguna.jenis !== "semua") {
    tempat = daftarTempat.filter((t) => t.jenis === preferensiPengguna.jenis);
  }

  // Hitung skor setiap tempat
  const hasilDenganSkor = tempat.map((t) => {
    const { skor, alasan } = hitungSkor(t);
    return { ...t, skor, alasan };
  });

  // Urutkan dari skor tertinggi ke terendah
  hasilDenganSkor.sort((a, b) => b.skor - a.skor);

  // Simpan ke variabel global agar bisa diakses halaman detail
  window.hasilRekomendasi = hasilDenganSkor;

  // Tampilkan hasil di halaman rekomendasi
  tampilkanHasil(hasilDenganSkor);
  showPage("page-results");
}


// ============================================================
//  BAGIAN 6: FUNGSI TAMPIL HASIL
// ============================================================

/**
 * Menentukan badge teks berdasarkan skor kecocokan
 * @param {number} skor - Skor 0–100
 * @returns {Object} { teks, kelas } untuk badge
 */
function getBadge(skor) {
  if (skor >= 80) return { teks: "⭐ Sangat Direkomendasikan", kelas: "badge-top" };
  if (skor >= 50) return { teks: "👍 Cukup Sesuai",            kelas: "badge-mid" };
  return             { teks: "⚠️ Kurang Sesuai",              kelas: "badge-low" };
}

/**
 * Mengembalikan emoji ikon berdasarkan jenis tempat
 * @param {string} jenis
 * @returns {string} emoji
 */
function getIcon(jenis) {
  const icons = { kafe: "☕", perpustakaan: "📚", coworking: "💼" };
  return icons[jenis] || "📍";
}

/**
 * Mengecek apakah tempat sudah ada di favorit
 * @param {number} id - ID tempat
 * @returns {boolean}
 */
function isFavorit(id) {
  const favorit = getFavoritDariStorage();
  return favorit.some((t) => t.id === id);
}

/**
 * Merender kartu untuk satu tempat
 * @param {Object} tempat - Data tempat (sudah ada properti skor & alasan)
 * @param {boolean} dariHasil - true jika kartu dibuka dari halaman hasil
 * @returns {string} HTML string kartu
 */
function buatKartu(tempat, dariHasil = true) {
  const badge   = getBadge(tempat.skor);
  const icon    = getIcon(tempat.jenis);
  const favorit = isFavorit(tempat.id);
  const labelSimpan = favorit ? "♥ Tersimpan" : "♡ Simpan";
  const kelasSimpan = favorit ? "btn-save saved" : "btn-save";

  // Tag fasilitas
  const tags = [
    { aktif: tempat.wifi,        label: "📶 WiFi" },
    { aktif: tempat.colokan,     label: "🔌 Colokan" },
    { aktif: tempat.kursi,       label: "🪑 Kursi Nyaman" },
    { aktif: tempat.bukaMalam,   label: "🌙 Buka Malam" },
    { aktif: tempat.cocokBelajar,label: "📖 Cocok Belajar" },
  ];
  const tagsHTML = tags
    .map((t) => `<span class="card-tag ${t.aktif ? "" : "gray"}">${t.label}</span>`)
    .join("");

  // Label budget dengan emoji
  const budgetLabel = { murah: "💚 Murah", sedang: "💛 Sedang", mahal: "🔴 Mahal" };
  const suasanaLabel = { tenang: "🔇 Tenang", sedang: "🔉 Sedang", ramai: "🔊 Ramai" };

  return `
    <div class="place-card" id="card-${tempat.id}">
      <div class="card-header">
        <div class="card-icon-wrap">${icon}</div>
        <span class="card-badge ${badge.kelas}">${badge.teks}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${tempat.nama}</h3>
        <p class="card-location">📍 ${tempat.lokasi}</p>
        <div class="card-tags">
          <span class="card-tag">${budgetLabel[tempat.budget]}</span>
          <span class="card-tag">${suasanaLabel[tempat.suasana]}</span>
          <span class="card-tag">⭐ ${tempat.rating}</span>
          ${tagsHTML}
        </div>
      </div>
      <div class="score-section">
        <div class="score-label">
          <span>Kecocokan</span>
          <strong>${tempat.skor}%</strong>
        </div>
        <div class="score-bar">
          <div class="score-fill" style="width: 0%" data-target="${tempat.skor}%"></div>
        </div>
      </div>
      <div class="card-footer">
        <button class="btn-detail" onclick="lihatDetail(${tempat.id}, '${dariHasil ? "page-results" : "page-favorites"}')">
          Lihat Detail
        </button>
        <button class="${kelasSimpan}" id="btn-save-${tempat.id}" onclick="toggleFavorit(${tempat.id})">
          ${labelSimpan}
        </button>
      </div>
    </div>
  `;
}

/**
 * Menampilkan semua kartu hasil rekomendasi
 * @param {Array} hasilDenganSkor - Array tempat yang sudah diberi skor
 */
function tampilkanHasil(hasilDenganSkor) {
  const kontainer = document.getElementById("results-container");
  const subtitle  = document.getElementById("result-subtitle");

  if (hasilDenganSkor.length === 0) {
    kontainer.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">😔</span>
        <p>Tidak ada tempat yang sesuai dengan preferensimu.<br>Coba ubah filter atau pilih "Semua".</p>
      </div>`;
    subtitle.textContent = "Tidak ada hasil ditemukan";
    return;
  }

  subtitle.textContent = `${hasilDenganSkor.length} tempat ditemukan · Diurutkan dari kecocokan tertinggi`;
  kontainer.innerHTML = hasilDenganSkor.map((t) => buatKartu(t)).join("");

  // Animasi progress bar setelah render
  animasiScoreBar();
}


// ============================================================
//  BAGIAN 7: ANIMASI SCORE BAR
// ============================================================

/**
 * Menganimasikan bar kecocokan dari 0% ke nilai target.
 * Dipanggil setelah kartu dirender agar animasi terlihat.
 */
function animasiScoreBar() {
  requestAnimationFrame(() => {
    const bars = document.querySelectorAll(".score-fill");
    bars.forEach((bar) => {
      const target = bar.dataset.target;
      // Delay kecil agar browser sempat render dulu sebelum animasi
      setTimeout(() => { bar.style.width = target; }, 50);
    });
  });
}


// ============================================================
//  BAGIAN 8: HALAMAN DETAIL TEMPAT
// ============================================================

/**
 * Menampilkan halaman detail untuk satu tempat
 * @param {number} idTempat - ID tempat yang ingin dilihat
 * @param {string} halamanAsal - Halaman yang harus dituju saat klik "Kembali"
 */
function lihatDetail(idTempat, halamanAsal) {
  halamanSebelumDetail = halamanAsal;

  // Cari data tempat dari hasilRekomendasi (sudah ada skor & alasan)
  // Jika tidak ada (misal dari favorit), cari dari daftarTempat dan hitung skor
  let tempat = (window.hasilRekomendasi || []).find((t) => t.id === idTempat);

  if (!tempat) {
    // Jika dibuka dari favorit, hitung ulang skornya
    const data = daftarTempat.find((t) => t.id === idTempat);
    const { skor, alasan } = hitungSkor(data);
    tempat = { ...data, skor, alasan };
  }

  // Set tombol back
  document.getElementById("detail-back-btn").onclick = () =>
    showPage(halamanSebelumDetail);

  // Render konten detail
  const kontainer = document.getElementById("detail-container");
  const icon      = getIcon(tempat.jenis);
  const badge     = getBadge(tempat.skor);
  const favorit   = isFavorit(tempat.id);

  // Buat list fasilitas
  const fasilitas = [
    { label: "WiFi",          ada: tempat.wifi,         ikon: "📶" },
    { label: "Colokan Listrik", ada: tempat.colokan,    ikon: "🔌" },
    { label: "Kursi Nyaman",  ada: tempat.kursi,        ikon: "🪑" },
    { label: "Buka Malam",    ada: tempat.bukaMalam,    ikon: "🌙" },
    { label: "Cocok Belajar Lama", ada: tempat.cocokBelajar, ikon: "📖" },
  ];

  const fasilitasHTML = fasilitas
    .map(
      (f) =>
        `<div class="facility-item ${f.ada ? "yes" : "no"}">
          ${f.ikon} ${f.label} ${f.ada ? "✓" : "✗"}
        </div>`
    )
    .join("");

  // Buat list alasan rekomendasi
  const alasanHTML =
    tempat.alasan && tempat.alasan.length > 0
      ? tempat.alasan
          .map((a) => `<div class="reason-item"><span class="reason-dot"></span>${a}</div>`)
          .join("")
      : `<div class="reason-item"><span class="reason-dot"></span>Tidak ada fasilitas yang cocok dengan preferensimu saat ini.</div>`;

  kontainer.innerHTML = `
    <div class="detail-hero">
      <div class="detail-hero-top">
        <div class="detail-big-icon">${icon}</div>
        <div>
          <h2 class="detail-name">${tempat.nama}</h2>
          <p class="detail-loc">📍 ${tempat.lokasi}</p>
        </div>
      </div>
      <p class="detail-desc">${tempat.deskripsi}</p>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">Info Umum</p>
      <div class="card-tags" style="margin-bottom:0">
        <span class="card-tag">⭐ Rating ${tempat.rating}</span>
        <span class="card-tag">💰 Budget ${tempat.budget}</span>
        <span class="card-tag">🎧 Suasana ${tempat.suasana}</span>
        <span class="card-badge ${badge.kelas}" style="display:inline-block; margin-left:4px">${badge.teks}</span>
      </div>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">Fasilitas Tersedia</p>
      <div class="facility-grid">${fasilitasHTML}</div>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">Alasan Direkomendasikan</p>
      <div class="reason-list">${alasanHTML}</div>
    </div>

    <div class="detail-section">
      <p class="detail-section-title">Skor Kecocokan</p>
      <div class="score-label" style="margin-bottom:8px">
        <span>Persentase kesesuaian dengan preferensimu</span>
        <strong>${tempat.skor}%</strong>
      </div>
      <div class="score-bar" style="height:12px">
        <div class="score-fill" style="width:0%" data-target="${tempat.skor}%"></div>
      </div>
    </div>

    <button
      class="btn-primary"
      id="btn-save-detail-${tempat.id}"
      onclick="toggleFavorit(${tempat.id})"
      style="margin-top:8px; width:100%; justify-content:center"
    >
      ${favorit ? "♥ Hapus dari Favorit" : "♡ Simpan ke Favorit"}
    </button>
  `;

  showPage("page-detail");
  animasiScoreBar();
}


// ============================================================
//  BAGIAN 9: FITUR FAVORIT (menggunakan localStorage)
//  localStorage = penyimpanan di browser pengguna
//  Data favorit tidak hilang meski browser ditutup
// ============================================================

const KUNCI_FAVORIT = "studyspot_favorit"; // Kunci penyimpanan di localStorage

/**
 * Mengambil daftar favorit dari localStorage
 * @returns {Array} array berisi objek tempat favorit
 */
function getFavoritDariStorage() {
  const data = localStorage.getItem(KUNCI_FAVORIT);
  return data ? JSON.parse(data) : []; // Parse JSON atau kembalikan array kosong
}

/**
 * Menyimpan daftar favorit ke localStorage
 * @param {Array} daftar - Array berisi objek tempat
 */
function simpanFavoritKeStorage(daftar) {
  localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(daftar));
}

/**
 * Toggle (tambah/hapus) tempat dari daftar favorit
 * @param {number} idTempat - ID tempat
 */
function toggleFavorit(idTempat) {
  let favorit = getFavoritDariStorage();
  const sudahAda = favorit.some((t) => t.id === idTempat);

  if (sudahAda) {
    // Hapus dari favorit
    favorit = favorit.filter((t) => t.id !== idTempat);
    tampilkanToast("Dihapus dari favorit");
  } else {
    // Tambah ke favorit — cari data dari daftarTempat
    const data = daftarTempat.find((t) => t.id === idTempat);
    const { skor, alasan } = hitungSkor(data);
    favorit.push({ ...data, skor, alasan });
    tampilkanToast("Disimpan ke favorit! ♥");
  }

  simpanFavoritKeStorage(favorit);

  // Update teks tombol simpan di kartu (jika ada)
  const btnKartu = document.getElementById(`btn-save-${idTempat}`);
  if (btnKartu) {
    btnKartu.textContent = sudahAda ? "♡ Simpan" : "♥ Tersimpan";
    btnKartu.className = sudahAda ? "btn-save" : "btn-save saved";
  }

  // Update tombol di halaman detail (jika ada)
  const btnDetail = document.getElementById(`btn-save-detail-${idTempat}`);
  if (btnDetail) {
    btnDetail.textContent = sudahAda ? "♡ Simpan ke Favorit" : "♥ Hapus dari Favorit";
  }
}

/**
 * Menampilkan isi daftar favorit di halaman "Tempat Tersimpan"
 */
function tampilkanFavorit() {
  const kontainer = document.getElementById("favorites-container");
  const favorit   = getFavoritDariStorage();

  if (favorit.length === 0) {
    kontainer.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🤍</span>
        <p>Belum ada tempat yang disimpan.<br>Temukan tempat favoritmu dulu!</p>
      </div>`;
    return;
  }

  kontainer.innerHTML = favorit.map((t) => buatKartu(t, false)).join("");
  animasiScoreBar();
}


// ============================================================
//  BAGIAN 10: TOAST NOTIFICATION
// ============================================================

/**
 * Menampilkan notifikasi kecil di bagian bawah layar
 * @param {string} pesan - Teks yang ingin ditampilkan
 */
function tampilkanToast(pesan) {
  const toast = document.getElementById("toast");
  toast.textContent = pesan;
  toast.classList.add("show");

  // Sembunyikan setelah 2.5 detik
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


// ============================================================
//  BAGIAN 11: INISIALISASI — dijalankan saat halaman pertama kali dibuka
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Aktifkan fungsi chip agar tombol kategori bisa diklik
  inisialisasiChip();

  console.log("✅ StudySpot Semarang berhasil dimuat!");
  console.log(`📍 Total tempat tersedia: ${daftarTempat.length}`);
});
