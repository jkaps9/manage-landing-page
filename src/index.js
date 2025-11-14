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
const cardContainer = document.querySelector(".card-container");
let currentId = 0;

// Desktop drag functionality
let isDown = false;
let startX;
let scrollLeft;

cardContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  cardContainer.classList.add("dragging");
  startX = e.pageX - cardContainer.offsetLeft;
  scrollLeft = cardContainer.scrollLeft;
});

cardContainer.addEventListener("mouseleave", () => {
  isDown = false;
  cardContainer.classList.remove("dragging");
});

cardContainer.addEventListener("mouseup", () => {
  isDown = false;
  cardContainer.classList.remove("dragging");
});

cardContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - cardContainer.offsetLeft;
  const walk = (x - startX) * 2;
  cardContainer.scrollLeft = scrollLeft - walk;
});

// Your existing indicator click logic - modified
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
          // Scroll to the slide instead of hiding/showing
          currentSlide.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    });
  });
}

// Update active dot when scrolling (mobile only - below 768px)
cardContainer.addEventListener("scroll", () => {
  if (window.innerWidth >= 768) return; // Skip on tablet and desktop

  const items = document.querySelectorAll(".item");
  const containerCenter =
    cardContainer.scrollLeft + cardContainer.offsetWidth / 2;

  items.forEach((item, index) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    if (Math.abs(containerCenter - itemCenter) < item.offsetWidth / 2) {
      removeActiveClass(slideIndicators);
      slideIndicators[index].classList.add("active");
      currentId = index;
    }
  });
});

function removeActiveClass(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

function getCurrentSlide(slideId) {
  const slide = document.querySelector(`.item[data-id="${slideId}"]`);
  return slide;
}
