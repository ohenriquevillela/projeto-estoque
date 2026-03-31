package com.example.estoqueapi;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratamentoDeErros {
    @ExceptionHandler(EntityNotFoundException.class) // Se der erro de "não encontrado"
    public ResponseEntity tratarErro404() {
        return ResponseEntity.notFound().build(); // Retorna apenas o status 404, sem texto sujo
    }

    @ExceptionHandler(Exception.class) // Se der qualquer outro erro genérico
    public ResponseEntity tratarErro500(Exception ex) {
        return ResponseEntity.status(500).body("Erro interno: " + ex.getMessage());
    }
}
