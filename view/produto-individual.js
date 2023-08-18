import { conectaApi } from "../service/conectaApi.js";

const produto__individual = document.querySelector(".produto__individual");
const produtos__similares = document.querySelector(".produto__lista--individual");

//identificando a url atual
const urlAtual = window.location.href;
//pegando o id pela url atual
const idAtual = urlAtual.substring(urlAtual.indexOf("=") + 1);
//acessando os dados do produto pela id
const produtoAtual = await conectaApi.carregaProdutoAPI(idAtual);

//acessando produto
//UNIFICAR ESSA FUNÇÃO COM A QUE TEM NO INDEX PARA USAR O MESMO CÓDIGO
function verProdutoIndividual(){
    document.querySelector(".produto__lista--individual").addEventListener("click", (evento) => {
        if (evento.target.classList.contains("produto__verProduto--individual")) {
            //acessando o elemento do produto
            const elemento = document.getElementById(evento.target.id);
            console.log(evento.target.id)
            //acesssando o id do elemento produto
            const id = elemento.getAttribute("id");
            //acessando a página de cadastro de produtos com os dados do id carregado
            window.location.href = `/assets/pages/produtos-individual.html?id=${id}`;
        }
    })}

function produtoIndividual (){
    const produtoIndividual = document.createElement("div");
    produtoIndividual.className = "produto__container--destaque";
    produtoIndividual.innerHTML = `
        <img src="${produtoAtual[0].url}" alt="Produto" class="produto__img--destaque">
        <div class="produto__detalhes--destaque">
            <h2 class="produto__titulo--destaque">${produtoAtual[0].nome}</h2>
            <span class="produto__valor--destaque">R$${produtoAtual[0].preco}</span>
            <p class="produto__descricao--destaque">${produtoAtual[0].descricao}</p>
        </div>`
    return produtoIndividual;
}

function cardProduto (url, nome, preco, id){
    const produtosSimilares = document.createElement('li');
    produtosSimilares.className = "produto__lista--item--individual";
    produtosSimilares.innerHTML = `
        <img class="produto__imagem--individual" src="${url}" alt="produto Star Wars">
        <h3 class="produto__titulo--item--individual">${nome}</h3>
        <span class="produto__valor--item--individual">R$ ${preco}</span>
        <span id="${id}"class="produto__verProduto--individual">Ver produto</span>
    `
    return produtosSimilares;
}

async function filtrarProdutoSimilar () {
    try {
        const produtos = await conectaApi.produtos();
        const produtoSimilar = produtos.filter(produtoSimilar => produtoSimilar.categoria == produtoAtual[0].categoria);
        produtoSimilar.forEach(el => 
            produtos__similares.appendChild(
                cardProduto(el.url, el.nome, el.preco, el.id )))
    } catch {
        alert("Não foi possível carregar os produtos similares")
    }

}

produto__individual.appendChild(produtoIndividual());

filtrarProdutoSimilar();

verProdutoIndividual();