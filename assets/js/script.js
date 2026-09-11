/* ==========================================================================
   EMPADAS DO GAB - Configurações Centralizadas
   ========================================================================== */

const EMPADAS_CONFIG = {
  nome: "Empadas do Gab",
  segmento: "Doceria & Salgados Artesanais",

  // ⚠️ ALTERE AQUI: número do WhatsApp da Empadas do Gab (somente números, com DDI + DDD)
  whatsapp: "55XXXXXXXXXXX",

  telefone: "COLOQUE O TELEFONE AQUI",
  endereco: "COLOQUE O ENDEREÇO AQUI",
  mapsLink: "", // URL do Google Maps (opcional)

  instagram: "", // Ex: "https://www.instagram.com/empadasdogab"

  horario: {
    segunda: "COLOQUE O HORÁRIO AQUI",
    terca: "COLOQUE O HORÁRIO AQUI",
    quarta: "COLOQUE O HORÁRIO AQUI",
    quinta: "COLOQUE O HORÁRIO AQUI",
    sexta: "COLOQUE O HORÁRIO AQUI",
    sabado: "COLOQUE O HORÁRIO AQUI",
    domingo: "COLOQUE O HORÁRIO AQUI"
  }
};

/* ==========================================================================
   CARDÁPIO - Categorias do filtro
   ========================================================================== */

const CATEGORIAS = ["Todos", "Tradicionais", "Especiais", "Doces"];

/* ==========================================================================
   PRODUTOS - Adicione ou remova sabores facilmente aqui
   ========================================================================== */

const PRODUTOS = [
  { categoria: "Tradicionais", nome: "Empada de Frango", descricao: "Frango desfiado e temperado com o capricho da casa.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-frango.jpg" },
  { categoria: "Tradicionais", nome: "Empada de Carne", descricao: "Carne moída suculenta com tempero artesanal.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-carne.jpg" },
  { categoria: "Tradicionais", nome: "Empada de Palmito", descricao: "Palmito selecionado em um recheio cremoso.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-palmito.jpg" },
  { categoria: "Tradicionais", nome: "Empada de Queijo", descricao: "Recheio generoso de queijo derretido.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-queijo.jpg" },
  { categoria: "Especiais", nome: "Empada de Frango com Catupiry", descricao: "A combinação clássica que não pode faltar.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-frango-catupiry.jpg" },
  { categoria: "Especiais", nome: "Empada de Carne Seca", descricao: "Carne seca desfiada com temperos especiais.", preco: "Preço sob consulta", imagem: "assets/images/produtos/empada-carne-seca.jpg" }
];

/* ==========================================================================
   SABORES E VALORES - Altere os valores aqui (use "R$ XX,XX" como placeholder)
   ========================================================================== */

const VALORES = [
  {
    categoria: "Tradicionais",
    icon: "flame",
    itens: [
      { nome: "Empada de Frango", valor: "R$ XX,XX" },
      { nome: "Empada de Carne", valor: "R$ XX,XX" },
      { nome: "Empada de Palmito", valor: "R$ XX,XX" },
      { nome: "Empada de Queijo", valor: "R$ XX,XX" }
    ]
  },
  {
    categoria: "Especiais",
    icon: "sparkles",
    itens: [
      { nome: "Empada de Frango com Catupiry", valor: "R$ XX,XX" },
      { nome: "Empada de Carne Seca", valor: "R$ XX,XX" }
    ]
  },
  {
    categoria: "Doces",
    icon: "cake",
    itens: [
      { nome: "Novidades em breve", valor: "" }
    ]
  }
];

/* ==========================================================================
   GALERIA - Fotos reais em assets/images/galeria/
   ========================================================================== */

