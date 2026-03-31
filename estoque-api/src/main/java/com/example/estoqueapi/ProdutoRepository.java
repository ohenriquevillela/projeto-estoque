package com.example.estoqueapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // O Spring lê "findByNomeContaining" e entende:
    // "SELECT * FROM produtos WHERE nome LIKE '%termo%'"
    List<Produto> findByNomeContainingIgnoreCase(String nome);
}