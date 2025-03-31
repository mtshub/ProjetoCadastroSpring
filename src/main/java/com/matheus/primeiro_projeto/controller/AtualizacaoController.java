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

    @PostMapping
    public String adicionarUsuario(@RequestBody Usuario usuario) {
        for (Usuario usuarioExistente : listaUsuarios) {
            if (usuario.getEmail().equals(usuarioExistente.getEmail()) || usuario.getTelefone().equals(usuarioExistente.getTelefone())) {
                usuario.voltarId(usuario.getId());
                return "Email ou Telefone já existentes na lista. Verifique as informações.";
            }
        }

        listaUsuarios.add(usuario);
        System.out.println("lista de usuários atualizada!");
        for (Usuario usuarioTeste : listaUsuarios) {
            System.out.print(usuarioTeste);
        }
        System.out.println();
        return "Usuário adicionado com sucesso.";
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
}
