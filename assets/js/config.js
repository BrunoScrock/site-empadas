/* ==========================================================================
   CONFIGURAÇÃO CENTRALIZADA DA EMPADAS DO GAB
   Altere aqui todas as informações da empresa.
   ========================================================================== */
const CONFIG = {
    empresa: "Empadas do Gab",
    // Número do WhatsApp apenas com DDI + DDD + número (somente dígitos)
    whatsapp: "55XXXXXXXXXXX",
    cidade: "",
    instagram: "",
    horario: "",
    mensagemPadrao: "Olá! Gostaria de fazer um pedido.",
    mensagemPedido: "Olá! Gostaria de pedir 1 "
};

/* ==========================================================================
   PRODUTOS DO CARDÁPIO
   Para adicionar um novo sabor, basta copiar um bloco e alterar os dados.
   Categorias disponíveis: tradicionais, especiais, doces
   ========================================================================== */
const CATEGORIAS = [
    { id: "tradicionais", nome: "Tradicionais" },
    { id: "especiais", nome: "Especiais" },
    { id: "doces", nome: "Doces" }
];

const produtos = [
    {
        id: 1,
        nome: "Empada de Frango",
        categoria: "tradicionais",
        descricao: "Empada de frango artesanal. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-frango.jpg"
    },
    {
        id: 2,
        nome: "Empada de Carne",
        categoria: "tradicionais",
        descricao: "Empada de carne artesanal. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-carne.jpg"
    },
    {
        id: 3,
        nome: "Empada de Palmito",
        categoria: "tradicionais",
        descricao: "Empada de palmito artesanal. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-palmito.jpg"
    },
    {
        id: 4,
        nome: "Empada de Queijo",
        categoria: "tradicionais",
        descricao: "Empada de queijo artesanal. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-queijo.jpg"
    },
    {
        id: 5,
        nome: "Empada de Frango com Catupiry",
        categoria: "especiais",
        descricao: "Empada de frango com catupiry. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-frango-catupiry.jpg"
    },
    {
        id: 6,
        nome: "Empada de Carne Seca",
        categoria: "especiais",
        descricao: "Empada de carne seca. Descrição do produto.",
        preco: "Preço sob consulta",
        imagem: "assets/images/produtos/empada-carne-seca.jpg"
    }
];

/* ==========================================================================
   GALERIA DE IMAGENS
   Adicione aqui os caminhos das fotos da galeria.
   ========================================================================== */
const galeria = [
    "assets/images/galeria/foto-01.jpg",
    "assets/images/galeria/foto-02.jpg",
    "assets/images/galeria/foto-03.jpg",
    "assets/images/galeria/foto-04.jpg",
    "assets/images/galeria/foto-05.jpg",
    "assets/images/galeria/foto-06.jpg"
];
