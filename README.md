# Empadas do Gab 🇧🇷

Site profissional da marca **Empadas do Gab** — uma vitrine digital para divulgar a marca, apresentar o cardápio, mostrar fotos dos produtos e facilitar pedidos pelo WhatsApp.

## 1. Nome do Projeto

**Empadas do Gab**

## 2. Objetivo

Transformar o site em uma vitrine digital das Empadas do Gab. O visitante acessa pelo celular e, rapidamente:

1. Conhece a marca;
2. Vê os principais produtos;
3. Acessa o cardápio;
4. Vê fotos reais das empadas;
5. Identifica os sabores;
6. Consulta os preços;
7. Escolhe o produto;
8. Clica em **"Pedir pelo WhatsApp"**;
9. É direcionado ao WhatsApp com uma mensagem pronta.

## 3. Tecnologias

- HTML5
- CSS3
- JavaScript puro
- **Lucide Icons** (ícones)
- **Google Fonts** (Playfair Display + Inter)

Sem frameworks, backend ou banco de dados. Site 100% estático.

## 4. Estrutura de Pastas

```text
empadas-do-gab/
│
├── index.html              → Página principal do site
├── README.md               → Documentação do projeto (este arquivo)
├── .gitignore              → Arquivos ignorados pelo Git
│
├── assets/
│   ├── css/
│   │   └── style.css       → Estilos visuais do site
│   ├── js/
│   │   ├── config.js       → Configurações e dados (WhatsApp, preços, produtos)
│   │   └── script.js       → Funcionalidades (menu, filtros, galeria, lightbox)
│   ├── images/
│   │   ├── logo/           → Logos da marca
│   │   ├── hero/           → Imagem principal da seção Hero
│   │   ├── produtos/       → Fotos de cada empada do cardápio
│   │   └── galeria/        → Fotos da galeria
│   └── icons/              → Ícones locais (se necessário)
│
└── docs/
    └── estrutura-projeto.md → Documentação detalhada do projeto
```

### Finalidade de cada pasta

| Pasta | Finalidade |
|-------|------------|
| `assets/css/` | Arquivos de estilo (CSS) do site |
| `assets/js/` | Scripts JavaScript: configurações e funcionalidades |
| `assets/images/logo/` | Logotipos e variações da marca |
| `assets/images/hero/` | Foto principal exibida no banner (Hero) |
| `assets/images/produtos/` | Fotos individuais de cada empada do cardápio |
| `assets/images/galeria/` | Fotos extras da galeria (produção, embalagens, etc.) |
| `assets/icons/` | Ícones locais, caso deseje não depender de CDN |
| `docs/` | Documentação complementar |

## 5. Como Executar Localmente

Basta abrir o arquivo `index.html` no navegador:

1. Dê dois cliques no arquivo `index.html`; **ou**
2. Use um servidor local simples (recomendado):

   ```bash
   # Com Python
   python -m http.server 8000

   # Com Node.js (npx)
   npx serve .
   ```

   Depois acesse `http://localhost:8000` no navegador.

> 💡 **Dica:** ao abrir direto pelo `file://`, os arquivos funcionam normalmente por ser um site estático sem dependências de servidor.

## 6. Como Alterar os Dados da Empresa

Todos os dados ficam centralizados no arquivo:

```text
assets/js/config.js
```

| Campo | O que altera |
|-------|--------------|
| `empresa` | Nome da marca exibida no título da página |
| `whatsapp` | Número do WhatsApp (somente dígitos, com DDI e DDD) |
| `cidade` | Cidade/região exibida no rodapé |
| `instagram` | Link do perfil do Instagram |
| `horario` | Horário de atendimento exibido no rodapé |

## 7. Como Alterar o WhatsApp

No arquivo `assets/js/config.js`, altere o campo:

```javascript
whatsapp: "55XXXXXXXXXXX",
```

Use apenas números, no formato: `DDI + DDD + número`. Exemplo: `5541999999999`.

> O número fica centralizado em um único lugar. Os botões de "Pedir" usam essa configuração automaticamente.

## 8. Como Alterar Produtos

No arquivo `assets/js/config.js`, dentro do array `produtos`, cada item representa uma empada:

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

Para **adicionar** um produto, copie um bloco, altere os dados e cole dentro do array (mantendo vírgula entre os itens). O cardápio é gerado automaticamente.

Para **remover** um produto, apague o bloco correspondente.

## 9. Como Alterar Preços

Cada produto possui um campo `preco`. Basta alterar:

