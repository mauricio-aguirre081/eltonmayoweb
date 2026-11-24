/* Galería: fotos, render y ventana modal (compartido por index.html y galeria.html).
   Para agregar una foto, sumá una línea a FOTOS. Las primeras 6 se ven en el inicio;
   desde la 7 en adelante aparecen en galeria.html. */
(function () {
  "use strict";
  var FOTOS = [
    { src: "./img/galeria/foto-01.jpg", desc: "Visita al CPI" },
    { src: "./img/galeria/foto-02.jpg", desc: "San Antonio de los Cobres" },
    { src: "./img/galeria/foto-03.jpg", desc: "Curso de Peluquería en Cachi" },
    { src: "./img/galeria/foto-04.jpg", desc: "Curso de Informática en Seclantas" },
    { src: "./img/galeria/foto-05.jpg", desc: "Expo Elton Mayo" },
    { src: "./img/galeria/foto-06.jpg", desc: "Entrega en San Antonio" },
    { src: "./img/galeria/foto-07.jpg", desc: "Entrega en San Antonio de los Cobres" },
    { src: "./img/galeria/foto-08.jpg", desc: "Entrega de Diplomas en Güemes" },
    { src: "./img/galeria/foto-09.jpg", desc: "Entrega de Diplomas en Seclantas" },
    { src: "./img/galeria/foto-10.jpg", desc: "Entrega de Diplomas en San Antonio de los Cobres" },
    { src: "./img/galeria/foto-11.jpg", desc: "Entrega de Diplomas en Payogasta" },
    { src: "./img/galeria/foto-12.jpg", desc: "Entrega de Diplomas en Güemes (2)" },
    { src: "./img/galeria/foto-13.jpg", desc: "Entrega de Diplomas en Cachi" },
    { src: "./img/galeria/foto-14.jpg", desc: "Diplomas en Cachi (3)" },
    { src: "./img/galeria/foto-15.jpg", desc: "Desfile del 9 de Julio (2019)" },
    { src: "./img/galeria/foto-16.jpg", desc: "Auxiliar de Maestra Jardinera en Seclantas" },
    { src: "./img/galeria/foto-17.jpg", desc: "Desfile en Cachi" },
    { src: "./img/galeria/foto-18.jpg", desc: "Abanderadas" },
    { src: "./img/galeria/foto-19.jpg", desc: "Auxiliar de Maestra Jardinera en Cachi (2)" },
    { src: "./img/galeria/foto-20.jpg", desc: "Entrega de Diplomas en Chicoana (agosto 2022)" },
    { src: "./img/galeria/foto-21.jpg", desc: "Stand informativo de la Fundación en la plaza (octubre 2022)" },
    { src: "./img/galeria/foto-22.jpg", desc: "Jornada de capacitación (noviembre 2022)" },
    { src: "./img/galeria/foto-23.jpg", desc: "Práctica de bartender (noviembre 2022)" },
    { src: "./img/galeria/foto-24.jpg", desc: "Clase presencial (febrero 2023)" },
    { src: "./img/galeria/foto-25.jpg", desc: "Alumnas en clase (mayo 2023)" },
    { src: "./img/galeria/foto-26.jpg", desc: "Clase con proyector (junio 2023)" },
    { src: "./img/galeria/foto-27.jpg", desc: "Egresadas con sus certificados" },
    { src: "./img/galeria/foto-28.jpg", desc: "Capacitación con gran convocatoria" },
    { src: "./img/galeria/foto-29.jpg", desc: "Capacitación con gran convocatoria (2)" },
    { src: "./img/galeria/foto-30.jpg", desc: "Egresados de Fundación Elton Mayo Salta (diciembre 2021)" },
    { src: "./img/galeria/foto-31.jpg", desc: "Taller presencial" },
    { src: "./img/galeria/foto-32.jpg", desc: "¡Felicidades egresados! (agosto 2023)" },
    { src: "./img/galeria/foto-33.jpg", desc: "Acto de entrega de diplomas" },
    { src: "./img/galeria/foto-34.jpg", desc: "Diplomas listos para entregar (agosto 2023)" },
    { src: "./img/galeria/foto-35.jpg", desc: "Egresados con sus diplomas" },
    { src: "./img/galeria/foto-36.jpg", desc: "Acto de colación (agosto 2023)" }
  ];
  var EN_INICIO = 6;

  function render(box, list, reveal) {
    list.forEach(function (f, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "gallery__item" + (reveal ? " photo-in" : "");
      b.setAttribute("aria-label", "Ampliar foto: " + f.desc);
      if (reveal) b.style.transitionDelay = (i % 3) * 0.12 + "s";
      var img = document.createElement("img");
      img.src = f.src; img.alt = f.desc; img.loading = "lazy";
      b.appendChild(img); box.appendChild(b);
    });
  }

  // Inicio: primeras 6 fotos
  var home = document.getElementById("gallery");
  if (home) render(home, FOTOS.slice(0, EN_INICIO), false);
  var more = document.getElementById("galleryMore");
  if (more && FOTOS.length <= EN_INICIO) more.hidden = true;

  // galeria.html: continuación, aparecen al hacer scroll
  var full = document.getElementById("galleryFull");
  if (full) {
    render(full, FOTOS.slice(EN_INICIO), true);
    var items = full.querySelectorAll(".photo-in");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  // Ventana modal
  var lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Foto ampliada");
  lb.innerHTML =
    '<button class="lightbox__close" type="button" data-lb="close" aria-label="Cerrar">×</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" data-lb="prev" aria-label="Foto anterior">‹</button>' +
    '<figure><img alt="" /><figcaption></figcaption><p class="lightbox__count"></p></figure>' +
    '<button class="lightbox__nav lightbox__nav--next" type="button" data-lb="next" aria-label="Foto siguiente">›</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var lbCount = lb.querySelector(".lightbox__count");
  var photos = [], cur = 0;

  function show(n) {
    cur = (n + photos.length) % photos.length;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    lbImg.src = photos[cur].src; lbImg.alt = photos[cur].alt;
    lbCap.textContent = photos[cur].alt;
    lbCount.textContent = (cur + 1) + " / " + photos.length;
  }
  document.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery__item");
    if (!item) return;
    var grid = item.parentElement;
    photos = Array.prototype.slice.call(grid.querySelectorAll(".gallery__item img"));
    show(photos.indexOf(item.querySelector("img")));
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  });
  function closeLb() {
    if (lb.close) lb.close(); else { lb.removeAttribute("open"); document.body.style.overflow = ""; }
  }
  lb.addEventListener("close", function () { document.body.style.overflow = ""; });
  lb.addEventListener("click", function (e) {
    var act = e.target.closest("[data-lb]");
    if (act) {
      var a = act.dataset.lb;
      if (a === "close") closeLb(); else show(cur + (a === "next" ? 1 : -1));
    } else if (e.target === lb || e.target.tagName === "FIGURE") closeLb();
  });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") show(cur + 1);
    else if (e.key === "ArrowLeft") show(cur - 1);
  });
})();
