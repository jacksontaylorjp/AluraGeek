import { conectaApi } from "../service/conectaApi.js";

const url = document.querySelector("[data-url]");
const categoria = document.querySelector("[data-categoria]");
const nome = document.querySelector("[data-nome]");
const preco = document.querySelector("[data-preco]");
const descricao = document.querySelector("[data-descricao]");

const btAdicionaProduto = document.querySelector("[data-btAdicionarProduto]");

//função que tem o objetivo de coletar os dados dos input's e repassar para
//a função que esta no conectaApi chamada adicionaProduto
async function adicionarProduto (){
    try {
        await conectaApi.adicionaProduto(url.value, categoria.value, nome.value, preco.value, descricao.value);
    } catch (e) {
        alert("Não foi possivel cadastrar o produto")
    }
}

async function carregarProduto (){
    try {
        const urlAtual = window.location.href;
        const idAtual = urlAtual.substring(urlAtual.indexOf("=") + 1);
        const produtoAtual = await conectaApi.carregaProdutoAPI(idAtual);
    
        url.value = produtoAtual[0].url;
        categoria.value = produtoAtual[0].categoria;
        nome.value = produtoAtual[0].nome;
        preco.value = produtoAtual[0].preco;
        descricao.value = produtoAtual[0].descricao;
        
    } catch {
        alert("Erro ao abrir dados do produto")
    }
}

const atualizarProduto =  window.location.href.includes("?q=");
if (atualizarProduto) {
    carregarProduto();

    const urlAtual = window.location.href;
    const idAtual = urlAtual.substring(urlAtual.indexOf("=") + 1);
    btAdicionaProduto.addEventListener("click", () => 
        conectaApi.editarProduto(url.value, categoria.value, nome.value, preco.value, descricao.value, idAtual)); 
}
else{
    btAdicionaProduto.addEventListener("click", () => adicionarProduto());
}
