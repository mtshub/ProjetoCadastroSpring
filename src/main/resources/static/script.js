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

let modoEdicao = false;

    function carregarUsuarios() {
        fetch('http://localhost:8080/usuarios')
            .then(resposta => resposta.json())
            .then(usuarios => {
                const tabela = document.getElementById('tabela-usuarios');
                tabela.innerHTML = '';

                usuarios.forEach(usuario => {
                    const linha = document.createElement('tr');

                    const celulaNome = document.createElement('td');
                    celulaNome.textContent = usuario.nome;

                    const celulaTelefone = document.createElement('td');
                    celulaTelefone.textContent = usuario.telefone;

                    linha.appendChild(celulaId);
                    linha.appendChild(celulaTelefone);

                    tabela.appendChild(linha);
                });
            });
    }

    document.getElementById('form-usuario').addEventListener('submit', function (evento) {
        evento.preventDefault();

        const id = parseInt(document.getElementById('usuario-id').value);
        const nome = document.getElementById('usuario-nome').value;

        const metodo = modoEdicao ? 'PUT' : 'POST';
        const url = modoEdicao ? `http://localhost:8080/usuarios/${id}` : 'http://localhost:8080/usuarios';

        fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nome })
        })
        .then(() => {
            alert(`Usuário ${modoEdicao ? 'atualizado' : 'adicionado'} com sucesso!`);
            carregarUsuarios();
            resetForm();
        })
        .catch(() => alert('Erro ao salvar usuário.'));
    });

    function editarUsuario(id, nome) {
        modoEdicao = true;
        document.getElementById('form-titulo').textContent = 'Editar Usuário';
        document.getElementById('usuario-id').value = id;
        document.getElementById('usuario-id').disabled = true;
        document.getElementById('usuario-nome').value = nome;
    }

    function deletarUsuario(id) {
        if (confirm('Deseja excluir este usuário?')) {
            fetch(`http://localhost:8080/usuarios/${id}`, { method: 'DELETE' })
                .then(() => {
                    alert('Usuário deletado com sucesso!');
                    carregarUsuarios();
                })
                .catch(() => alert('Erro ao deletar usuário.'));
        }
    }

    function resetForm() {
        modoEdicao = false;
        document.getElementById('form-titulo').textContent = 'Novo Usuário';
        document.getElementById('usuario-id').value = '';
        document.getElementById('usuario-id').disabled = false;
        document.getElementById('usuario-nome').value = '';
    }

    carregarUsuarios();