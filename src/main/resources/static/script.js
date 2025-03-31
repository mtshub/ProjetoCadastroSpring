function formatarTelefone(input) {
    let telefone = input.value.replace(/\D/g, '')
    if (telefone.length == 0) {
        input.value = ''
    }
    else if (telefone.length <= 2) {
        input.value = '(' + telefone
    } else if (telefone.length <= 6) {
        input.value = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2)
    } else if (telefone.length <= 10) {
        input.value = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2, 6) + '-' + telefone.slice(6)
    } else {
        input.value = '(' + telefone.slice(0, 2) + ') ' + telefone.slice(2, 7) + '-' + telefone.slice(7, 11)
    }
}

function resetarForm() {
    document.getElementById('formCadastro').reset()
}

function cadastrarUsuario() {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const telefone = document.getElementById('telefone').value

    if (nome == '' || email == '' || telefone == '') {
        alert("Você deve preencher todos os campos para adicionar um usuário.")
        return
    }

    const url = 'http://localhost:8080/usuarios'

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
    })
        .then(response => response.text())
        .then(message => {
            alert(message)
            resetarForm()
        })
        .catch(() => alert('Erro ao salvar o usuário.'))
}

function verificarUsuarios() {
    const tabela = document.getElementById('dUsuariosTodo');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const botaoAtt = document.getElementById('btnAtt')
    const botaoDel = document.getElementById('btnDel')

    if (listaUsuarios.childElementCount > 0) {
        tabela.style.display = 'flex';  // Torna a tabela visível
        tabela.classList.add('tabela-visivel');
        botaoAtt.style.visibility = 'visible'
        botaoDel.style.visibility = 'visible'
    } else {
        tabela.style.display = 'none'
        botaoAtt.style.visibility = 'hidden'
        botaoDel.style.visibility = 'hidden'
    }
}

function deletarUsuario() {
    const usuarioSelecionado = document.querySelector('input[type="radio"]:checked')
    if(!usuarioSelecionado) {
        return alert("Selecione alguém para deletar.");
    }

    const idUsuario = usuarioSelecionado.getAttribute("data-id")

    if (!confirm(`Confirmar a exclusão do usuário de id: ${idUsuario}? Esta operação não pode ser desfeita.`)) {
        return;
    }

    const url = `http://localhost:8080/usuarios/${idUsuario}`
    console.log(url);

    fetch(url, {
        method: 'DELETE',
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            carregarUsuarios()
        })
        .catch(() => alert('Erro ao deletar o usuário.'))
}

function carregarUsuarios() {
    fetch('http://localhost:8080/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            const tabela = document.getElementById('listaUsuarios')
            tabela.innerHTML = ''

            usuarios.forEach(usuario => {
                const linha = document.createElement('tr')

                const celulaId = document.createElement('td')
                celulaId.textContent = usuario.id
                celulaId.style.fontSize = '1.1em'
                celulaId.style.fontWeight = '700'
                celulaId.style.textAlign = 'center'

                const celulaNome = document.createElement('td')
                celulaNome.textContent = usuario.nome

                const celulaEmail = document.createElement('td')
                celulaEmail.textContent = usuario.email;

                const celulaTelefone = document.createElement('td')
                celulaTelefone.textContent = usuario.telefone

                const celulaAcao = document.createElement('td')
                celulaAcao.innerHTML = `<input type="radio" name="" data-id="${usuario.id}">`
                celulaAcao.style.textAlign = 'center'

                linha.appendChild(celulaId);
                linha.appendChild(celulaNome);
                linha.appendChild(celulaEmail);
                linha.appendChild(celulaTelefone);
                linha.appendChild(celulaAcao)

                tabela.appendChild(linha);
                verificarUsuarios()
            });
        });
}

let tamanhoAnterior = 0;

function verificarAtualizacoes() {
    fetch('http://localhost:8080/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            if (usuarios.length !== tamanhoAnterior) {
                verificarUsuarios()
                carregarUsuarios()
                tamanhoAnterior = usuarios.length;
            }
        });
}

fetch('http://localhost:8080/usuarios')
    .then(resposta => resposta.json())
    .then(usuarios => {
        tamanhoAnterior = usuarios.length;
    });

setInterval(verificarAtualizacoes, 3000);
if (window.location.href.includes('http://localhost:8080/exibir-usuarios')) {
    carregarUsuarios()
}