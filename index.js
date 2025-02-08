const hamburger = document.querySelector(".hamburger");
const nav_menu = document.querySelector(".nav-menu");
let menu_list = document.getElementById("menu_list");
// Flip Button
document.querySelectorAll(".concert-card-container").forEach((card) => {
  const moreBtn = card.querySelector(".more-btn");
  const backBtn = card.querySelector(".back-btn");

  moreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    card.classList.add("flipped");
  });

  backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    card.classList.remove("flipped");
  });
});

menu_list.style.maxHeight = "0px";

function toggle_menu() {
  if (menu_list.style.maxHeight == "0px") {
    menu_list.style.maxHeight = "700px";
  } else {
    menu_list.style.maxHeight = "0px";
  }
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
});

// tickets

function startCountdown(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;
    if (timeLeft < 0) {
      document.getElementById("timer").innerHTML = "Билеты уже в продаже!";
      return;
    }
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    document.getElementById(
      "timer"
    ).innerHTML = `${hours}:${minutes}:${seconds}`;
    setTimeout(updateTimer, 1000);
  }
  updateTimer();
}
startCountdown(new Date(2025, 2, 10, 12, 0).getTime());

// Покупка билетов
function showPaymentOptions(price) {
  document.getElementById("payment-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("payment-modal").style.display = "none";
}

function payWithCrypto() {
  document.getElementById("crypto-payment").style.display = "block";
}

// Личный кабинет
function showLogin() {
  const name = prompt("Введите имя:");
  if (name) {
    localStorage.setItem("user", name);
    updateUserProfile();
  }
}

function showRegister() {
  const name = prompt("Введите имя для регистрации:");
  if (name) {
    localStorage.setItem("user", name);
    updateUserProfile();
  }
}

function updateUserProfile() {
  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("user-profile").style.display = "block";
    document.getElementById("user-name").textContent = user;
  }
}

function logout() {
  localStorage.removeItem("user");
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("user-profile").style.display = "none";
}

updateUserProfile();

// Проверка на спам в отзывах
function checkSpam() {
  const input = document.getElementById("review-input").value;
  const forbiddenWords = ["спам", "лохотрон", "обман"];
  for (let word of forbiddenWords) {
    if (input.toLowerCase().includes(word)) {
      alert("Обнаружен спам! Исправьте текст.");
      document.getElementById("review-input").value = "";
      break;
    }
  }
}

// Добавление отзыва
function submitReview() {
  const input = document.getElementById("review-input").value;
  if (!input) return;
  const reviewList = document.getElementById("review-list");
  const newReview = document.createElement("p");
  newReview.textContent = input;
  reviewList.appendChild(newReview);
  document.getElementById("review-input").value = "";
}
