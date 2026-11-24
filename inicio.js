// Crea los 4 anillos de cursores (8, 12, 16 y 20 cursores, cada uno con 2 estelas)
(function () {
  const boton = document.querySelector(".boton-vidrio");
  const orbita = boton.querySelector(".orbita");
  const icono = '<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>';
  const radios = [140, 180, 220, 260];
  const cantidades = [8, 12, 16, 20];
  const fragmento = document.createDocumentFragment();

  radios.forEach((radio, c) => {
    const n = cantidades[c];
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * 2 * Math.PI;
      const x = Math.cos(ang) * radio;
      const y = Math.sin(ang) * radio;
      const rot = Math.atan2(y, x) * 180 / Math.PI;
      for (let t = 0; t <= 2; t++) {
        const el = document.createElement("span");
        el.className = "cursor" + (t === 0 ? " principal" : "");
        el.style.setProperty("--x", x + "px");
        el.style.setProperty("--y", y + "px");
        el.style.setProperty("--rot", rot + "deg");
        el.style.setProperty("--d", (c * 0.01 + i * 0.002 + t * 0.008) * 1000 + "ms");
        el.style.setProperty("--op", 1 - t * 0.3);
        el.style.setProperty("--sc", 1 - t * 0.2);
        el.innerHTML = icono;
        fragmento.appendChild(el);
      }
    }
  });
  orbita.appendChild(fragmento);

  // En celular no hay hover: al tocar, se muestran los cursores un instante y luego pasa a la reserva
  const sinHover = matchMedia("(hover: none)").matches;
  const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  boton.addEventListener("click", (e) => {
    if (!sinHover || sinMovimiento) return;
    e.preventDefault();
    boton.classList.add("activo");
    setTimeout(() => { location.href = boton.href; }, 700);
  });
})();
