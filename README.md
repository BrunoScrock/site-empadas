# Empadas do Gab 🇧🇷

Site profissional da marca **Empadas do Gab** — uma vitrine digital para divulgar a marca, apresentar o cardápio, mostrar fotos dos produtos e facilitar pedidos pelo WhatsApp.

## 1. Nome do Projeto

**Empadas do Gab**

## 2. Objetivo

Transformar o site em uma vitrine digital das Empadas do Gab. O visitante acessa pelo celular e, rapidamente:

1. Conhece a marca;
2. Vê os principais diferenciais;
3. Filtra e navega o cardápio;
4. Consulta sabores e valores;
5. Vê fotos reais das empadas;
6. Escolhe o produto;
7. Clica em **"Pedir pelo WhatsApp"**;
8. É direcionado ao WhatsApp com uma mensagem pronta.

## 3. Tecnologias

- HTML5
- CSS3 (variáveis CSS, grids, animações 3D)
- JavaScript puro (dinamismo sem frameworks)
- **Lucide Icons** (ícones via CDN)
- **Google Fonts** (Inter)
- SEO: `sitemap.xml`, `robots.txt`, `llms.txt`, Schema.org (JSON-LD)

Sem frameworks, backend ou banco de dados. Site 100% estático.

## 4. Estrutura de Pastas

```text
site-empadas/
│
├── index.html              → Página principal do site
├── sitemap.xml             → Mapa do site para buscadores
├── robots.txt              → Diretivas de rastreio
├── llms.txt                → Resumo do site para LLMs
├── README.md               → Documentação do projeto (este arquivo)
├── .gitignore              → Arquivos ignorados pelo Git
│
├── assets/
│   ├── css/
│   │   └── style.css       → Estilos visuais do site (Design System)
│   ├── js/
│   │   └── script.js       → Configurações + funcionalidades (arquivo único)
│   └── images/
│       ├── logo/           → Logo da marca (SVG + favicon)
│       ├── hero/           → Imagem principal da seção Hero
│       ├── produtos/       → Fotos de cada empada do cardápio
│       └── galeria/        → Fotos da galeria (coverflow + lightbox)
│
└── docs/
    └── estrutura-projeto.md → Documentação detalhada do projeto
```

> ✅ **Arquitetura minimalista**: os dados (WhatsApp, produtos, preços, galeria) ficam no topo do `assets/js/script.js`, num único ponto de edição. Não existe mais `config.js`.

## 5. Como Executar Localmente

Abra o `index.html` no navegador ou use um servidor local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (npx)
npx serve .
```

Depois acesse `http://localhost:8000`.

> 💡 Abrir direto pelo `file://` também funciona, pois o site é estático sem dependências de servidor.

## 6. Como Alterar os Dados da Empresa

Todos os dados ficam centralizados no arquivo:

```text
assets/js/script.js → EMPADAS_CONFIG
```

| Campo | O que altera |
|-------|--------------|
| `whatsapp` | Número do WhatsApp (somente dígitos, com DDI e DDD) |
| `telefone` | Telefone comercial de contato |
| `endereco` | Endereço completo exibido/copiado |
| `instagram` | Link do perfil do Instagram |
| `horario` | Horário de atendimento exibido na seção Contato |

## 7. Como Alterar o WhatsApp

No arquivo `assets/js/script.js` → objeto `EMPADAS_CONFIG`:

```javascript
whatsapp: "55XXXXXXXXXXX",
```

Use apenas números, no formato: `DDI + DDD + número`. Exemplo: `5541999999999`.

> O número fica centralizado em um único lugar. Todos os botões de **Pedir** usam essa configuração automaticamente.

## 8. Como Alterar Produtos

No arquivo `assets/js/script.js`, dentro do array `PRODUTOS`, cada item representa uma empada:

```javascript
{ categoria: "Tradicionais", nome: "Empada de Frango", descricao: "…", preco: "R$ 12,00", imagem: "assets/images/produtos/empada-frango.jpg" }
```

