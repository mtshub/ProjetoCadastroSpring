package com.matheus.primeiro_projeto.entity;

public class Usuario {
    private static int ultimoId = 0;
    private int id;
    private String nome;
    private String email;
    private String telefone;

    public Usuario(int id, String nome, String email, String telefone) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.id = ++ultimoId;
    }

    public int getId() {
        return id;
    }

    public void voltarId(int id) {
        ultimoId = id - 1;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    @Override
    public String toString() {
        return String.format("%-5d | %-30.30s | %-30.30s | %s%n", id, nome, email, telefone);
    }
}
