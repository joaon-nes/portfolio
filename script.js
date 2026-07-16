document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const revealItems = document.querySelectorAll(".reveal");
  const trackedSections = [...document.querySelectorAll("main section[id]")];
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
    navigation.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const currentId = visible.target.id;
      navLinks.forEach((link) => {
        const targetId = link.getAttribute("href").replace("#", "");
        link.classList.toggle("active", targetId === currentId);
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: [0.05, 0.2, 0.5]
    }
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
});
