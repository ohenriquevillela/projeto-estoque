package com.example.estoqueapi;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "https://projeto-estoque-production.up.railway.app")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    // 1. LISTAGEM GERAL
    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodos() {
        List<ProdutoResponseDTO> lista = repository.findAll().stream()
                .map(ProdutoResponseDTO::new)
                .toList();
        return ResponseEntity.ok(lista);
    }

    // 2. BUSCA POR ID
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(p -> ResponseEntity.ok(new ProdutoResponseDTO(p)))
                .orElseThrow(EntityNotFoundException::new);
    }

    // 3. BUSCA POR NOME (Caminho específico /buscar)
    @GetMapping("/buscar")
    public ResponseEntity<List<ProdutoResponseDTO>> buscarPorNome(@RequestParam("nome") String nome) {
        List<ProdutoResponseDTO> lista = repository.findByNomeContainingIgnoreCase(nome)
                .stream()
                .map(ProdutoResponseDTO::new)
                .toList();
        return ResponseEntity.ok(lista);
    }

    // 4. SALVAR
    @PostMapping
    public ResponseEntity<Produto> salvar(@Valid @RequestBody Produto produto) {
        Produto salvo = repository.save(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    // 5. ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @Valid @RequestBody Produto produtoAtualizado) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException();
        }

        produtoAtualizado.setId(id); // Garante que vai atualizar o ID certo
        Produto salvo = repository.save(produtoAtualizado);
        return ResponseEntity.ok(salvo);
    }

    // 6. EXCLUIR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
