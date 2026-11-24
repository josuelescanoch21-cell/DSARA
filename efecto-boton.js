// Efecto de clic para .boton-principal
// Lanza hebras de color hacia afuera, como los cursores del ejemplo de Figma, pero una sola vez
(function () {
  const colores = ["#5E3FA0", "#D9B26F", "#8C2F39", "#DCD5E6"];
  const cantidad = 12;
  const radioX = 170; // el botón es ancho, por eso la elipse
  const radioY = 70;

  function lanzar(boton) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < cantidad; i++) {
      const angulo = (i / cantidad) * Math.PI * 2;
      const dx = Math.cos(angulo) * radioX;
      const dy = Math.sin(angulo) * radioY;
      const giro = Math.atan2(dy, dx) * 180 / Math.PI + 90; // la hebra apunta hacia afuera
      const h = document.createElement("span");
      h.className = "hebra-chispa";
      h.style.setProperty("--dx", dx + "px");
      h.style.setProperty("--dy", dy + "px");
      h.style.setProperty("--giro", giro + "deg");
      h.style.setProperty("--color", colores[i % colores.length]);
      h.style.animationDelay = (i % 3) * 25 + "ms";
      h.addEventListener("animationend", () => h.remove());
      boton.appendChild(h);
    }
  }

  document.querySelectorAll(".boton-principal").forEach((b) =>
    b.addEventListener("click", () => lanzar(b))
  );
})();