```javascript
preco: "R$ 12,00",
```

Ou, se preferir, use texto livreso como:

```javascript
preco: "Preço sob consulta",
```

## 10. Como Adicionar Fotos

1. Coloque a imagem dentro da pasta correta:

   - Empadas do cardápio → `assets/images/produtos/`
   - Imagem principal (Hero) → `assets/images/hero/`
   - Galeria → `assets/images/galeria/`

2. Em `assets/js/config.js`, aponte o `imagem` do produto (ou adicione o caminho no array `galeria`) para o nome do arquivo.

> Use fotos em `JPG` ou `PNG`, otimizadas (máximo ~800px de largura é um bom padrão).

## 11. Como Adicionar Categorias

No arquivo `assets/js/config.js`, dentro do array `CATEGORIAS`:

```javascript
const CATEGORIAS = [
    { id: "tradicionais", nome: "Tradicionais" },
    { id: "especiais", nome: "Especiais" },
    { id: "doces", nome: "Doces" }
];
```

Para adicionar uma categoria nova:

```javascript
{ id: "novas", nome: "Novidades" }
```

Depois, nos produtos, use `categoria: "novas"`.

> ⚠️ Os filtros do cardápio são gerados a partir do array `CATEGORIAS` automaticamente.

## 12. Como Alterar o Instagram

No arquivo `assets/js/config.js`:

```javascript
instagram: "",
```

Preencha com a URL completa do perfil, por exemplo:

```javascript
instagram: "https://instagram.com/empadasdogab",
```

Todos os links de Instagram pelo site serão atualizados automaticamente.

## 13. Como Publicar no GitHub Pages

1. Crie um repositório no [GitHub](https://github.com).
2. Envie os arquivos (comandos na seção de Git abaixo).
3. No repositório, acesse **Settings → Pages**.
4. Em **Source**, selecione `Deploy from a branch` → branch `main` → pasta `/root`.
5. Clique em **Save**.
6. Aguarde alguns segundos e acesse o link gerado (ex: `https://SEU_USUARIO.github.io/empadas-do-gab/`).

## 14. Comandos Git

```bash
# Inicializa o repositório Git na pasta
git init

# Adiciona todos os arquivos à área de staged
git add .

# Cria o primeiro commit do projeto
git commit -m "feat: criação inicial do site Empadas do Gab"

# Renomeia a branch principal para "main"
git branch -M main

# Adiciona o repositório remoto (troque pela URL do seu repositório)
git remote add origin URL_DO_REPOSITORIO

# Envia os arquivos para o GitHub
git push -u origin main
```

### O que cada comando faz

| Comando | Função |
|---------|--------|
| `git init` | Inicia o repositório Git na pasta atual |
| `git add .` | Prepara (stagia) todos os arquivos para o commit |
| `git commit -m "..."` | Salva uma versão (snapshot) dos arquivos com uma mensagem |
| `git branch -M main` | Renomeia a branch atual para `main` |
| `git remote add origin URL` | Associa o repositório local ao repositório do GitHub |
| `git push -u origin main` | Envia os arquivos para o GitHub pela primeira vez |

## 15. Hospedagem Gratuita Compatível

O projeto é um site estático e funciona em qualquer hospedagem que sirva arquivos estáticos:

- **GitHub Pages** (prioridade — instruções na seção 13);
- **Cloudflare Pages** — arraste a pasta do projeto ou conecte o repositório;
- **Netlify** — arraste a pasta do projeto em `app.netlify.com/drop`;
- **Vercel** — importe o repositório, o framework é detectado como "Outro".

## 16. Evolução Futura (próximas etapas)

Funcionalidades **não** implementadas nesta versão, mas preparadas para o futuro:

- Carrinho de compras;
- Sistema/formulário de pedidos;
- Controle de estoque;
- Área administrativa e login;
- Cadastro de produtos/preços via painel;
- Banco de dados;
- Pagamento online / PIX;
- Integração com delivery;
- Cupons, avaliações e programa de fidelidade.

## 17. Estrutura dos Dados (atalho rápido)

| O que | Onde alterar |
|-------|--------------|
| Nome/WhatsApp/Instagram/Cidade/Horário | `assets/js/config.js` → `CONFIG` |
| Sabores do cardápio | `assets/js/config.js` → `produtos` |
| Filtros/categorias | `assets/js/config.js` → `CATEGORIAS` |
| Fotos da galeria | `assets/js/config.js` → `galeria` |
| Textos do site | `index.html` |

---

Feito com ❤️ para a **Empadas do Gab**.