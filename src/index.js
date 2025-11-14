import "./root.css";
import "./critical.css";
import "./local.css";

const header = document.querySelector("header");
const hamburger = document.querySelector("button.hamburger");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (header) {
      header.classList.toggle("active");
    }
  });
}

const slideIndicators = document.querySelectorAll("button.dot");
var currentId = 1;

if (slideIndicators) {
  slideIndicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const newId = Number(indicator.getAttribute("data-id"));
      if (newId !== currentId) {
        removeActiveClass(slideIndicators);
        indicator.className = "dot active";
        currentId = newId;
        const currentSlide = getCurrentSlide(currentId);

        if (currentSlide) {
          addHiddenClass(document.querySelectorAll(".item"));
          currentSlide.classList.remove("hidden");
        }
      }
    });
  });
}

function removeActiveClass(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

function addHiddenClass(elements) {
  elements.forEach((element) => {
    element.className = "item hidden";
  });
}

function getCurrentSlide(slideId) {
  const slide = document.querySelector(`.item[data-id="${slideId}"]`);
  return slide;
}
