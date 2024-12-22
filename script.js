//toggle class active
const navbarNav = document.querySelector(".navbar-nav");
//ketika hamberger menu diklick
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
