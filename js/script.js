// Pàgina de prova — script mínim, sense dependències.

(function () {
  "use strict";

  // Rellotge en viu
  const clockEl = document.getElementById("clock");
  function tick() {
    const now = new Date();
    clockEl.textContent = now.toLocaleString("ca-ES", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  }
  tick();
  setInterval(tick, 1000);

  // Comptador
  let count = 0;
  const countEl = document.getElementById("count");
  document.getElementById("btn-plus").addEventListener("click", () => {
    count += 1;
    countEl.textContent = count;
  });
  document.getElementById("btn-minus").addEventListener("click", () => {
    count -= 1;
    countEl.textContent = count;
  });

  // Informació de l'entorn (comprova que el JS s'executa al navegador de l'usuari)
  const info = [
    ["Idioma del navegador", navigator.language],
    ["Amplada de finestra", window.innerWidth + " px"],
    ["User agent", navigator.userAgent],
    ["URL actual", window.location.href],
  ];
  const list = document.getElementById("env-info");
  info.forEach(([label, value]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${label}:</strong> ${value}`;
    list.appendChild(li);
  });
})();
