import { conectaApi } from "../service/conectaApi.js";
const btAdicionarProduto = document.querySelector("[data-adicionarProduto]");
const listaProd = document.querySelector("[data-listProdutos]");
//ao click no botão adicionar produto vai para a página de cadastro de produto.
btAdicionarProduto.addEventListener("click", () => window.location.href = "/assets/pages/produtos-cadastro.html");

//função que cria um card genérico
function constroiProdutoCard(url, nome, preco, id) {
    //criando um elemento do tipo li
    const produto = document.createElement("li");
    //informando qual a class que esse produto li vai obter
    produto.className = "produto__todos-lista--item";
    produto.innerHTML = `
        <img class="produto__todos--imagem" src="${url}">
        <div class="produto__container--delEdit">
            <img id="${id}" src="../img/delete_black_24dp (1) 1.svg" alt="deletar" class="produto__deletar">
            <img id="${id}" src="../img/edit_black_24dp 1.svg" alt="editar" class="produto__editar">
        </div>
        <h3 class="produto__titulo--item">${nome}</h3>
        <span class="produto__valor--item">R$${preco}</span>
        <span class="produto__todos--codigo">#${id}</span>
        `;
    return produto;
}

//precisa ser async, pois vai aguardar resposta do banco de dados
async function listaProdutos() {
    try {
        //recebendo os dados da api
        const lista = await conectaApi.produtos();
        //usando forEach para montar os cards dos produtos de acordo com a quantidade disponível
        //appendChild, ou seja, construindo o card no filho do ul que é a li criado na funçao constroiProdutoCard
        lista.forEach(elemento => listaProd.appendChild(constroiProdutoCard(elemento.url, elemento.nome, elemento.preco, elemento.id))
        );
    } catch {
        listaProd.innerHTML = `<h2 class="">Não foi possível carregar a lista de Produtos</h2>`
    }
}
listaProdutos();

async function deletarProdutos() {
    try {
        document.querySelector(".produto__todos--lista").addEventListener("click", (evento) => {
            if (evento.target.classList.contains("produto__deletar")) {
                //acessando o elemento do produto
                const elemento = document.getElementById(evento.target.id);
                //acesssando o id do elemento produto
                const id = elemento.getAttribute("id");
                conectaApi.deletaProduto(id);
            }
        })
    } catch {
        alert("Não  foi possivel excluir o produto")
    }
}

function editarProduto(){
    document.querySelector(".produto__todos--lista").addEventListener("click", (evento) => {
        if (evento.target.classList.contains("produto__editar")) {
            //acessando o elemento do produto
            const elemento = document.getElementById(evento.target.id);
            //acesssando o id do elemento produto
            const id = elemento.getAttribute("id");
            //acessando a página de cadastro de produtos com os dados do id carregado
            window.location.href = `/assets/pages/produtos-cadastro.html?q=${id}`;
        }
    })}
        
deletarProdutos();

editarProduto();