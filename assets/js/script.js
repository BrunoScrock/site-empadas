/* ==========================================================================
   EMPADAS DO GAB - SCRIPT PRINCIPAL
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. UTILIDADES / WHATSAPP
   -------------------------------------------------------------------------- */
function montarLinkWhatsapp(mensagem) {
    return "https://api.whatsapp.com/send?phone=" + CONFIG.whatsapp +
           "&text=" + encodeURIComponent(mensagem);
}

function pedirProduto(nomeProduto) {
    const mensagem = CONFIG.mensagemPedido + nomeProduto + ".";
    window.open(montarLinkWhatsapp(mensagem), "_blank");
}

function abrirWhatsappPadrao() {
    window.open(montarLinkWhatsapp(CONFIG.mensagemPadrao), "_blank");
}

/* --------------------------------------------------------------------------
   2. PREENCHER INFORMAÇÕES DA EMPRESA
   -------------------------------------------------------------------------- */
function preencherConfig() {
    document.title = CONFIG.empresa + " | Empadas Artesanais";

    // Botões de WhatsApp
    const btnHeader = document.getElementById("btn-header-pedido");
    const btnHero = document.getElementById("btn-hero-whatsapp");
    const btnCta = document.getElementById("btn-cta-final");
    const btnFloat = document.getElementById("whatsapp-float");

    if (btnHeader) btnHeader.href = montarLinkWhatsapp(CONFIG.mensagemPadrao);
    if (btnHero) btnHero.href = montarLinkWhatsapp(CONFIG.mensagemPadrao);
    if (btnCta) btnCta.href = montarLinkWhatsapp(CONFIG.mensagemPadrao);
    if (btnFloat) btnFloat.href = montarLinkWhatsapp(CONFIG.mensagemPadrao);

    // Footer
    const footerWpp = document.getElementById("footer-whatsapp");
    if (footerWpp) footerWpp.href = montarLinkWhatsapp(CONFIG.mensagemPadrao);

    const footerInsta = document.getElementById("footer-instagram");
    const btnInsta = document.getElementById("btn-instagram");

    if (CONFIG.instagram) {
        if (btnInsta) btnInsta.href = CONFIG.instagram;
        if (footerInsta) footerInsta.href = CONFIG.instagram;
    } else {
        if (btnInsta) btnInsta.setAttribute("aria-disabled", "true");
        if (footerInsta) footerInsta.setAttribute("aria-disabled", "true");
    }

    const footerHorario = document.getElementById("footer-horario");
    if (footerHorario) footerHorario.textContent = CONFIG.horario || "Horário a definir";

    const footerCidade = document.getElementById("footer-cidade");
    if (footerCidade) footerCidade.textContent = CONFIG.cidade || "Cidade / Região a definir";

    const ano = document.getElementById("ano");
    if (ano) ano.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   3. CARDÁPIO DINÂMICO
   -------------------------------------------------------------------------- */
function obterCategoria(nome) {
    return CATEGORIAS.find(c => c.id === nome) || { id: nome, nome: nome };
}

function renderizarFiltros() {
    const barra = document.querySelector(".filter-bar");
    if (!barra) return;

    const botaoTodos = document.createElement("button");
    botaoTodos.className = "filter-btn active";
    botaoTodos.setAttribute("data-categoria", "todos");
    botaoTodos.setAttribute("aria-pressed", "true");
    botaoTodos.textContent = "Todos";
    botaoTodos.addEventListener("click", () => filtrarPorCategoria("todos"));
    barra.appendChild(botaoTodos);

    CATEGORIAS.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.setAttribute("data-categoria", cat.id);
        btn.setAttribute("aria-pressed", "false");
        btn.textContent = cat.nome;
        btn.addEventListener("click", () => filtrarPorCategoria(cat.id));
        barra.appendChild(btn);
    });
}

function renderizarCardapio() {
    const grid = document.getElementById("cardapio-grid");
    grid.innerHTML = "";

    produtos.forEach(produto => {
        const card = document.createElement("article");
        card.className = "produto-card";
        card.setAttribute("data-categoria", produto.categoria);

        const categoria = obterCategoria(produto.categoria);

        card.innerHTML =
            '<div class="produto-img">' +
                '<img src="' + produto.imagem + '" alt="' + produto.nome + '" loading="lazy">' +
                '<span class="produto-categoria">' + categoria.nome + '</span>' +
            '</div>' +
            '<div class="produto-info">' +
                '<h3>' + produto.nome + '</h3>' +
                '<p class="desc">' + produto.descricao + '</p>' +
                '<span class="produto-preco">' + produto.preco + '</span>' +
                '<button class="btn-pedir" aria-label="Pedir ' + produto.nome + ' pelo WhatsApp">' +
                    'Pedir pelo WhatsApp' +
                '</button>' +
            '</div>';

        const btnPedir = card.querySelector(".btn-pedir");
        btnPedir.addEventListener("click", () => pedirProduto(produto.nome));

        grid.appendChild(card);
    });
}

/* --------------------------------------------------------------------------
   4. FILTRO DE CATEGORIAS
   -------------------------------------------------------------------------- */
function filtrarPorCategoria(categoria) {
    const cards = document.querySelectorAll(".produto-card");
    cards.forEach(card => {
        const visivel = categoria === "todos" || card.getAttribute("data-categoria") === categoria;
        card.style.display = visivel ? "" : "none";
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
        const ativo = btn.getAttribute("data-categoria") === categoria;
        btn.classList.toggle("active", ativo);
        btn.setAttribute("aria-pressed", ativo ? "true" : "false");
    });
}

/* --------------------------------------------------------------------------
   5. GALERIA DINÂMICA
   -------------------------------------------------------------------------- */
function renderizarGaleria() {
    const grid = document.getElementById("galeria-grid");
    grid.innerHTML = "";

    galeria.forEach((src, index) => {
        const item = document.createElement("button");
        item.className = "galeria-item";
        item.type = "button";
        item.setAttribute("aria-label", "Ampliar foto " + (index + 1) + " da galeria");

        const img = document.createElement("img");
        img.src = src;
        img.alt = "Foto " + (index + 1) + " das Empadas do Gab";
        img.loading = "lazy";

        item.appendChild(img);
        item.addEventListener("click", () => abrirLightbox(src));

        grid.appendChild(item);
    });
}

/* --------------------------------------------------------------------------
   6. LIGHTBOX
   -------------------------------------------------------------------------- */
function abrirLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    img.src = src;
    img.alt = "Imagem ampliada das Empadas do Gab";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function fecharLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

/* --------------------------------------------------------------------------
   7. MENU MOBILE
   -------------------------------------------------------------------------- */
function initMenuMobile() {
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const aberto = navMenu.classList.contains("active");
        menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");

        const icon = menuBtn.querySelector("i");
        if (icon) {
            icon.setAttribute("data-lucide", aberto ? "x" : "menu");
            lucide.createIcons();
        }
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.setAttribute("data-lucide", "menu");
                lucide.createIcons();
            }
        });
    });
}

/* --------------------------------------------------------------------------
   8. INICIALIZAÇÃO
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    preencherConfig();
    renderizarFiltros();
    renderizarCardapio();
    renderizarGaleria();
    initMenuMobile();

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const btnFechar = document.querySelector(".lightbox-close");

    if (btnFechar) btnFechar.addEventListener("click", fecharLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) fecharLightbox();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
            fecharLightbox();
        }
    });
});