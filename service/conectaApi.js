//GET na API
var listaUsuarios = [];
async function usuarios (){
    const res = await fetch("http://localhost:3000/usuarios");
    listaUsuarios = await res.json();
    return listaUsuarios;
}

//GET na API
var listaProdutos = [];
async function produtos (){
    const res = await fetch("http://localhost:3000/produtos");
    listaProdutos = await res.json();
    return listaProdutos;
}

//criando função para carregar produtos por id
async function carregaProdutoAPI (id){
    const res = await fetch(`http://localhost:3000/produtos?id=${id}`);
    const resConvertido = await res.json();
    return resConvertido;
}

//POST
async function adicionaProduto (url, categoria, nome, preco, descricao){
    const res = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        //convertendo para json string
        body: JSON.stringify({
            url: url,
            categoria: categoria,
            nome: nome,
            preco: preco,
            descricao: descricao
        })
    });
    if(!res.ok){
        throw new Error("Não  foi possível adicionar o produto.");
    }
    const resConvertido = await res.json();
    return resConvertido;
}

//DELETE
async function deletaProduto (id){
    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "Application/json"
        }
    });
    if(!res.ok){
        throw new Error("Não foi possível deletar o produto.");
    }
    const resConvertido = await res.json();
    return resConvertido;
}

//PUT
async function editarProduto (url, categoria, nome, preco, descricao, id) {
    const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            url: url,
            categoria: categoria,
            nome: nome,
            preco: preco,
            descricao: descricao
        })
    });
    if(!res.ok){
        throw new Error("Não foi possível editar o produto.");
    }
    const resConvertido = await res.json();
    return resConvertido;
}

export const conectaApi = {
    usuarios,
    produtos,
    adicionaProduto,
    deletaProduto, 
    editarProduto,
    carregaProdutoAPI
    
}


