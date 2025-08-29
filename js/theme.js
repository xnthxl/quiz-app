document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-theme", themeToggle.checked);
        localStorage.setItem("theme", themeToggle.checked ? "light" : "dark");
    });
});

function moveThemeToggle() {
    const themeToggleContainer = document.querySelector(".theme-toggle-container");
    const navLinks = document.querySelector(".nav-links");
    const siteHeader = document.querySelector(".site-header");

    if (window.innerWidth <= 768) {
        // Mobile : déplacer dans le menu si ce n'est pas déjà fait
        if (!navLinks.contains(themeToggleContainer)) {
            navLinks.appendChild(themeToggleContainer);
        }
    } else {
        // Desktop : remettre dans le header si ce n'est pas déjà fait
        if (!siteHeader.contains(themeToggleContainer)) {
            siteHeader.appendChild(themeToggleContainer);
        }
    }
}
document.addEventListener("DOMContentLoaded", moveThemeToggle);
window.addEventListener("resize", moveThemeToggle);
