// This file contains the JavaScript code to implement the slider functionality
// For both the exhibition and special events sections

// Exhibition slider

// Selects the main container that holds exhibition cards
const exhibitionContent = document.querySelector(".exhibition-content");

// Selects all the individual cards inside the exhibition section
const exhibitionCards = exhibitionContent.querySelectorAll(".exhibition-card");

// Creates navigation buttons for sliding
const exhibitionNextButton = document.createElement("button");
const exhibitionPrevButton = document.createElement("button");

// Keeps track of which card is currently displayed
let exhibitionCurrentIndex = 0;

// Create a wrapper div that will hold the content and buttons together
const exhibitionWrapper = document.createElement("div");
exhibitionWrapper.className = "exhibition-slider-wrapper";

// Insert the wrapper into the DOM before the content, and move content inside it
exhibitionContent.parentNode.insertBefore(exhibitionWrapper, exhibitionContent);
exhibitionWrapper.appendChild(exhibitionPrevButton);
exhibitionWrapper.appendChild(exhibitionContent);
exhibitionWrapper.appendChild(exhibitionNextButton);

// Add arrow icons to buttons using Font Awesome and style them
exhibitionNextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
exhibitionPrevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
exhibitionNextButton.classList.add("slider-button", "slider-next");
exhibitionPrevButton.classList.add("slider-button", "slider-prev");

// This function shows only the currently active card and hides the others
function updateExhibitionSlider() {
  exhibitionCards.forEach((card, index) => {
    card.style.display = index === exhibitionCurrentIndex ? "block" : "none";
  });
}

// Enables or disables the slider functionality based on screen size
function enableExhibitionSlider(enable) {
  if (enable) {
    updateExhibitionSlider(); // Show the first card by default
    exhibitionNextButton.style.display = "block";
    exhibitionPrevButton.style.display = "block";
  } else {
    // If disabling, hide the buttons and show all cards
    exhibitionCards.forEach((card) => (card.style.display = ""));
    exhibitionNextButton.style.display = "none";
    exhibitionPrevButton.style.display = "none";
  }
}

// Handle the "next" button click: move to the next card
exhibitionNextButton.addEventListener("click", function () {
  exhibitionCurrentIndex =
    (exhibitionCurrentIndex + 1) % exhibitionCards.length;
  updateExhibitionSlider();
});

// Handle the "previous" button click: move to the previous card
exhibitionPrevButton.addEventListener("click", function () {
  exhibitionCurrentIndex =
    (exhibitionCurrentIndex - 1 + exhibitionCards.length) %
    exhibitionCards.length;
  updateExhibitionSlider();
});

// Check screen size and enable slider only if window is 1020px wide or less
function checkExhibitionSlider() {
  if (window.innerWidth <= 1020) {
    enableExhibitionSlider(true);
  } else {
    enableExhibitionSlider(false);
  }
}

// Make the slider responsive by checking the window size on load and resize
window.addEventListener("resize", checkExhibitionSlider);
checkExhibitionSlider(); // Initial check on page load

// Special Events Slider

// Select main special events elements
const professorCard = document.querySelector(".professor-card");
const specialEventsCards = document.querySelector(".special-events-cards");
const specialEventsContent = document.querySelector(".special-events-content");
const newsCards = specialEventsCards.querySelectorAll(".news-card");

// Track if slider has been set up already to avoid repeating it
let specialSliderInitialized = false;

// Declare variable to store slider elements
let specialWrapper, specialNextButton, specialPrevButton;
let specialCurrentIndex = 0;

// Create navigation buttons and wrapper for special events slider
function createSpecialSliderElements() {
  // Create the wrapper and buttons only if they haven't been created yet
  specialWrapper = document.createElement("div");
  specialWrapper.className = "special-events-slider-wrapper";

  specialNextButton = document.createElement("button");
  specialPrevButton = document.createElement("button");

  specialNextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  specialPrevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

  specialNextButton.classList.add("slider-button", "slider-next");
  specialPrevButton.classList.add("slider-button", "slider-prev");
}

// Shows only the currently active card in the special events section (professor or news card)
function updateSpecialSlider() {
  const allCards = specialEventsCards.querySelectorAll(
    ".professor-card, .news-card"
  );
  allCards.forEach((card, idx) => {
    card.style.display = idx === specialCurrentIndex ? "block" : "none";
  });
}

// Enables or disables the special events slider based on screen size
function enableSpecialSlider(enable) {
  if (enable && !specialSliderInitialized) {
    // Move professorCard into the cards container so it can slide too
    specialEventsCards.insertBefore(
      professorCard,
      specialEventsCards.firstChild
    );

    // Create slider UI elements if they haven't been created yet
    createSpecialSliderElements();

    // Wrap content and insert buttons into the DOM
    specialEventsCards.parentNode.insertBefore(
      specialWrapper,
      specialEventsCards
    );
    specialWrapper.appendChild(specialPrevButton);
    specialWrapper.appendChild(specialEventsCards);
    specialWrapper.appendChild(specialNextButton);

    // Initialize index and show first card
    specialCurrentIndex = 0;
    updateSpecialSlider();
    specialNextButton.style.display = "block";
    specialPrevButton.style.display = "block";

    // Next button click handler
    specialNextButton.onclick = function () {
      const allCards = specialEventsCards.querySelectorAll(
        ".professor-card, .news-card"
      );
      specialCurrentIndex = (specialCurrentIndex + 1) % allCards.length;
      updateSpecialSlider();
    };

    // Previous button click handler
    specialPrevButton.onclick = function () {
      const allCards = specialEventsCards.querySelectorAll(
        ".professor-card, .news-card"
      );
      specialCurrentIndex =
        (specialCurrentIndex - 1 + allCards.length) % allCards.length;
      updateSpecialSlider();
    };

    specialSliderInitialized = true;
  } else if (!enable && specialSliderInitialized) {
    // Revert changes if screen is wider than 1020px

    // Move professorCard back to specialEventsContent
    specialEventsContent.appendChild(professorCard);

    // Remove wrapper but keep the card container in DOM
    specialWrapper.parentNode.insertBefore(specialEventsCards, specialWrapper);
    specialWrapper.remove();

    // Reset all cards to visible
    [professorCard, ...newsCards].forEach((card) => (card.style.display = ""));
    specialSliderInitialized = false;
  }
}

// Check screen size and enable special slider only if window is 1020px wide or less
function checkSpecialSlider() {
  if (window.innerWidth <= 1020) {
    enableSpecialSlider(true);
  } else {
    enableSpecialSlider(false);
  }
}

// Make the special slider responsive by checking the window size on load and resize
window.addEventListener("resize", checkSpecialSlider);
checkSpecialSlider(); // Initial check on page load
