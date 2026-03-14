/**
 * VendaSync - Back-end em Node.js
 * Funcionalidades: POO, Terminal Interativo, Persistência em JSON e Async/Await.
 */

const fs = require('fs');
const readline = require('readline');

// --- 1. Programação Orientada a Objetos (Tarefa 2a) ---

class Produto {
    constructor(nome, preco, categoria) {
        this.nome = nome;
        this.preco = this.validarPreco(preco);
        this.categoria = categoria;
    }

    // Método de validação (Tarefa 2b)
    validarPreco(valor) {
        if (valor <= 0) throw new Error("O preço deve ser maior que zero.");
        return valor;
    }

    // Exemplo de polimorfismo: método que pode ser sobrescrito
    exibirDetalhes() {
        return `[${this.categoria}] ${this.nome} - R$ ${this.preco.toFixed(2)}`;
    }
}

// Herança: Produto com frete (Tarefa 2a)
class ProdutoFisico extends Produto {
    constructor(nome, preco, categoria, peso) {
        super(nome, preco, categoria);
        this.peso = peso;
    }

    // Polimorfismo: alterando o cálculo para produtos físicos
    exibirDetalhes() {
        return `${super.exibirDetalhes()} (Peso: ${this.peso}kg)`;
    }
}

class Pedido {
    constructor(clienteCep) {
        this.clienteCep = clienteCep;
        this.produtos = [];
        this.data = new Date().toISOString();
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    calcularTotal(desconto = 0) {
        const subtotal = this.produtos.reduce((acc, p) => acc + p.preco, 0);
        return subtotal * (1 - desconto / 100);
    }
}

// --- 2. Operações Assíncronas e API de CEP (Tarefa 2c) ---

async function buscarEndereco(cep) {
    console.log(`\nBuscando endereço para o CEP: ${cep}...`);
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (!response.ok) throw new Error("CEP não encontrado.");
        const data = await response.json();
        return `${data.street}, ${data.neighborhood} - ${data.city}/${data.state}`;
    } catch (error) {
        return "Endereço não localizado.";
    }
}

// --- 3. Manipulação de Dados e Terminal (Tarefa 1b) ---

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bancoDados = 'produtos.json';
let catalogo = [];

// Carregar dados existentes
if (fs.existsSync(bancoDados)) {
    const raw = fs.readFileSync(bancoDados);
    catalogo = JSON.parse(raw);
}

function menu() {
    console.log("\n=== VendaSync Terminal ===");
    console.log("1. Cadastrar Produto");
    console.log("2. Listar Produtos");
    console.log("3. Média de Preços");
    console.log("4. Simular Pedido (JSON + CEP)");
    console.log("5. Sair");
    rl.question("\nEscolha uma opção: ", handleMenu);
}

async function handleMenu(opcao) {
    switch (opcao) {
        case '1':
            rl.question("Nome: ", nome => {
                rl.question("Preço: ", preco => {
                    rl.question("Categoria: ", categoria => {
                        try {
                            const p = new Produto(nome, parseFloat(preco), categoria);
                            catalogo.push(p);
                            fs.writeFileSync(bancoDados, JSON.stringify(catalogo, null, 2));
                            console.log("✅ Produto salvo no banco JSON!");
                        } catch (e) { console.log("❌ Erro:", e.message); }
                        menu();
                    });
                });
            });
            break;
        case '2':
            console.log("\n--- Catálogo Atual ---");
            catalogo.forEach((p, i) => console.log(`${i+1}. ${p.nome} - R$ ${p.preco}`));
            menu();
            break;
        case '3':
            const media = catalogo.reduce((acc, p) => acc + p.preco, 0) / catalogo.length;
            console.log(`\nA média de preços no catálogo é: R$ ${media.toFixed(2)}`);
            menu();
            break;
        case '4':
            rl.question("Digite o CEP para entrega: ", async (cep) => {
                const endereco = await buscarEndereco(cep);
                const novoPedido = new Pedido(cep);
                novoPedido.endereco = endereco;
                
                // Adiciona o primeiro produto do catálogo como exemplo
                if(catalogo.length > 0) novoPedido.adicionarProduto(catalogo[0]);
                
                fs.writeFileSync('ultimo_pedido.json', JSON.stringify(novoPedido, null, 2));
                console.log("\n📦 Pedido Registrado!");
                console.log("📍 Endereço:", endereco);
                console.log("💾 Arquivo 'ultimo_pedido.json' gerado.");
                menu();
            });
            break;
        case '5':
            console.log("Desligando sistema...");
            rl.close();
            break;
        default:
            console.log("Opção inválida.");
            menu();
    }
}

// Iniciar
menu();