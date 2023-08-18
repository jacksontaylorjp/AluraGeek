import { conectaApi } from "../service/conectaApi.js";
var emailInformado = document.querySelector("[data-email]");
var senhaInformada = document.querySelector("[data-senha]");
const btEntrar = document.querySelector("[data-btEntrar]");
const erroEmail = document.querySelector(".erro__login--email");
const erroSenha = document.querySelector(".erro__login--senha");
const erroLogin = document.querySelector(".erro__login");

//é necessário ser async para esperar a promise ser resolvida
async function validacaoLogin (){
    const listaUsuarios = await conectaApi.usuarios();

    listaUsuarios.forEach(usuarios => {
        
        if(emailInformado.value == ""){
            erroEmail.innerHTML = `<p>Informe seu email!</p>`
            return;
        }

        if(senhaInformada.value == ""){
            erroSenha.innerHTML = `<p>Informe sua senha!</p>`
            return;
        }
        //se os dados informados estiverem corretos de acordo com o banco de dados a página produtos todos será acessada.
        if (emailInformado.value == usuarios.email && senhaInformada.value == usuarios.senha ){
            window.location.href = "/assets/pages/produtos-todos.html";
            return;
        }
        //                          ATENÇÃO
        //VERIFICAR O PQ DE MOSTRAR ESSA MENSAGEM MESMO QUE OS DADOS ESTEJAM CORRETOS
        else {
            erroLogin.innerHTML = `<p>Não foi possível fazer o login! Verifique se seus dados então corretos.</p>`
            return;
        }
    });
}
//quando os campos forem selecionados e posteriormente 
emailInformado.addEventListener("focusout", () => emailInformado.value != "" ? erroEmail.innerHTML = `<p></p>`: erroEmail.innerHTML = `<p>Informe seu email!</p>`);
senhaInformada.addEventListener("focusout", () => senhaInformada.value != "" ? erroSenha.innerHTML = `<p></p>`: erroSenha.innerHTML = `<p>Informe sua senha!</p>`);

//chamando a funcao para validar se o botao entrar for pressionado
btEntrar.addEventListener("click", validacaoLogin);