const hamburger = document.querySelector(".hamburger");
const nav_menu = document.querySelector(".nav-menu");
let menu_list = document.getElementById("menu_list");

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
