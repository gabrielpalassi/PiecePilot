package br.com.piecepilot.backend.entity;

import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Item {
    @Id
    private String id;
    private int quantity;
    private double price;
    @ManyToOne(optional = true)
    private Order order;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private Product product;

    public Item() {
        this.id = UUID.randomUUID().toString();
    }
    
    public Item(int quantity, Product product) {
        this.id = UUID.randomUUID().toString();
        this.quantity = quantity;
        this.product = product;
        this.price = product.getPrice() * quantity;
    }

    public String getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void addQuantity() {
        this.quantity++;
    }

    public void removeQuantity() {
        this.quantity--;
    }

    public double getPrice() {
        return this.price;
    }

    public void updatePrice () {
        int priceValue = (int) (this.product.getPrice() * 100);
        priceValue *= this.quantity;
        this.price = priceValue / 100.00;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
