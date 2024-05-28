package br.com.piecepilot.backend.entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Seller {
    @Id
    private String id;
    private String name;
    private String cpf;
    @OneToMany(mappedBy = "seller")
    private List<Order> orders;

    public Seller() {
        this.id = UUID.randomUUID().toString();
    }

    public Seller(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public Seller(String name, String cpf) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.cpf = cpf;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }


    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<Order> getOrders() {
        return this.orders;
    }
}