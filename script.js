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
  // Foto de cada curso (img/cursos/). Si un curso no tiene foto, usa la de su grupo.
  var COURSE_IMG = {
    "Operador Polivalente de Litio y Logística Minera": "operador-polivalente-litio",
    "Operador e Instalador de Sistemas Fotovoltaicos": "op-instalador-fotovoltaicos",
    "Auxiliar en Seguridad e Higiene Laboral": "aux-seguridad-higiene-laboral",
    "Introducción a SAP y Asistente de Capital Humano": "sap-capital-humano",
    "Secretariado Administrativo Contable": "sec-administrativo-contable",
    "Asistente en Liquidación de Sueldos y Selección de Personal": "liq-sueldos-personal",
    "Asistente Contable Impositivo": "asist-contable-impositivo",
    "Operador Minero": "operador-minero",
    "Administrativo Especializado en Empresa Minera": "admin-especial-empresa-minera",
    "Logística Minera": "logistica-minera",
    "Agente Financiero": "agente-financiero",
    "Asesor Inmobiliario": "asesor-inmobiliario",
    "Asistente Ceremonial y Protocolo": "asist-ceremonial-protocolo",
    "Asistente de Marketing": "asistente-marketing",
    "Asistente en Recursos Humanos": "asistente-recursos-humanos",
    "Ayudantía Pre-Escolar": "ayudantia-preescolar",
    "Cajero Bancario y Comercial": "cajero-bancario-comercial",
    "Gestión de Ventas": "gestion-de-ventas",
    "Gestión Previsional": "gestion-previsional",
    "Guía de Desarrollo de Formulación de Proyectos": "guia-formulacion-proyectos",
    "Operador de Agencia de Viajes": "operador-agencia-viajes",
    "Organizador de Eventos": "organizacion-eventos",
    "Recepcionista de Hoteles": "recepcionista-hoteles",
    "Secretariado Jurídico": "secretariado-juridico",
    "Secretariado Médico": "secretariado-medico"
  };

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
      img.src = COURSE_IMG[name] ? "img/cursos/" + COURSE_IMG[name] + ".jpg" : g.img;
      img.alt = name; img.loading = "lazy";
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

  // Próximos cursos. Fecha en formato AAAA-MM-DD; se ordenan solos por fecha.
  // Cuando la fecha de inicio ya pasó, la tarjeta se marca como "Ya comenzó".
  var PROXIMOS = [
    { start: "2026-11-06", name: "Operador Minero", img: "operador-minero",
      mode: "Presencial", place: "San Antonio de los Cobres, Salta",
      info: "Mercado Artesanal de la Municipalidad de San Antonio de los Cobres. Capacitación práctica y certificación para tu CV." },
    { start: "2026-11-06", name: "Operador Polivalente de Litio", img: "operador-litio",
      mode: "Presencial", place: "San Antonio de los Cobres, Salta",
      info: "Laboratorio, soporte y logística minera. Mercado Artesanal de la Municipalidad de San Antonio de los Cobres." },
    { start: "2026-11-16", name: "Operador Pañolero Especializado en Logística Minera", img: "panolero-logistica",
      mode: "Online con docente", place: "Desde tu lugar",
      info: "Preparación específica, actualizada y profesional para introducirte en la actividad minera." },
    { start: "2026-11-16", name: "Operador Polivalente de Litio", img: "operador-litio",
      mode: "Online con docente", place: "Desde tu lugar",
      info: "Preparación específica, actualizada y profesional para introducirte en la actividad minera." },
    { start: "2026-11-16", name: "Operador e Instalador de Sistemas de Generación Fotovoltaica", img: "fotovoltaica",
      mode: "Online con docente", place: "Desde tu lugar", wa: "5493874033304",
      info: "12 clases intensivas con el Ing. Guillermo Ledesma: electricidad solar, componentes, tipos de instalaciones, seguridad y normativa." },
    { start: "2026-12-10", name: "Operador de Plantas y Procesamientos Mineros", img: "plantas-procesamiento",
      mode: "Presencial", place: "Güemes, Salta", gift: true,
      info: "Formate hoy para un futuro mejor en la actividad minera." },
    { start: "2026-12-10", name: "Manipulación de Sustancias Peligrosas en Actividad Minera", img: "sustancias-peligrosas",
      mode: "Presencial", place: "Güemes, Salta", gift: true,
      info: "Formate hoy para un futuro mejor en la actividad minera." },
    { start: "2026-12-10", name: "Asistente de Hotelería y Sistemas de Reservas", img: "hoteleria",
      mode: "Online con docente", place: "Todo el país", gift: true,
      info: "Capacitación especialmente diseñada para trabajar en el sector turístico." },
    { start: "2026-12-11", name: "Operador Rigger y Señalador", img: "rigger-senalador",
      mode: "Presencial", place: "Ledesma, Jujuy y localidades vecinas", gift: true,
      info: "Nuevas oportunidades de formación para seguir creciendo profesionalmente." },
    { start: "2026-12-11", name: "Operador Polivalente de Litio", img: "operador-litio",
      mode: "Presencial", place: "Ledesma, Jujuy y localidades vecinas", gift: true,
      info: "Litio, soporte y logística. Nuevas oportunidades para seguir creciendo profesionalmente." }
  ];
  var MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  var MESES_L = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var upBox = document.getElementById("upcoming");
  if (upBox) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    PROXIMOS.map(function (c) {
      var p = c.start.split("-");
      return { c: c, d: new Date(+p[0], +p[1] - 1, +p[2]) };
    }).sort(function (a, b) {
      var pa = a.d < today, pb = b.d < today;           // los que ya empezaron van al final
      return pa !== pb ? (pa ? 1 : -1) : a.d - b.d;
    }).forEach(function (o, i) {
      var c = o.c, d = o.d, started = d < today;
      var art = document.createElement("article");
      art.className = "up" + (started ? " up--started" : "");
      art.style.animationDelay = (i * 0.06) + "s";
      var media = document.createElement("div"); media.className = "up__media";
      var img = document.createElement("img");
      img.src = "img/proximos/" + c.img + ".svg"; img.alt = ""; img.loading = "lazy";
      var date = document.createElement("div"); date.className = "up__date";
      var dd = document.createElement("strong"); dd.textContent = String(d.getDate()).padStart(2, "0");
      var mm = document.createElement("span"); mm.textContent = MESES[d.getMonth()];
      date.append(dd, mm); media.append(img, date);
      if (started || c.gift) {
        var flag = document.createElement("span");
        flag.className = "up__flag" + (started ? " up__flag--started" : "");
        flag.textContent = started ? "Ya comenzó" : "🎁 Curso de regalo a los 10 primeros";
        media.appendChild(flag);
      }
      var body = document.createElement("div"); body.className = "up__body";
      var tag = document.createElement("span");
      tag.className = "course__tag" + (/online/i.test(c.mode) ? " course__tag--online" : "");
      tag.textContent = c.mode;
      var h = document.createElement("h3"); h.textContent = c.name;
      var when = document.createElement("p"); when.className = "up__meta";
      when.textContent = "📅 Inicio: " + d.getDate() + " de " + MESES_L[d.getMonth()] + " de " + d.getFullYear();
      var where = document.createElement("p"); where.className = "up__meta";
      where.textContent = "📍 " + c.place;
      var info = document.createElement("p"); info.textContent = c.info;
      var a = document.createElement("a");
      a.className = "btn btn--sm " + (started ? "btn--outline" : "btn--gold");
      a.target = "_blank"; a.rel = "noopener";
      a.href = "https://wa.me/" + (c.wa || WA) + "?text=" + encodeURIComponent(
        (started ? "Hola, quiero saber la próxima fecha del curso: " : "Hola, quiero reservar un lugar en: ") +
        c.name + " (" + c.mode + " · " + c.place + ")");
      a.textContent = started ? "Consultar próxima fecha" : "Reservar lugar";
      body.append(tag, h, when, where, info, a);
      art.append(media, body); upBox.appendChild(art);
    });
  }

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
