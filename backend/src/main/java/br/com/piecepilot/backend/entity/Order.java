package br.com.piecepilot.backend.entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="`order`")
public class Order {
    @Id
    private String id;
    private double price;
    @OneToMany(mappedBy = "order")
    private List<Item> items;
    @ManyToOne(optional = false)
    private Seller seller;
    @ManyToOne(optional = false)
    private Client client;

    public Order() {
        this.id = UUID.randomUUID().toString();
    }

    public Order(Seller seller, Client client) {
        this.id = UUID.randomUUID().toString();
        this.price = 0;
        this.seller = seller;
        this.client = client;
    }
    
    public double getPrice() {
        return price;
    }
    public String getId() {
        return id;
    }
    public List<Item> getItems() {
        return items;
    }
    public void setItems(List<Item> items) {
        this.items = items;
        int priceValue = 0;
        for (int i = 0; i < items.size(); i++) {
            items.get(i).setOrder(this);
            priceValue += (int) (items.get(i).getPrice()*100);
        }
        double price = priceValue / 100.00;
        this.price = price;
    }
}
