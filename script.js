document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("[data-nav]");
    const navButtons = document.querySelectorAll(".nav__item-btn");
    const cards = document.querySelectorAll(".holo-card");
    const themeToggleBtn = document.getElementById("theme-toggle");

    const themes = ['sunset', 'sunrise', 'light', 'dark'];
    let currentThemeIndex = 0;
    
    themeToggleBtn.addEventListener("click", () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        document.documentElement.setAttribute("data-theme", themes[currentThemeIndex]);
    });

    navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            navButtons.forEach(b => b.removeAttribute("aria-describedby"));
            btn.setAttribute("aria-describedby", "current");

            const index = btn.getAttribute("data-index");
            
            nav.classList.remove('nav--tilt1', 'nav--tilt2', 'nav--tilt3', 'nav--tilt4', 'nav--tilt5', 'nav--tilt6');
            void nav.offsetWidth; 
            nav.classList.add(`nav--tilt${index}`);

            const targetId = btn.getAttribute("data-target");
            cards.forEach(card => {
                card.id === targetId ? card.classList.add("active") : card.classList.remove("active");
            });
        });
    });

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            if (!card.classList.contains("active")) return;
            const rect = card.getBoundingClientRect();
            const ratioX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const ratioY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            card.style.setProperty("--ratio-x", ratioX);
            card.style.setProperty("--ratio-y", ratioY);
        });
        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--ratio-x", 0);
            card.style.setProperty("--ratio-y", 0);
        });
    });
});