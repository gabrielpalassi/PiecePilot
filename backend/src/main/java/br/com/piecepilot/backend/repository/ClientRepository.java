package br.com.piecepilot.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.piecepilot.backend.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findById(String id);
    Client findByCpf(String cpf);
}
