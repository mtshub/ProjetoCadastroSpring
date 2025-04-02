function deletarUsuario() {
    const usuarioSelecionado = document.querySelector('input[type="radio"]:checked')
    if (!usuarioSelecionado) {
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
            document.getElementById("dForm").style.display = "none"
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
                celulaAcao.innerHTML = `<input type="radio" name="usuario" data-id="${usuario.id}">`
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

carregarUsuarios()

function mostrarUsuarioAtualizado() {
    const usuarioSelecionado = document.querySelector('input[type="radio"]:checked')
    if (!usuarioSelecionado) {
        return alert("Selecione alguém para atualizar.");
    }

    const idUsuario = usuarioSelecionado.getAttribute("data-id")
    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let telefone = document.getElementById('telefone')

    const divForm = document.getElementById('dForm')
    divForm.style.display = 'flex'
    divForm.style.marginTop = '50px'

    const btnUsuarioSelecionado = document.getElementById("btnUsuarioSelecionado")
    const btnAtt = document.getElementById("btnAtt")

    fetch(`http://localhost:8080/usuarios/${idUsuario}`)
        .then(resposta => resposta.json())
        .then(usuario => {
            nome.value = usuario.nome
            email.value = usuario.email
            telefone.value = usuario.telefone
            btnAtt.style.display = "block"
            btnUsuarioSelecionado.style.display = "none"

            btnAtt.onclick = function () {
                atualizarUsuario(idUsuario);
            };
        });
}

function atualizarUsuario(id) {
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value

    const divForm = document.getElementById('dForm')

    const btnUsuarioSelecionado = document.getElementById("btnUsuarioSelecionado")
    const btnAtt = document.getElementById("btnAtt")

    if (nome == '' && email == '' && telefone == '') {
        return alert("Altere algum valor.");
    }

    if(!confirm("Deseja confirmar a atualização do usuário de id " + id + "?")){
        divForm.style.display = 'none'
        btnUsuarioSelecionado.style.display = 'block'
        btnAtt.style.display = 'none'
        return;
    }

    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone })
    })
        .then(response => response.text())
        .then(message => {
            alert(message);
            divForm.style.display = 'none'
            btnUsuarioSelecionado.style.display = 'block'
            btnAtt.style.display = 'none'
            carregarUsuarios()
        })
        .catch(message => alert(message))
}

let tamanhoAnterior = 0;

function verificarUsuarios() {
    const tabela = document.getElementById('dUsuariosTodo');
    const listaUsuarios = document.getElementById('listaUsuarios');
    const botaoAtt = document.getElementById('btnUsuarioSelecionado')
    const botaoDel = document.getElementById('btnDel')

    if (tamanhoAnterior == 0) {
        tabela.style.display = 'none'
        botaoAtt.style.display = 'none'
        botaoDel.style.display = 'none'
    } else {
        tabela.style.display = 'flex';
        tabela.classList.add('tabela-visivel');
        botaoAtt.style.display = 'block'
        botaoDel.style.display = 'block'
    }
}

function verificarAtualizacoes() {
    fetch('http://localhost:8080/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            if (usuarios.length !== tamanhoAnterior) {
                tamanhoAnterior = usuarios.length;
                verificarUsuarios()
                carregarUsuarios()
            }
        });
}

setInterval(verificarAtualizacoes, 1500);