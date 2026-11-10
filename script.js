(function () {
  "use strict";
  var WA = "5493874521350";
  var EMAIL = "info@eltonmayo.org";

  var COURSES = {
    nuevos: { tag: "Nuevo 2026", img: "img/presencial.jpg", list: [
      "Operador Polivalente de Litio y Logística Minera",
      "Operador e Instalador de Sistemas Fotovoltaicos",
      "Auxiliar en Seguridad e Higiene Laboral",
      "Introducción a SAP y Asistente de Capital Humano"
    ]},
    presenciales: { tag: "Presencial", img: "img/egresados.jpg", list: [
      "Secretariado Administrativo Contable",
      "Asistente en Liquidación de Sueldos y Selección de Personal",
      "Asistente Contable Impositivo",
      "Operador Minero",
      "Administrativo Especializado en Empresa Minera",
      "Logística Minera"
    ]},
    distancia: { tag: "A distancia · 3 meses", img: "img/distancia.jpg", list: [
      "Agente Financiero", "Asesor Inmobiliario", "Asistente Ceremonial y Protocolo",
      "Asistente de Marketing", "Asistente en Recursos Humanos", "Ayudantía Pre-Escolar",
      "Cajero Bancario y Comercial", "Gestión de Ventas", "Gestión Previsional",
      "Guía de Desarrollo de Formulación de Proyectos", "Operador de Agencia de Viajes",
      "Organizador de Eventos", "Recepcionista de Hoteles", "Secretariado Jurídico",
      "Secretariado Médico"
    ]}
  };
  var IMGS = ["img/presencial.jpg", "img/distancia.jpg", "img/virtual.jpg", "img/egresados.jpg", "img/alumnos.jpg"];

  function waLink(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }

  // Nav
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open"); toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // Active link
  var links = menu.querySelectorAll('a[href^="#"]');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("section[id]").forEach(function (s) { spy.observe(s); });

  // Reveal
  var rev = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); rev.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { rev.observe(el); });

  // Courses
  var box = document.getElementById("courses");
  function render(key) {
    var g = COURSES[key];
    box.innerHTML = "";
    g.list.forEach(function (name, i) {
      var art = document.createElement("article");
      art.className = "course";
      art.style.animationDelay = (i * 0.06) + "s";
      var img = document.createElement("img");
      img.src = key === "distancia" ? IMGS[i % IMGS.length] : g.img;
      img.alt = ""; img.loading = "lazy";
      var body = document.createElement("div"); body.className = "course__body";
      var tag = document.createElement("span"); tag.className = "course__tag"; tag.textContent = g.tag;
      var h = document.createElement("h3"); h.textContent = name;
      var a = document.createElement("a"); a.href = waLink("Hola, quiero información sobre el curso: " + name);
      a.target = "_blank"; a.rel = "noopener"; a.textContent = "Consultar →";
      body.append(tag, h, a); art.append(img, body); box.appendChild(art);
    });
  }
  document.querySelectorAll(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("is-active"); });
      t.classList.add("is-active"); render(t.dataset.tab);
    });
  });
  render("nuevos");

  // Course select
  var sel = document.getElementById("f-course");
  Object.keys(COURSES).forEach(function (k) {
    var og = document.createElement("optgroup"); og.label = COURSES[k].tag;
    COURSES[k].list.forEach(function (n) { var o = document.createElement("option"); o.value = n; o.textContent = n; og.appendChild(o); });
    sel.appendChild(og);
  });

  // Counters
  var cnt = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = +el.dataset.count, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1600, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step); cnt.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(function (el) { cnt.observe(el); });

  // Slider
  var track = document.getElementById("track");
  var slides = track.children.length, idx = 0, timer;
  var dots = document.getElementById("dots");
  for (var i = 0; i < slides; i++) {
    (function (n) {
      var b = document.createElement("button"); b.setAttribute("aria-label", "Testimonio " + (n + 1));
      b.addEventListener("click", function () { go(n); }); dots.appendChild(b);
    })(i);
  }
  function go(n) {
    idx = (n + slides) % slides;
    track.style.transform = "translateX(-" + idx * 100 + "%)";
    Array.prototype.forEach.call(dots.children, function (d, j) { d.classList.toggle("on", j === idx); });
    clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000);
  }
  document.getElementById("prev").addEventListener("click", function () { go(idx - 1); });
  document.getElementById("next").addEventListener("click", function () { go(idx + 1); });
  go(0);

  // Form
  var form = document.getElementById("form");
  var via = "wa";
  form.querySelectorAll("button[type=submit]").forEach(function (b) {
    b.addEventListener("click", function () { via = b.dataset.via; });
  });
  function setErr(name, msg) {
    var f = form.elements[name].closest(".field");
    f.classList.toggle("err", !!msg); f.querySelector("small").textContent = msg || "";
    return !msg;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = {
      name: form.name.value.trim(), email: form.email.value.trim(),
      tel: form.tel.value.trim(), course: form.course.value, msg: form.msg.value.trim()
    };
    var ok = true;
    ok = setErr("name", d.name.length < 3 ? "Ingresá tu nombre completo." : "") && ok;
    ok = setErr("email", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) ? "Ingresá un email válido." : "") && ok;
    ok = setErr("tel", !/^[+\d\s()-]{7,20}$/.test(d.tel) ? "Ingresá un teléfono válido." : "") && ok;
    ok = setErr("course", !d.course ? "Elegí un curso." : "") && ok;
    ok = setErr("msg", d.msg.length > 1000 ? "Máximo 1000 caracteres." : "") && ok;
    if (!ok) return;
    var text = "Hola, soy " + d.name + ".\nCurso de interés: " + d.course +
      "\nEmail: " + d.email + "\nTeléfono: " + d.tel + (d.msg ? "\n\n" + d.msg : "");
    if (via === "mail") {
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Consulta: " + d.course) + "&body=" + encodeURIComponent(text);
    } else {
      window.open(waLink(text), "_blank", "noopener");
    }
    document.getElementById("formOk").hidden = false;
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
