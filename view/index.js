import { conectaApi } from "../service/conectaApi.js";
const listaProdutoStarWars = document.querySelector("[data-produtoStarWars]");
const listaProdutosConsoles = document.querySelector("[data-produtoConsoles]");
const listaProdutosDiversos = document.querySelector("[data-produtoDiversos]");
const btLogin = document.querySelector("[data-btLogin]");

//direciona para a página de login
btLogin.addEventListener("click", () => {window.location.href = "assets/pages/login.html"});

//acessando produto
function verProdutoIndividual(){
    document.querySelector(".produto__lista").addEventListener("click", (evento) => {
        if (evento.target.classList.contains("produto__verProduto")) {
            //acessando o elemento do produto
            const elemento = document.getElementById(evento.target.id);
            console.log(evento.target.id)
            //acesssando o id do elemento produto
            const id = elemento.getAttribute("id");
            //acessando a página de cadastro de produtos com os dados do id carregado
            window.location.href = `assets/pages/produtos-individual.html?id=${id}`;
        }
    })}

function cardProdutosPorCategoria (url, nome, preco, id){
    const produtoPorCategoria = document.createElement("li");
    produtoPorCategoria.className = "produto__lista--item";
    produtoPorCategoria.innerHTML = `
                    <img class="produto__imagem" src="${url}" alt="produto Star Wars">
                    <h3 class="produto__titulo--item">${nome}</h3>
                    <span class="produto__valor--item">R$ ${preco}</span>
                    <span id="${id} "class="produto__verProduto">Ver produto</span>
    `
    return produtoPorCategoria;
}

async function filtrarProdutosPorCategoria (){
    try {
        const produtos = await conectaApi.produtos();
        
        const produtosStarWars = produtos.filter(produtoPorCategoria => produtoPorCategoria.categoria == "Star Wars");
        produtosStarWars.forEach(elemento => listaProdutoStarWars.appendChild(cardProdutosPorCategoria(elemento.url, elemento.nome, elemento.preco, elemento.id)));

        const produtosConsoles = produtos.filter(produtoPorCategoria => produtoPorCategoria.categoria == "Consoles");
        produtosConsoles.forEach(elemento => listaProdutosConsoles.appendChild(cardProdutosPorCategoria(elemento.url, elemento.nome, elemento.preco, elemento.id)));

        const produtosDiversos = produtos.filter(produtoPorCategoria => produtoPorCategoria.categoria == "Diversos");
        produtosDiversos.forEach(elemento => listaProdutosDiversos.appendChild(cardProdutosPorCategoria(elemento.url, elemento.nome, elemento.preco, elemento.id)));
    } catch {
        listaProdutoStarWars.innerHTML = `<h2 class="">Não foi possível carregar a lista de Produtos</h2>`
        listaProdutosConsoles.innerHTML = `<h2 class="">Não foi possível carregar a lista de Produtos</h2>`
        listaProdutosDiversos.innerHTML = `<h2 class="">Não foi possível carregar a lista de Produtos</h2>`
    }
}

filtrarProdutosPorCategoria();
verProdutoIndividual();
