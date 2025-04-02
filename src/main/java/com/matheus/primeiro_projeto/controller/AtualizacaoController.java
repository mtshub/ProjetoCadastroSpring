package com.matheus.primeiro_projeto.controller;

import com.matheus.primeiro_projeto.entity.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/usuarios")
public class AtualizacaoController {
    private final ArrayList<Usuario> listaUsuarios = new ArrayList<>();

    public AtualizacaoController() {
        listaUsuarios.add(new Usuario("Matheus Novaes", "matheusndoliveira@gmail.com", "(11) 99876-4321"));
        listaUsuarios.add(new Usuario("Luana Limda", "lusabrina04@gmail.com", "(11) 98764-1234"));
        listaUsuarios.add(new Usuario("Vitor Souza", "vsalves@gmail.com", "(11) 91234-5678"));
    }

    @GetMapping
    public ArrayList<Usuario> getUsuarios() {
        return listaUsuarios;
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioPorId(@PathVariable int id) {
        for (Usuario usuario : listaUsuarios) {
            if(usuario.getId() == id) {
                return usuario;
            }
        }

        return null;
    }

    @PostMapping
    public String adicionarUsuario(@RequestBody Usuario usuario) {
        if(usuarioExiste(usuario)) {
            listaUsuarios.add(usuario);
            System.out.println("lista de usuários atualizada!");
            for (Usuario usuarioTeste : listaUsuarios) {
                System.out.print(usuarioTeste);
            }
            System.out.println();
            return "Usuário adicionado com sucesso.";
        }
        return "Usuário ja existente.";
    }

    @PutMapping("/{id}")
    public String atualizarUsuario(@PathVariable int id, @RequestBody Usuario usuarioAtualizado) {
        int idNovoUsuario = usuarioAtualizado.getId();
        usuarioAtualizado.setId(id);
        if(usuarioExiste(usuarioAtualizado)) {
             listaUsuarios.forEach(usuarioExistente -> {
                if(id == usuarioExistente.getId()) {
                    usuarioExistente.setNome(usuarioAtualizado.getNome().isBlank() ? usuarioExistente.getNome() : usuarioAtualizado.getNome());
                    usuarioExistente.setEmail(usuarioAtualizado.getNome().isBlank() ? usuarioExistente.getEmail() : usuarioAtualizado.getEmail());
                    usuarioExistente.setTelefone(usuarioAtualizado.getTelefone().isBlank() ? usuarioExistente.getTelefone() : usuarioAtualizado.getTelefone());
                }
            });
             usuarioAtualizado.voltarId(idNovoUsuario);
             return "Usuário atualizado com sucesso!";
        }

        return "Erro ao atualizar o usuário. Verifique se ele contém informações iguais a outro usuário.";
    }

    @DeleteMapping("/{id}")
    public String deletarUsuario(@PathVariable Integer id) {
        listaUsuarios.removeIf(usuario -> id.equals(usuario.getId()));
        System.out.println("lista de usuários atualizada!");
        for (Usuario usuarioTeste : listaUsuarios) {
            System.out.print(usuarioTeste);
        }
        System.out.println();
        return "Usuário deletado com sucesso.";
    }

    public boolean usuarioExiste(Usuario usuario) {
        for (Usuario usuarioExistente : listaUsuarios) {
            if ((usuario.getEmail().equals(usuarioExistente.getEmail()) || usuario.getTelefone().equals(usuarioExistente.getTelefone())) && usuario.getId() != usuarioExistente.getId()) {
                usuario.voltarId(usuario.getId());
                return false;
            }
        }
        return true;
    }
}
