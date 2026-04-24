document.addEventListener("DOMContentLoaded", async () => {
  const includes = document.querySelectorAll("[data-include]");
  const loadPromises = [];

  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    const promise = fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then((html) => {
        el.outerHTML = html; // Replace the element with the loaded content
      })
      .catch((err) => {
        console.error(err);
        el.outerHTML = `<div style="color:red;">Error loading ${file}</div>`;
      });

    loadPromises.push(promise);
  });

  // Wait until includes have finished loading
  await Promise.all(loadPromises);

  // Announce includes are done
  document.dispatchEvent(new Event("includesLoaded"));
});