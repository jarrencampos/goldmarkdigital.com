document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     RANDOM TERMINAL NUMBERS
  ========================= */
  const logo = document.getElementById("logo");

  function randomNumbers() {
    if (!logo) return;
    logo.setAttribute(
      "data-numbers",
      Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0")
      ).join(" ")
    );
  }

  setInterval(randomNumbers, 700);
  randomNumbers();

  /* =========================
     CURSOR + INPUT
  ========================= */
  const input = document.querySelector(".input-wrapper input");
  const cursor = document.querySelector(".cursor");
  const mirror = document.querySelector(".text-mirror");
  const status = document.getElementById("terminalStatus");

  if (!input || !cursor || !mirror || !status) {
    console.error("Terminal elements missing");
    return;
  }

  function updateCursor() {
    mirror.textContent = input.value;
    cursor.style.left = mirror.offsetWidth + 2 + "px";
  }

  input.addEventListener("input", () => {
    updateCursor();
    // clear previous status
    status.textContent = "";
    status.className = "terminal-status";
  });
  input.addEventListener("focus", updateCursor);
  input.addEventListener("click", updateCursor);
  updateCursor();

  /* =========================
     TERMINAL STATUS HELPER
  ========================= */
  function showStatus(message, type = "") {
    status.textContent = `> ${message}`;
    status.className = "terminal-status " + type;
  }

  /* =========================
     EMAIL VALIDATION
  ========================= */
  function isValidEmail(email) {
    return email.includes("@") && email.includes(".com");
  }

  /* =========================
     FORM SUBMIT HANDLER
  ========================= */
  async function handleSubmit() {
    const email = input.value.trim();

    if (!isValidEmail(email)) {
      showStatus("ERROR: INVALID EMAIL FORMAT", "error");
      return;
    }

    showStatus("TRANSMITTING...", "");

    try {
      const res = await fetch("submit-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "email=" + encodeURIComponent(email)
      });

      if (res.ok) {
        input.value = "";
        showStatus("TRANSMISSION RECEIVED", "success");
      } else {
        showStatus("ERROR: SERVER FAILURE", "error");
      }
    } catch {
      showStatus("ERROR: CONNECTION FAILED", "error");
    }
    
    updateCursor();
  }

  // Submit on Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  });

  /* =========================
     TOP-RIGHT TAB SWITCHING
  ========================= */
  const tabs = document.querySelectorAll(".top-tabs .tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Reset input & cursor
      input.value = "";
      updateCursor();
      showStatus("", "");
    });
  });
      input.focus();

    updateCursor();
});
