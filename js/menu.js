// This script closes the hamburger menu if the user clicks outside of it

document.addEventListener("click", function (event) {
  const menuCheckbox = document.getElementById("menu-checkbox");
  const menu = document.querySelector(".menu");

  // Only run if menu is open
  if (menuCheckbox && menuCheckbox.checked) {
    // If the click is inside the menu, navigation, hamburger icon, or the checkbox itself, do nothing
    if (menu.contains(event.target)) {
      return;
    }
    // Otherwise, close the menu
    menuCheckbox.checked = false;
  }
});
