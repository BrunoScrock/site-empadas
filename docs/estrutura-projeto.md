# Estrutura do Projeto — Empadas do Gab

Documentação técnica e funcional do site **Empadas do Gab** (design system **INOVE** aplicado à gastronomia).

## 1. Estrutura de Pastas

```text
site-empadas/
│
├── index.html
├── sitemap.xml
├── robots.txt
├── llms.txt
├── README.md
├── .gitignore
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       ├── logo/
│       ├── hero/
│       ├── produtos/
│       └── galeria/
│
└── docs/
    └── estrutura-projeto.md
```

## 2. Arquivos e Responsabilidades

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Estrutura semântica do site: header, hero, diferenciais, cardápio, sabores, sobre, galeria, contato, rodapé e botão flutuante |
| `assets/css/style.css` | Design system: variáveis de cor, tipografia, cards, coverflow 3D, lightbox, revelação ao rolar, responsividade |
| `assets/js/script.js` | Configurações centralizadas (1 arquivo) + todas as funcionalidades da página |
| `sitemap.xml` | Mapa do site para buscadores |
| `robots.txt` | Diretivas de rastreio (permite tudo + sitemap) |
| `llms.txt` | Resumo do site para modelos de linguagem (IA) |
| `README.md` | Guia geral do projeto e publicação |
| `.gitignore` | Arquivos/pastas ignoradas pelo Git |

## 3. Arquitetura JavaScript (arquivo único)

Todo o código fica em `assets/js/script.js`, dividido em blocos:

1. **Configurações** (`EMPADAS_CONFIG`) — dados da empresa;
2. **Dados de conteúdo** — `CATEGORIAS`, `PRODUTOS`, `VALORES`, `GALERIA`;
3. **Utilitários** — `buildWhatsAppUrl`, `MSG_PADRAO`;
4. **Renderizadores**: `renderCardapio`, `renderSabores`, `renderHorarios`, `montarCoverflow`;
5. **Interações**: `pedirProduto`, `setupWhatsAppLinks`, `setupMobileMenu`, `setupHeaderScroll`, `setupScrollAnimations`, `setupLogoFallback`;
6. **Inicialização** em `DOMContentLoaded`.

### 3.1 Empresa (EMPADAS_CONFIG)

```javascript
const EMPADAS_CONFIG = {
  nome: "Empadas do Gab",
  whatsapp: "55XXXXXXXXXXX",
  telefone: "COLOQUE O TELEFONE AQUI",
  endereco: "COLOQUE O ENDEREÇO AQUI",
  mapsLink: "",
  instagram: "",
  horario: { segunda: "…", /* … */ }
};
```

- `whatsapp` → apenas dígitos, formato `DDI + DDD + número`;
- `instagram` → URL completa; vazio mantém os links apontando para `#`;
- `horario` → usado pela seção Contato (dia de hoje destacado automaticamente).

### 3.2 Categorias (CATEGORIAS)

```javascript
const CATEGORIAS = ["Todos", "Tradicionais", "Especiais", "Doces"];
```

Os botões de filtro do cardápio são gerados a partir desta lista.

## 4. Cadastro de Produtos

Arquivo: `assets/js/script.js` → array `PRODUTOS`.

```javascript
{ categoria: "Tradicionais", nome: "Empada de Frango", descricao: "…", preco: "R$ 12,00", imagem: "assets/images/produtos/empada-frango.jpg" }
```

Regras:

- `categoria` → deve existir no array `CATEGORIAS`;
- `preco` → aceita texto livre ("R$ 12,00", "Preço sob consulta", etc.);
- `imagem` → caminho relativo a partir da raiz do projeto;
- os cards são gerados automaticamente, incluindo o botão **Pedir no WhatsApp** (mensagem: `Olá! Gostaria de pedir 1x {nome}.`).

## 5. Sabores e Valores

Arquivo: `assets/js/script.js` → array `VALORES`.

```javascript
{
  categoria: "Tradicionais",
  icon: "flame",
  itens: [ { nome: "Empada de Frango", valor: "R$ 12,00" } ]
}
```

Cada grupo vira um card escuro na seção **Sabores e Valores**.

## 6. Cadastro de Imagens

### Produtos

1. Salve a foto em `assets/images/produtos/`;
2. Atualize o campo `imagem` do produto.

### Hero

1. Salve a foto em `assets/images/hero/empadas-principal.jpg`;
2. O caminho está no `<img>` do Hero em `index.html`.

### Galeria

Arquivo: `assets/js/script.js` → array `GALERIA`.

```javascript
{ categoria: "Empadas", titulo: "Nossas Empadas", descricao: "…", imagem: "assets/images/galeria/foto-01.jpg" }
```

A galeria é renderizada como **coverflow 3D** com **lightbox**, navegação por teclado, swipe e autoplay.

