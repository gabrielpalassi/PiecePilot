package br.com.piecepilot.backend.repository.component;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.piecepilot.backend.entity.component.Cpu;

@Repository
public interface CpuRepository extends JpaRepository<Cpu, Long> {

}
