package com.example.estoqueapi;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity // Diz ao Spring que isso é uma tabela no banco
@Table(name = "produtos")
public class Produto {

    @Id // Define a chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID automático (Serial)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    private String nome;

    @NotNull(message = "O preço é obrigatório") // Adicione NotNull para números também
    @Positive(message = "O preço deve ser maior que zero")
    private Double preco; // Use Double com D maiúsculo

    @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa")
    private Integer quantidade; // Use Integer com I maiúsculo

    // O Spring exige um construtor vazio
    public Produto() {}

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        if (nome != null)
            this.nome = nome;
    }

    public Double getPreco() {
        return this.preco;
    }

    public void setPreco(Double preco) {
        if (preco >= 0)
            this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        if (quantidade >= 0)
            this.quantidade = quantidade;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}