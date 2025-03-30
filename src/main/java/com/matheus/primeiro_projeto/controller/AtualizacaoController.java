package com.matheus.primeiro_projeto.controller;

import com.matheus.primeiro_projeto.entity.Usuario;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/usuarios")
public class AtualizacaoController {
    private final ArrayList<Usuario> listaUsuarios = new ArrayList<>();

    @GetMapping
    public ArrayList<Usuario> getUsuarios() {
        return listaUsuarios;
    }

    @PostMapping
    public String adicionarUsuario(@RequestBody Usuario usuario) {
        for (Usuario usuarioExistente : listaUsuarios) {
            if(usuario.getEmail().equals(usuarioExistente.getEmail()) || usuario.getTelefone().equals(usuarioExistente.getTelefone())) {
                usuario.voltarId(usuario.getId());
                return "Email ou Telefone já existentes na lista. Verifique as informações.";
            }
        }

        listaUsuarios.add(usuario);
        System.out.println("lista de usuários atualizada!");
        for (Usuario usuarioTeste : listaUsuarios) {
            System.out.print(usuarioTeste);
        }
        return "Usuário adicionado com sucesso.";
    }
}
