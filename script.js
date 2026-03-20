// ===== VARIABLES =====
const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const header = document.querySelector("nav");
const hamburger1 = document.getElementById("hamburger");
const hamburger2 = document.getElementById("hamburger2"); // tombol kedua
const navOverlay = document.getElementById("navOverlay");
const navLinks = document.querySelectorAll(".nav-tautan a, .nav-overlay a");
const skillCards = document.querySelectorAll(".kartu-keahlian");
const projectCards = document.querySelectorAll(".kartu-proyek");

// ===== THEME (DARK / LIGHT) =====
function initializeTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    html.classList.add("light-mode");
    themeToggle.textContent = "☀️";
  } else {
    html.classList.remove("light-mode");
    themeToggle.textContent = "🌙";
  }
}

function toggleTheme() {
  html.classList.toggle("light-mode");
  const isLight = html.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", toggleTheme);

// INI PENTING
initializeTheme();

// ===== STICKY NAVBAR =====
window.addEventListener("scroll", () => {
  header.style.background = window.scrollY > 40 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)";
});

// ===== HAMBURGER MENU (DUA TOMBOL) =====
[hamburger1, hamburger2].forEach(btn => {
  btn?.addEventListener("click", () => navOverlay.classList.toggle("buka"));
});

// Tutup overlay saat link diklik
navOverlay.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navOverlay.classList.remove("buka"));
});

// ===== SMOOTH SCROLL =====
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const target = link.getAttribute("href");
    if (!target.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    const offset = el.offsetTop - 60; // navbar height
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

// ===== KEAHLIAN PROGRESS BAR =====
skillCards.forEach(card => {
  card.addEventListener("click", () => {
    const fill = card.querySelector(".progress-fill");
    const max = fill.style.getPropertyValue("--fill");
    fill.style.width = (fill.style.width === max ? "0%" : max);
  });
});

// ===== PROYEK TERBONGKAR =====
projectCards.forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("terbuka"));
});

let count = localStorage.getItem("air") || 0;

function updateDisplay() {
  document.getElementById("jumlah").textContent = count;
  localStorage.setItem("air", count);

  const pesan = document.getElementById("pesan");

  if (count === 0) {
    pesan.textContent = "Yuk mulai minum air!";
  } else if (count < 5) {
    pesan.textContent = "Bagus! lanjutkan 👍";
  } else if (count < 8) {
    pesan.textContent = "Hampir cukup 💧";
  } else {
    pesan.textContent = "Mantap! tubuh kamu sehat 💪";
  }
}

function tambah() {
  count++;
  updateDisplay();
}

function kurang() {
  if (count > 0) {
    count--;
    updateDisplay();
  }
}

// 🔥 penting biar langsung muncul saat load
updateDisplay();