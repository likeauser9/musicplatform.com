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
