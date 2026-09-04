# Estrutura do Projeto — Empadas do Gab

Documentação técnica e funcional da primeira versão do site **Empadas do Gab**.

## 1. Estrutura de Pastas

```text
empadas-do-gab/
│
├── index.html
├── README.md
├── .gitignore
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js
│   │   └── script.js
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── produtos/
│   │   └── galeria/
│   └── icons/
│
└── docs/
    └── estrutura-projeto.md
```

## 2. Arquivos e Responsabilidades

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Estrutura semântica do site: header, hero, destaques, cardápio, sabores, galeria, sobre, Instagram, CTA, rodapé, botão flutuante e lightbox |
| `assets/css/style.css` | Toda a identidade visual: cores, tipografia, cards, responsividade, animações |
| `assets/js/config.js` | Configurações da empresa (`CONFIG`), produtos, categorias e galeria — ponto único de edição |
| `assets/js/script.js` | Funcionalidades: WhatsApp, cardápio dinâmico, filtros, galeria dinâmica, lightbox e menu mobile |
| `README.md` | Guia geral do projeto e publicação |
| `.gitignore` | Arquivos/pastas ignoradas pelo Git |

## 3. Configurações

### 3.1 Empresa (CONFIG)

Arquivo: `assets/js/config.js`

```javascript
const CONFIG = {
    empresa: "Empadas do Gab",
    whatsapp: "55XXXXXXXXXXX",
    cidade: "",
    instagram: "",
    horario: "",
    mensagemPadrao: "Olá! Gostaria de fazer um pedido.",
    mensagemPedido: "Olá! Gostaria de pedir 1 "
};
```

- `whatsapp` → apenas dígitos, formato `DDI + DDD + número`;
- `instagram` → URL completa (ex: `https://instagram.com/empadasdogab`);
- se `instagram` estiver vazio, os links aparecem desabilitados.

### 3.2 Categorias (CATEGORIAS)

```javascript
const CATEGORIAS = [
    { id: "tradicionais", nome: "Tradicionais" },
    { id: "especiais", nome: "Especiais" },
    { id: "doces", nome: "Doces" }
];
```

Os botões de filtro são gerados a partir desta lista.

## 4. Cadastro de Produtos

Arquivo: `assets/js/config.js` → array `produtos`.

```javascript
{
    id: 1,
    nome: "Empada de Frango",
    categoria: "tradicionais",
    descricao: "Descrição do produto",
    preco: "R$ 0,00",
    imagem: "assets/images/produtos/empada-frango.jpg"
}
```

Para **adicionar**: copie um bloco, ajuste os campos e mantenha a vírgula entre os itens.
Para **remover**: apague o bloco inteiro do produto.

Regras:

- `id` → número único;
- `categoria` → deve existir no array `CATEGORIAS`;
- `preco` → aceita texto livre ("R$ 12,00", "Preço sob consulta", etc.);
- `imagem` → caminho relativo a partir da raiz do projeto.

## 5. Cadastro de Imagens

### Produtos

1. Salve a foto em `assets/images/produtos/`;
2. Atualize o campo `imagem` do produto.

### Hero

1. Salve a foto em `assets/images/hero/empadas-principal.jpg`;
2. Mantenha o caminho no `<img>` do Hero em `index.html`.

> Nesta primeira versão há placeholders SVG no lugar das fotos reais. Basta substituir pelos arquivos `.jpg`/`.png` com o mesmo nome (ou atualizar os caminhos no código).

### Galeria

Arquivo: `assets/js/config.js` → array `galeria`.

```javascript
const galeria = [
    "assets/images/galeria/foto-01.jpg",
    // ...
];
```

Adicione ou remova caminhos. A galeria é gerada automaticamente com lightbox incluído.

## 6. Configuração do WhatsApp

Número centralizado em `CONFIG.whatsapp`. Todas as funcionalidades derivam da função:

```javascript
function montarLinkWhatsapp(mensagem) {
    return "https://api.whatsapp.com/send?phone=" + CONFIG.whatsapp +
           "&text=" + encodeURIComponent(mensagem);
}
```

Mensagens:

- Padrão: `CONFIG.mensagemPadrao` → "Olá! Gostaria de fazer um pedido."
- Por produto: `CONFIG.mensagemPedido + nomeProduto + "."`

## 7. Configuração do Instagram

Preencha `CONFIG.instagram`. Dois lugares usam essa configuração:

- Botão da seção "Siga as Empadas do Gab" (`#btn-instagram`);
- Link do rodapé (`#footer-instagram`).

Se estiver vazio, os links ficam com `aria-disabled`.

## 8. Alteração de Preços

Edite o campo `preco` de cada produto em `assets/js/config.js`.

## 9. Alteração de Textos

- **Cardápio, descrições de produtos** → `assets/js/config.js` (`descricao`);
- **Títulos e textos das seções** → `index.html`;
- **Mensagens do WhatsApp** → `assets/js/config.js` (`mensagemPadrao` / `mensagemPedido`);
- **História da marca** → busca pelo placeholder `[INSERIR AQUI A HISTÓRIA DA EMPADAS DO GAB]` no `index.html`.

## 10. Paleta de Cores

| Cor | HEX | Uso |
|-----|-----|-----|
| Marrom escuro | `#4A2C20` | fundos, header, rodapé |
| Creme | `#FFF8ED` | fundos de seções |
| Dourado | `#D99A3D` | destaques e ícones |
| Terracota | `#C96A4A` | preços dos produtos |
| Verde suave | `#657153` | detalhes |
| Texto | `#33251F` | textos principais |

## 11. Comportamentos do JavaScript (`script.js`)

| Função | O que faz |
|--------|-----------|
| `montarLinkWhatsapp` | Monta a URL do WhatsApp com mensagem codificada |
| `pedirProduto` | Abre WhatsApp com "Olá! Gostaria de pedir 1 {produto}." |
| `abrirWhatsappPadrao` | Abre WhatsApp com a mensagem padrão |
| `preencherConfig` | Aplica dados do `CONFIG` em todo o site (título, links, rodapé, ano) |
| `renderizarFiltros` | Gera os botões de filtro a partir de `CATEGORIAS` |
| `renderizarCardapio` | Gera os cards do cardápio a partir de `produtos` |
| `filtrarPorCategoria` | Mostra/esconde produtos conforme o filtro selecionado |
| `renderizarGaleria` | Gera a grade de fotos a partir do array `galeria` |
| `abrirLightbox` / `fecharLightbox` | Controla a visualização ampliada de fotos |
| `initMenuMobile` | Controla o menu hambúrguer no mobile |

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
- [ ] Filtros do cardápio funcionam;
- [ ] Botões de pedido abrem o WhatsApp (após configurar o número);
- [ ] Lightbox abre/fecha e fecha com `Esc`;
- [ ] Nenhuma rolagem horizontal em 320px;
- [ ] Imagens carregam com `loading="lazy"` (fora do Hero);
- [ ] Sem erros no console do navegador.