Para **adicionar** um produto, copie um bloco, altere os dados e cole dentro do array, mantendo a vírgula entre os itens.

Para **remover** um produto, apague o bloco correspondente.

> ⚠️ O campo `categoria` deve ser exatamente igual a um dos rótulos de `CATEGORIAS` (ex.: `"Tradicionais"`).

## 9. Como Alterar Preços

Cada produto possui um campo `preco`:

```javascript
preco: "R$ 12,00",
```

Ou, se preferir, use texto livre:

```javascript
preco: "Preço sob consulta",
```

A tabela de **Sabores e Valores** (seção escura) é controlada separadamente pelo array `VALORES`, em `assets/js/script.js`.

## 10. Como Adicionar Fotos

1. Coloque a imagem na pasta correta:

   - Empadas do cardápio → `assets/images/produtos/`
   - Imagem principal (Hero) → `assets/images/hero/`
   - Galeria → `assets/images/galeria/`

2. Em `assets/js/script.js`, aponte o `imagem` do produto (ou o caminho no array `GALERIA`) para o nome do arquivo.

> Use fotos em `JPG` ou `PNG`, otimizadas (máximo ~800px de largura é um bom padrão).

## 11. Como Adicionar Categorias

No arquivo `assets/js/script.js`:

```javascript
const CATEGORIAS = ["Todos", "Tradicionais", "Especiais", "Doces"];
```

Para adicionar uma categoria nova, insira o nome no array (ex.: `"Novidades"`) e use `categoria: "Novidades"` nos produtos.

> ⚠️ Os filtros do cardápio são gerados a partir do array `CATEGORIAS` automaticamente.

## 12. Como Alterar o Instagram

No arquivo `assets/js/script.js` → `EMPADAS_CONFIG`:

```javascript
instagram: "https://instagram.com/empadasdogab",
```

Todos os links de Instagram pelo site serão atualizados automaticamente. Enquanto estiver vazio, o link aponta para `#`.

## 13. Como Alterar a Logo

1. Substitua o arquivo `assets/images/logo/logo-empadas.svg` (usado também como favicon).
2. Se preferir PNG, atualize os caminhos em `index.html`.

> Enquanto a imagem oficial não estiver presente, um fallback (logo de emergência) é carregado automaticamente via JavaScript.

## 14. Como Publicar no GitHub Pages

1. Crie um repositório no [GitHub](https://github.com).
2. Envie os arquivos (comandos na seção de Git abaixo).
3. No repositório, acesse **Settings → Pages**.
4. Em **Source**, selecione `Deploy from a branch` → branch `main` → pasta `/root`.
5. Clique em **Save** e aguarde alguns segundos.

## 15. Comandos Git

```bash
git init
git add .
git commit -m "feat: criação inicial do site Empadas do Gab"
git branch -M main
git remote add origin URL_DO_REPOSITORIO
git push -u origin main
```

## 16. Hospedagem Gratuita Compatível

O projeto é um site estático e funciona em qualquer hospedagem que sirva arquivos estáticos:

- **GitHub Pages** (prioridade — instruções na seção 14);
- **Cloudflare Pages**;
- **Netlify**;
- **Vercel**.

## 17. Estrutura dos Dados (atalho rápido)

| O que | Onde alterar |
|-------|--------------|
| Nome/WhatsApp/Telefone/Endereço/Instagram/Horário | `assets/js/script.js` → `EMPADAS_CONFIG` |
| Produtos do cardápio | `assets/js/script.js` → `PRODUTOS` |
| Sabores e valores | `assets/js/script.js` → `VALORES` |
| Filtros/categorias | `assets/js/script.js` → `CATEGORIAS` |
| Fotos da galeria | `assets/js/script.js` → `GALERIA` |
| Textos das seções | `index.html` |

---

Feito com ❤️ para a **Empadas do Gab**.