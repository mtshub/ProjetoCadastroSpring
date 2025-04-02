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