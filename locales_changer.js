document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("language");

  function loadLanguage(lang) {
    fetch(`locales/${lang}.json`)
      .then((response) => response.json())
      .then((translations) => {
        document.querySelectorAll("[data-key]").forEach((element) => {
          const key = element.getAttribute("data-key");
          if (translations[key]) {
            element.textContent = translations[key];
          }
        });

        localStorage.setItem("lang", lang);
      })
      .catch((error) => console.error(`Ошибка загрузки ${lang}.json:`, error));
  }

  const savedLang = localStorage.getItem("lang") || "en";
  langSwitcher.value = savedLang;
  loadLanguage(savedLang);

  langSwitcher.addEventListener("change", function (event) {
    loadLanguage(event.target.value);
  });
});

// document
//   .getElementById("trackSelector")
//   .addEventListener("change", function () {
//     let audio = document.getElementById("audioPlayer");
//     audio.src = this.value;
//     audio.play();
//   });
// function toggleMobileMenu() {
//   let menu = document.getElementById("mobileMenu");
//   menu.classList.toggle("show");
// }
