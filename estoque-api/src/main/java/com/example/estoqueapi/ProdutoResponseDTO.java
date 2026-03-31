package com.example.estoqueapi;

public record ProdutoResponseDTO(Long id, String nome, Double preco, Integer quantidade) {
    public ProdutoResponseDTO(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getPreco(), produto.getQuantidade());
    }
}
