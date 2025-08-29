const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    // Toggle menu
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("active");
    });

    // Empêche la fermeture quand on clique sur le menu ou le toggle
    navLinks.addEventListener("click", (e) => e.stopPropagation());

    // Clic en dehors => ferme le menu
    document.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
}