const GALERIA = [
  { categoria: "Empadas", titulo: "Nossas Empadas", descricao: "Sabor e capricho em cada detalhe.", imagem: "assets/images/galeria/foto-01.jpg" },
  { categoria: "Empadas", titulo: "Recheio Generoso", descricao: "Feitas com ingredientes selecionados.", imagem: "assets/images/galeria/foto-02.jpg" },
  { categoria: "Empadas", titulo: "Massa na Medida", descricao: "Assadas no ponto certo, todos os dias.", imagem: "assets/images/galeria/foto-03.jpg" },
  { categoria: "Empadas", titulo: "Tempero Caseiro", descricao: "Receita que valoriza o sabor de verdade.", imagem: "assets/images/galeria/foto-04.jpg" },
  { categoria: "Empadas", titulo: "Sabor de Sempre", descricao: "O clássico que todo mundo ama.", imagem: "assets/images/galeria/foto-05.jpg" },
  { categoria: "Empadas", titulo: "Feitas com Amor", descricao: "Qualidade que você sente na primeira mordida.", imagem: "assets/images/galeria/foto-06.jpg" }
];

/* ==========================================================================
   UTILITÁRIOS DE WHATSAPP
   ========================================================================== */

function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${EMPADAS_CONFIG.whatsapp}&text=${encoded}`;
}

const MSG_PADRAO = "Olá! Vim pelo site da Empadas do Gab e gostaria de fazer um pedido.";

/* ==========================================================================
   RENDERIZAÇÃO DE CONTEÚDO
   ========================================================================== */

// Filtros do cardápio
function setupCardapioFilters() {
  const bar = document.getElementById("filterBar");
  if (!bar) return;

  bar.innerHTML = CATEGORIAS.map((cat, i) => `
    <button class="filter-btn${i === 0 ? " active" : ""}" data-filtro="${cat}">${cat}</button>
  `).join("");

  bar.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filtrarCardapio(btn.dataset.filtro);
    });
  });
}

function filtrarCardapio(categoria) {
  const cards = document.querySelectorAll("#cardapioGrid .produto-card");
  let visiveis = 0;

  cards.forEach(card => {
    const mostra = categoria === "Todos" || card.dataset.categoria === categoria;
    card.style.display = mostra ? "" : "none";
    if (mostra) visiveis++;
  });

  const vazio = document.getElementById("cardapioVazio");
  if (vazio) vazio.style.display = visiveis === 0 ? "flex" : "none";
}

// Cardápio
function renderCardapio() {
  const grid = document.getElementById("cardapioGrid");
  grid.innerHTML = PRODUTOS.map((p, i) => `
    <div class="produto-card" data-categoria="${p.categoria}">
      <div class="produto-img">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
        <span class="produto-tag">${p.categoria}</span>
      </div>
      <div class="produto-body">
        <h3>${p.nome}</h3>
        <p class="produto-desc">${p.descricao}</p>
        <span class="produto-preco">${p.preco}</span>
        <a href="#" class="btn-card" onclick="pedirProduto(${i}); return false;">
          Pedir no WhatsApp <i data-lucide="arrow-right"></i>
        </a>
      </div>
    </div>
  `).join("");
}

// Sabores e valores
function renderSabores() {
  const grid = document.getElementById("saboresGrid");
  grid.innerHTML = VALORES.map(categoria => `
    <div class="sabor-card">
      <div class="sabor-card-header">
        <i data-lucide="${categoria.icon}"></i>
        <h3>${categoria.categoria}</h3>
      </div>
      <ul class="sabor-list">
        ${categoria.itens.map(item => `
          <li class="sabor-valor">
            <span>${item.nome}</span>
            ${item.valor ? `<span class="sabor-enfeite">${item.valor}</span>` : '<span class="sabor-vazio">Em breve</span>'}
          </li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

// Galeria — coverflow 3D
function montarCoverflow() {
  const stage = document.getElementById("coverflow-stage");
  if (!stage) return;

  const ambBg = document.getElementById("coverflow-bg");
  const dotsContainer = document.getElementById("coverflow-dots");
  const btnPrev = document.getElementById("coverflow-prev");
  const btnNext = document.getElementById("coverflow-next");

  const itens = GALERIA || [];
  if (!itens.length) return;

  let indice = 0;
  let touchX = 0;
  let hoverLock = false;

  function pedidoDaGaleria(assunto) {
    const msg = `Olá! Vi "${assunto}" na galeria do site e gostaria de pedir.`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  }

  // Cria os cartões
  itens.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "coverflow-card";
    card.dataset.index = i;
    card.setAttribute("role", "tabpanel");

    const img = document.createElement("img");
    img.src = item.imagem;
    img.alt = item.titulo;
    img.loading = "lazy";
    img.draggable = false;
    card.appendChild(img);

    const vignette = document.createElement("div");
    vignette.className = "coverflow-vignette";
    card.appendChild(vignette);

    const content = document.createElement("div");
    content.className = "coverflow-content";
    content.innerHTML =
      '<span class="coverflow-tag">' + (item.categoria || "Empadas do Gab") + "</span>" +
      '<div class="coverflow-body">' +
      '<h3 class="coverflow-title">' + item.titulo + "</h3>" +
      (item.descricao ? '<p class="coverflow-desc">' + item.descricao + "</p>" : "") +
      '<button class="coverflow-cta"><i data-lucide="message-circle"></i> Pedir no WhatsApp</button>' +
      "</div>";
    card.appendChild(content);

    card.addEventListener("click", () => {
      abrirLightbox(i);
    });

    // Navega uma foto por vez ao passar o mouse (com trava para evitar o vaivém)
    card.addEventListener("mouseenter", () => {
      if (hoverLock) return;
      const d = indiceAtual(i);
      if (d === 1) {
        hoverLock = true;
        setTimeout(() => {
          hoverLock = false;
        }, 850);
        proximo();
      } else if (d === -1) {
        hoverLock = true;
        setTimeout(() => {
          hoverLock = false;
        }, 850);
        anterior();
      }
    });

    content.querySelector(".coverflow-cta").addEventListener("click", (e) => {
      e.stopPropagation();
      pedidoDaGaleria(item.categoria || item.titulo);
    });

    stage.appendChild(card);
  });

  const cards = Array.from(stage.children);

  // Dots de paginação
  itens.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "coverflow-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Ir para foto " + (i + 1));
    dot.addEventListener("click", () => irPara(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function indiceAtual(i) {
    let d = (i - indice + itens.length) % itens.length;
    if (d > itens.length / 2) d -= itens.length;
    return d;
  }

  function atualizar() {
    const cardW = cards[0].offsetWidth || 310;
    const deslocamento = (fator, sinal) => Math.round(fator * cardW) * sinal;

    cards.forEach((card, i) => {
      const d = indiceAtual(i);
      const sinal = d < 0 ? -1 : 1;
      const abs = Math.abs(d);
      let transformo = "";
      let opacidade = 0;
      let z = 1;
      let filtro = "brightness(0.4) blur(2px)";
      let centro = false;

      if (d === 0) {
        transformo = "none";
        opacidade = 1;
        z = 30;
        filtro = "none";
        centro = true;
      } else if (abs === 1) {
        transformo =
          "translateX(" + deslocamento(0.62, sinal) + "px) scale(0.84) rotateY(" + -24 * sinal + "deg)";
        opacidade = 0.6;
        z = 20;
        filtro = "brightness(0.75)";
      } else if (abs === 2) {
        transformo =
          "translateX(" + deslocamento(1.05, sinal) + "px) scale(0.68) rotateY(" + -38 * sinal + "deg)";
        opacidade = 0.35;
        z = 10;
        filtro = "brightness(0.55) blur(1px)";
      } else {
        transformo =
          "translateX(" + deslocamento(1.35, sinal) + "px) scale(0.55) rotateY(" + -45 * sinal + "deg)";
        opacidade = 0;
      }

      card.style.transform = transformo;
      card.style.opacity = opacidade;
      card.style.zIndex = z;
      card.style.filter = filtro;
      card.setAttribute("aria-hidden", centro ? "false" : "true");
      card.classList.toggle("is-center", centro);
    });

    if (ambBg) ambBg.src = itens[indice].imagem;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === indice);
      dot.setAttribute("aria-selected", i === indice ? "true" : "false");
    });
  }

  function proximo() {
    indice = (indice + 1) % itens.length;
    atualizar();
  }

  function anterior() {
    indice = (indice - 1 + itens.length) % itens.length;
    atualizar();
  }

  function irPara(i) {
    indice = (i + itens.length) % itens.length;
    atualizar();
  }

  btnPrev.addEventListener("click", anterior);
  btnNext.addEventListener("click", proximo);

  // --------------------------------------------------------------------------
  // LIGHTBOX — galeria de fotos (aberto ao clicar no cartão central)
  // --------------------------------------------------------------------------

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Galeria de fotos da Empadas do Gab");
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Fechar galeria"><i data-lucide="x"></i></button>' +
    '<div class="lightbox-counter"></div>' +
    '<button class="lightbox-arrow prev" aria-label="Foto anterior"><i data-lucide="chevron-left"></i></button>' +
    '<button class="lightbox-arrow next" aria-label="Próxima foto"><i data-lucide="chevron-right"></i></button>' +
    '<figure class="lightbox-figure">' +
    '<img class="lightbox-img" src="" alt="">' +
    "<figcaption>" +
    '<span class="coverflow-tag lightbox-tag"></span>' +
    '<h3 class="lightbox-title"></h3>' +
    '<button class="coverflow-cta lightbox-cta"><i data-lucide="message-circle"></i> Pedir no WhatsApp</button>' +
    "</figcaption>" +
    "</figure>" +
    '<div class="lightbox-thumbs"></div>';
  document.body.appendChild(overlay);

  let obraAtiva = 0;

  function atualizarLightbox() {
    const item = itens[obraAtiva];
    const imgEl = overlay.querySelector(".lightbox-img");
    const counter = overlay.querySelector(".lightbox-counter");
    const hasMulti = itens.length > 1;

    if (itens.length) {
      imgEl.src = item.imagem;
      imgEl.alt = item.titulo;
    }

    counter.textContent = hasMulti ? obraAtiva + 1 + " / " + itens.length : "";
    overlay.classList.toggle("has-single", !hasMulti);
    overlay.querySelector(".lightbox-tag").textContent = item.categoria || "Empadas do Gab";
    overlay.querySelector(".lightbox-title").textContent = item.titulo;
    overlay.querySelector(".lightbox-cta").onclick = () => pedidoDaGaleria(item.categoria || item.titulo);

    const thumbs = overlay.querySelector(".lightbox-thumbs");
    thumbs.innerHTML = "";
    itens.forEach((it, fi) => {
      const t = document.createElement("button");
      t.type = "button";
      t.className = "lightbox-thumb" + (fi === obraAtiva ? " active" : "");
      t.setAttribute("aria-label", "Ir para a foto " + (fi + 1));
      const ti = document.createElement("img");
      ti.src = it.imagem;
      ti.alt = "";
      ti.loading = "lazy";
      t.appendChild(ti);
      t.addEventListener("click", () => {
        obraAtiva = fi;
        atualizarLightbox();
      });
      thumbs.appendChild(t);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function fotoAnterior() {
    obraAtiva = (obraAtiva - 1 + itens.length) % itens.length;
    atualizarLightbox();
  }

  function fotoProxima() {
    obraAtiva = (obraAtiva + 1) % itens.length;
    atualizarLightbox();
  }

  function abrirLightbox(i) {
    obraAtiva = i;
    pararAutoplay();
    atualizarLightbox();
    overlay.classList.add("open");
    document.body.classList.add("no-scroll");
    if (window.lucide) window.lucide.createIcons();
  }

  function fecharLightbox() {
    overlay.classList.remove("open");
    document.body.classList.remove("no-scroll");
    iniciarAutoplay();
  }

  overlay.querySelector(".lightbox-close").addEventListener("click", fecharLightbox);
  overlay.querySelector(".lightbox-arrow.prev").addEventListener("click", (e) => {
    e.stopPropagation();
    fotoAnterior();
  });
  overlay.querySelector(".lightbox-arrow.next").addEventListener("click", (e) => {
    e.stopPropagation();
    fotoProxima();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) fecharLightbox();
  });

  let lightboxTouchX = 0;
  overlay.addEventListener("touchstart", (e) => {
    lightboxTouchX = e.touches[0].clientX;
  }, { passive: true });
  overlay.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - lightboxTouchX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) fotoProxima();
      else fotoAnterior();
    }
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") {
      fecharLightbox();
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      fotoAnterior();
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      fotoProxima();
      e.preventDefault();
    }
  });

  // Navegação por teclado (setas) quando o foco está na galeria
  stage.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("open")) return;
    if (e.key === "ArrowLeft") {
      anterior();
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      proximo();
      e.preventDefault();
    }
  });

  // Gestos de toque (swipe)
  stage.addEventListener("touchstart", (e) => {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) proximo();
      else anterior();
    }
  }, { passive: true });

  // Autoplay (pausa ao passar o mouse; desligado se o usuário prefere menos movimento)
  const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;

  function pararAutoplay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function iniciarAutoplay() {
    pararAutoplay();
    if (reduzirMovimento || itens.length <= 1) return;
    if (overlay.classList.contains("open")) return;
    timer = setInterval(proximo, 5000);
  }

  const cover = document.getElementById("coverflow");
  if (cover) {
    cover.addEventListener("mouseenter", pararAutoplay);
    cover.addEventListener("mouseleave", iniciarAutoplay);
    cover.addEventListener("focusin", pararAutoplay);
    cover.addEventListener("focusout", iniciarAutoplay);
  }

  atualizar();
  iniciarAutoplay();
  if (window.lucide) window.lucide.createIcons();
}

// Horários
function renderHorarios() {
  const list = document.getElementById("horariosList");
  const dias = [
    ["segunda", "Segunda-feira", 1],
    ["terca", "Terça-feira", 2],
    ["quarta", "Quarta-feira", 3],
    ["quinta", "Quinta-feira", 4],
    ["sexta", "Sexta-feira", 5],
    ["sabado", "Sábado", 6],
    ["domingo", "Domingo", 0]
  ];
  const hoje = new Date().getDay();
  list.innerHTML = dias.map(([key, label, jsDay]) => `
    <li class="horarios-item${jsDay === hoje ? " hoje" : ""}">
      <span class="horarios-day">${label}</span>
      <span class="horarios-hour">${EMPADAS_CONFIG.horario[key]}</span>
    </li>
  `).join("");
}

/* ==========================================================================
   LINKS DE WHATSAPP
   ========================================================================== */

function pedirProduto(indice) {
  const produto = PRODUTOS[indice];
  const msg = `Olá! Gostaria de pedir 1x ${produto.nome} (Empadas do Gab).`;
  window.open(buildWhatsAppUrl(msg), "_blank");
}

function setupWhatsAppLinks() {
  const links = [
    ["btnHeaderWhatsApp", "Olá! Gostaria de falar com a Empadas do Gab."],
    ["btnHeroWhatsApp", "Olá! Gostaria de fazer um pedido na Empadas do Gab."],
    ["btnSaboresWhatsApp", "Olá! Vi os sabores e valores no site e gostaria de confirmar meu pedido."],
    ["btnContatoWhatsApp", "Olá! Gostaria de pedir empadas da Empadas do Gab."],
    ["whatsappFloat", MSG_PADRAO],
    ["footerWhatsApp", MSG_PADRAO]
  ];

  links.forEach(([id, mensagem]) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = buildWhatsAppUrl(mensagem);
      el.target = "_blank";
    }
  });

  // Instagram
  const instaLinks = ["btnInstagram", "footerInstagram"];
  instaLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = EMPADAS_CONFIG.instagram || "#";
  });

  // Maps
  if (EMPADAS_CONFIG.mapsLink) {
    const mapLinks = ["btnMaps", "btnMapa"];
    mapLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.href = EMPADAS_CONFIG.mapsLink;
    });
  }
}

/* ==========================================================================
   COPIAR ENDEREÇO
   ========================================================================== */

function setupCopyEndereco() {
  const btn = document.getElementById("btnCopyEndereco");
  if (!btn) return;

  const icon = btn.querySelector("i");
  const label = btn.querySelector(".copy-label");

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(EMPADAS_CONFIG.endereco);
      btn.classList.add("copied");
      if (icon) icon.setAttribute("data-lucide", "check");
      if (label) label.textContent = "Endereço copiado!";
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => {
        btn.classList.remove("copied");
        if (icon) icon.setAttribute("data-lucide", "copy");
        if (label) label.textContent = "Copiar Endereço";
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    } catch (e) {
      // Clipboard indisponível — mantém o estado atual
    }
  });
}

/* ==========================================================================
   MENU MOBILE
   ========================================================================== */

function setupMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i") || menuBtn.querySelector("svg");
    const isOpen = navMenu.classList.contains("active");
    if (icon) icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
    menuBtn.setAttribute("aria-label", isOpen ? "Fechar Menu" : "Abrir Menu");
    lucide.createIcons();
  });

  document.querySelectorAll(".nav-menu a, .nav-menu .btn-header").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const icon = menuBtn.querySelector("i") || menuBtn.querySelector("svg");
      if (icon) {
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
      }
    });
  });
}

/* ==========================================================================
   HEADER SCROLL
   ========================================================================== */

function setupHeaderScroll() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   ANIMAÇÕES DE ENTRADA (REVEAL AO ROLAR)
   ========================================================================== */

function setupScrollAnimations() {
  const seletores = [
    ".section-title",
    ".filter-bar",
    ".pillars-grid > *",
    ".cardapio-grid > *",
    ".sabores-grid > *",
    ".prices-disclaimer",
    ".sobre-grid > *",
    ".sobre-features > *",
    ".coverflow",
    ".contato-grid > *",
    ".contato-cards > *",
    ".footer-content > *"
  ];

  const alvos = document.querySelectorAll(seletores.join(","));
  if (!alvos.length || !("IntersectionObserver" in window)) return;

  alvos.forEach((el) => {
    el.classList.add("reveal");
    // Atraso escalonado suave entre os itens da mesma linha
    const indice = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.transitionDelay = `${(indice % 6) * 0.08}s`;
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
          // Após o fim da entrada escalonada, zera o atraso para não
          // prejudicar os hovers (instantâneo).
          const atraso = parseFloat(entrada.target.style.transitionDelay || 0);
          setTimeout(() => {
            entrada.target.style.transitionDelay = "0s";
          }, atraso * 1000 + 750);
        }
      });
    },
    { threshold: 0.12 }
  );

  alvos.forEach((el) => observador.observe(el));
}

/* ==========================================================================
   FALLBACK DA LOGO (enquanto o arquivo oficial não for inserido)
   ========================================================================== */

function setupLogoFallback() {
  const fallbackSvg =
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#ffffff"/>
        <circle cx="32" cy="28" r="14" fill="#f59e0b"/>
        <path d="M32 18 a10 10 0 0 1 0 20 z" fill="#c2410c"/>
        <text x="32" y="52" font-family="Arial" font-size="9" font-weight="800" fill="#111827" text-anchor="middle">Empadas</text>
      </svg>`
    );

  document.querySelectorAll(".logo-img, .footer-logo").forEach(img => {
    img.addEventListener("error", () => {
      img.src = fallbackSvg;
    }, { once: true });
  });
}

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  renderCardapio();
  setupCardapioFilters();
  filtrarCardapio("Todos");
  renderSabores();
  renderHorarios();
  setupWhatsAppLinks();
  setupMobileMenu();
  montarCoverflow();
  setupHeaderScroll();
  setupScrollAnimations();
  setupLogoFallback();

  // Recria ícones após render dinâmico
  setTimeout(() => lucide.createIcons(), 50);
});