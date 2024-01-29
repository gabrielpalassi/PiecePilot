package br.com.piecepilot.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.piecepilot.backend.entity.Computer;

@Repository
public interface ComputerRepository extends JpaRepository<Computer, Long> {
    Computer findById(String id);
}
