document.addEventListener("DOMContentLoaded", async () => {

  // Find the right container based on page type
  const frontContainer = document.querySelector("#card-container.front-page");
  const bioContainer = document.querySelector("#card-container.bio-page");

  const container = frontContainer || bioContainer;
  if (!container) return;

  const isBioPage = !!bioContainer;

  try {
    // Fetch JSON data
    const res = await fetch("data/employees.json");
    if (!res.ok) throw new Error("Failed to fetch employee data");
    const data = await res.json();

    const employees = data.employees || data;

    container.innerHTML = "";

    for (const emp of employees) {
      const card = document.createElement("div");
      card.classList.add("card");

      // Create a clean ID for linking
      const empId =
        emp.id ||
        emp.name
          .toLowerCase()
          .replace(/['".]/g, "")
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "");
      card.id = empId;

      // Short or full bio
      const bioPath = isBioPage ? emp.bio_full : emp.bio_short;

      let bioContent = "<p>Bio unavailable.</p>";
      if (bioPath) {
        try {
          const bioRes = await fetch(bioPath);
          bioContent = bioRes.ok ? await bioRes.text() : bioContent;
        } catch (err) {
          console.error(`Error loading bio for ${emp.name}:`, err);
        }
      }

      // Card layout
      card.innerHTML = `
        <div class="card-layout">
          <div class="photo">
            <img src="${emp.photo}" alt="${emp.name} Photo">
          </div>

          <div class="employee-name-container">
            <h3 class="employee-name">${emp.name}</h3>
            <p class="employee-title">${emp.title}</p>
          </div>

          <ul class="employee-contact">
            <li><i class="fa-solid fa-envelope"></i> <a href="/">${emp.email}</a></li>
            <li><i class="fa-solid fa-phone"></i> <a href="/">${emp.phone_display}</a></li>
            <li><i class="fa-solid fa-user"></i> <a href="/" rel="noopener">LinkedIn</a></li>
          </ul>

          <div class="bio">
            ${bioContent}
          </div>
        </div>
      `;

      // Add “Read More” on the front page as anchor link to correct employee
      if (!isBioPage && empId) {
        const bioDiv = card.querySelector(".bio");
        const readMore = document.createElement("div");
        readMore.classList.add("read-more-container");
        readMore.innerHTML = `<a href="team.html#${empId}">Full Bio</a>`;
        bioDiv.appendChild(readMore);
      }

      container.appendChild(card);

      // Wait for the image to load to keep layout stable
      const img = card.querySelector("img");
      if (img && !img.complete) {
        await new Promise(res => img.addEventListener("load", res));
      }
    }

    // Scroll to the linked employee card on bio page
    if (isBioPage && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

  } catch (err) {
    console.error("Error loading employee data:", err);
    container.innerHTML = "<p style='color:red;'>Error loading employee cards.</p>";
  }
});
