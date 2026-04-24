document.addEventListener("includesLoaded", () => {
  if (window.location.hash) {
    const el = document.querySelector(window.location.hash);
    if (el) {
      // small delay helps layout settle before scroll
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }
});