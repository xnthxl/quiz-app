function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    // Appliquer le thème enregistré
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.checked = true;
    }

    // Ajouter l'écouteur
    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-theme", themeToggle.checked);
        localStorage.setItem("theme", themeToggle.checked ? "light" : "dark");
    });
}

function moveThemeToggle() {
    const themeToggleContainer = document.querySelector(".theme-toggle-container");
    const navLinks = document.querySelector(".nav-links");
    const siteHeader = document.querySelector(".site-header");

    if (window.innerWidth <= 768) {
        if (!navLinks.contains(themeToggleContainer)) {
            navLinks.appendChild(themeToggleContainer);
        }
    } else {
        if (!siteHeader.contains(themeToggleContainer)) {
            siteHeader.appendChild(themeToggleContainer);
        }
    }

    // Re-attacher le toggle après déplacement
    setupThemeToggle();
}

document.addEventListener("DOMContentLoaded", moveThemeToggle);
window.addEventListener("resize", moveThemeToggle);
