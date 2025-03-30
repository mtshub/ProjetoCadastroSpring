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

    if(nome == '' || email == '' || telefone == '') {
        alert("Você deve preencher todos os campos para adicionar um usuário.")
        return
    }

    const url = 'http://localhost:8080/usuarios'

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, email, telefone})
    })
    .then(response => response.text())  // Aqui você pega a resposta do backend como texto
    .then(message => {
        alert(message);  // Exibe a mensagem diretamente no alert
        carregarUsuarios()
        resetarForm()
    })
    .catch (() => alert('Erro ao salvar o usuário.'))
}

function verificarUsuarios() {
    const tabela = document.getElementById('dUsuariosTodo');
    const listaUsuarios = document.getElementById('listaUsuarios');

    if (listaUsuarios.childElementCount > 0) {
        tabela.style.display = 'flex';  // Torna a tabela visível
        tabela.classList.add('tabela-visivel');
    }
}

function carregarUsuarios() {
    fetch('http://localhost:8080/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            const tabela = document.getElementById('listaUsuarios');
            tabela.innerHTML = '';

            usuarios.forEach(usuario => {
                const linha = document.createElement('tr');

                const celulaId = document.createElement('td');
                celulaId.textContent = usuario.id;
                celulaId.style.fontSize = '1.1em'
                celulaId.style.fontWeight = '700'
                celulaId.style.textAlign = 'center'

                const celulaNome = document.createElement('td');
                celulaNome.textContent = usuario.nome;

                const celulaEmail = document.createElement('td');
                celulaEmail.textContent = usuario.email;

                const celulaTelefone = document.createElement('td');
                celulaTelefone.textContent = usuario.telefone;

                linha.appendChild(celulaId);
                linha.appendChild(celulaNome);
                linha.appendChild(celulaEmail);
                linha.appendChild(celulaTelefone);

                tabela.appendChild(linha);
                verificarUsuarios()
            });
        });
}

carregarUsuarios()