### Logo

O arquivo `assets/images/logo/logo-empadas.svg` é usado no header, no rodapé e como favicon. Um fallback visual é aplicado automaticamente se o arquivo não carregar.

## 7. Configuração do WhatsApp

Número centralizado em `EMPADAS_CONFIG.whatsapp`. Todas as funcionalidades derivam da função:

```javascript
function buildWhatsAppUrl(mensagem) {
  return "https://api.whatsapp.com/send?phone=" + EMPADAS_CONFIG.whatsapp +
         "&text=" + encodeURIComponent(mensagem);
}
```

Ids conectados automaticamente:

| Id | Mensagem |
|----|----------|
| `btnHeaderWhatsApp` | "Olá! Gostaria de falar com a Empadas do Gab." |
| `btnHeroWhatsApp` | "Olá! Gostaria de fazer um pedido na Empadas do Gab." |
| `btnSaboresWhatsApp` | "Olá! Vi os sabores e valores no site…" |
| `btnContatoWhatsApp` | "Olá! Gostaria de pedir empadas…" |
| `whatsappFloat` | Mensagem padrão |
| `footerWhatsApp` | Mensagem padrão |

## 8. Configuração do Instagram

Preencha `EMPADAS_CONFIG.instagram`. Usado em:

- Card da seção Contato (`#btnInstagram`);
- Link do rodapé (`#footerInstagram`).

> O ícone do Instagram é um **SVG inline** (a versão atual do Lucide não inclui ícones de marcas).

## 9. Alteração de Textos

- **Produtos/sabores/descrições** → `assets/js/script.js`;
- **Títulos e textos das seções** → `index.html`;
- **Mensagens do WhatsApp** → `assets/js/script.js` (funções de mensagem);
- **Dados estruturados (JSON-LD)** → bloco em `index.html` (preencher telefone e endereço reais);
- **Horários** → `EMPADAS_CONFIG.horario`.

## 10. Paleta de Cores

| Cor | HEX | Uso |
|-----|-----|-----|
| Grafite escuro | `#111827` | fundos, header, rodapé (`--primary`) |
| Grafite claro | `#1f2937` | gradientes escuros |
| Terracota | `#c2410c` | cor de marca/botões (`--secondary`) |
| Terracota hover | `#9a3412` | hover dos botões de marca |
| Âmbar | `#f59e0b` | destaques acentos (`--accent`) |
| WhatsApp | `#22c55e` | botões e links do WhatsApp |

## 11. Comportamentos do JavaScript (`script.js`)

| Função | O que faz |
|--------|-----------|
| `buildWhatsAppUrl` | Monta a URL do WhatsApp com mensagem codificada |
| `renderCardapio` | Gera os cards do cardápio a partir de `PRODUTOS` |
| `setupCardapioFilters` / `filtrarCardapio` | Gera botões de filtro e mostra/esconde produtos |
| `renderSabores` | Gera os cards de Sabores e Valores a partir de `VALORES` |
| `montarCoverflow` | Renderiza galeria 3D, autoplay e lightbox (com teclado/swipe) |
| `renderHorarios` | Preenche os horários e destaca o dia atual |
| `pedirProduto` | Abre WhatsApp com "Olá! Gostaria de pedir 1x {produto}." |
| `setupWhatsAppLinks` | Conecta todos os botões de WhatsApp/Instagram/Mapas |
| `setupMobileMenu` | Controla o menu hambúrguer no mobile |
| `setupHeaderScroll` | Compacta o header após rolar a página |
| `setupScrollAnimations` | Revela seções ao rolar (IntersectionObserver) |
| `setupLogoFallback` | Troca a logo por fallback se a imagem falhar |

## 12. Publicação

### GitHub Pages

1. `git init`
2. `git add .`
3. `git commit -m "feat: criação inicial do site Empadas do Gab"`
4. `git branch -M main`
5. `git remote add origin URL_DO_REPOSITORIO`
6. `git push -u origin main`
7. GitHub → **Settings → Pages** → Source: `Deploy from a branch` → `main` → `/root` → **Save**

### Cloudflare / Netlify / Vercel

Basta arrastar a pasta do projeto (ou conectar o repositório). Por ser site estático, não exige configuração de build.

## 13. Testes Recomendados Antes de Publicar

- [ ] Menu hambúrguer abre e fecha no celular;
- [ ] Filtros do cardápio funcionam (incl. estado "Novidades em breve");
- [ ] Botões de pedido abrem o WhatsApp (após configurar o número);
- [ ] Coverflow navega por botões, dots, mouse, teclado e swipe;
- [ ] Lightbox abre/fecha e fecha com `Esc`;
- [ ] Nenhuma rolagem horizontal em 320px;
- [ ] Imagens carregam com `loading="lazy"` (fora do Hero);
- [ ] Sem erros no console do navegador.