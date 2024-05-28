package br.com.piecepilot.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.piecepilot.backend.entity.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findById(String id);
    
}
