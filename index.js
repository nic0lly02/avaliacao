const prompt = require('prompt-sync')();

// Produtos da cantina
let produtos = ["Salgado", "Refrigerante", "Suco", "Bolo", "Chocolate"];
let estoque = [];

// Definindo limite crítico para alerta de estoque
const LIMITE_CRITICO = 10;

// Registro da quantidade inicial de cada produto
console.log("=== Cadastro Inicial do Estoque ===");
for (let i = 0; i < produtos.length; i++) {
    let quantidade;
    do {
        quantidade = parseInt(prompt(`Digite a quantidade inicial de ${produtos[i]}: `));
        if (isNaN(quantidade) || quantidade < 0) {
            console.log("Quantidade inválida. Digite um número positivo.");
        }
    } while (isNaN(quantidade) || quantidade < 0);
    estoque[i] = quantidade;
}

// Verificação de estoque crítico após cadastro
console.log("\n=== Verificação de Estoque Crítico ===");
for (let i = 0; i < produtos.length; i++) {
    if (estoque[i] < LIMITE_CRITICO) {
        console.log(`Estoque crítico de ${produtos[i]}. Reabastecimento necessário.`);
    }
}

// Função para exibir o estoque
function visualizarEstoque() {
    console.log("\n=== Estoque Atual ===");
    for (let i = 0; i < produtos.length; i++) {
        console.log(`${produtos[i]}: ${estoque[i]} unidades`);
    }
}

// Menu principal
let opcao;
do {
    console.log(`
=== MENU DO SISTEMA ===
1. Visualizar Estoque
2. Registrar Venda
3. Repor Estoque
4. Sair
    `);

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            visualizarEstoque();
            break;

        case "2":
            console.log("\n=== Registrar Venda ===");
            let produtoVenda = prompt("Digite o nome do produto vendido: ");
            let quantidadeVenda = parseInt(prompt("Digite a quantidade vendida: "));

            if (isNaN(quantidadeVenda) || quantidadeVenda <= 0) {
                console.log("Quantidade inválida.");
                break;
            }

            let encontradoVenda = false;
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].toLowerCase() === produtoVenda.toLowerCase()) {
                    encontradoVenda = true;
                    if (estoque[i] >= quantidadeVenda) {
                        estoque[i] -= quantidadeVenda;
                        console.log(`Venda registrada: ${quantidadeVenda} unidade(s) de ${produtos[i]}`);
                        if (estoque[i] < LIMITE_CRITICO) {
                            console.log(`Aviso: Estoque de ${produtos[i]} está abaixo do limite crítico.`);
                        }
                    } else {
                        console.log("Estoque insuficiente para esta venda.");
                    }
                    break;
                }
            }

            if (!encontradoVenda) {
                console.log("Produto não encontrado.");
            }
            break;

        case "3":
            console.log("\n=== Repor Estoque ===");
            let produtoRepor = prompt("Digite o nome do produto a ser reposto: ");
            let quantidadeRepor = parseInt(prompt("Digite a quantidade a ser adicionada: "));

            if (isNaN(quantidadeRepor) || quantidadeRepor <= 0) {
                console.log("Quantidade inválida.");
                break;
            }

            let encontradoRepor = false;
            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].toLowerCase() === produtoRepor.toLowerCase()) {
                    estoque[i] += quantidadeRepor;
                    console.log(`Estoque atualizado: ${produtos[i]} agora possui ${estoque[i]} unidade(s).`);
                    encontradoRepor = true;
                    break;
                }
            }

            if (!encontradoRepor) {
                console.log("Produto não encontrado.");
            }
            break;

        case "4":
            console.log("Encerrando o sistema...");
            break;

        default:
            console.log("Opção inválida. Tente novamente.");
    }

} while (opcao !== "4");
