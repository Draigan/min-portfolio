// Minimal PJAX-style navigation + header/footer includes
document.addEventListener("DOMContentLoaded", () => {
  //
  // 1. Load shared header and footer (via fetch includes)
  //
  ["header", "footer"].forEach(async (id) => {
    try {
      const el = document.getElementById(id);
      if (el) {
        const res = await fetch(id + ".html");
        if (res.ok) {
          el.innerHTML = await res.text();
        }
      }
    } catch (err) {
      console.error(`Failed to load ${id}.html`, err);
    }
  });

  //
  // 2. PJAX-style link handling
  //
  document.body.addEventListener("click", async (e) => {
    if (e.target.tagName === "A" && e.target.href.startsWith(location.origin)) {
      e.preventDefault();
      try {
        const res = await fetch(e.target.href);
        if (!res.ok) throw new Error("Failed to fetch " + e.target.href);

        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newMain = doc.querySelector("main");
        const currentMain = document.querySelector("main");

        if (newMain && currentMain) {
          currentMain.innerHTML = newMain.innerHTML;
          history.pushState({}, "", e.target.href);

          // Re-run header/footer fetch after navigation (optional)
          ["header", "footer"].forEach(async (id) => {
            try {
              const el = document.getElementById(id);
              if (el) {
                const res = await fetch(id + ".html");
                if (res.ok) {
                  el.innerHTML = await res.text();
                }
              }
            } catch (err) {
              console.error(`Failed to reload ${id}.html`, err);
            }
          });
        } else {
          location.href = e.target.href; // fallback
        }
      } catch (err) {
        console.error("Navigation error:", err);
        location.href = e.target.href; // fallback
      }
    }
  });
});

  function toggleTheme() {
    document.body.classList.toggle('dark');
  }
// Theme toggle (🌙 <-> 🌞)
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector(".theme-toggle");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "🌞"; // switch back to light
  } else {
    btn.textContent = "🌙"; // switch to dark
  }
}

// Hamburger toggle
function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("open");
}

