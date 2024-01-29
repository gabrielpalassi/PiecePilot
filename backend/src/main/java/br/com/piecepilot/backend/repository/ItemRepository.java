package br.com.piecepilot.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.piecepilot.backend.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}
