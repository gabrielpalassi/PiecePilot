package br.com.piecepilot.backend.entity;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public class Product {
    @JsonProperty("productId")
    @Id
    @Column(name = "product_id")
    private String productId;
    private String name;
    private double price;
    private String image;
    private String description;
    // @OneToMany(mappedBy = "product")
    // private Item item;

    public Product(){
        this.productId = UUID.randomUUID().toString();
    }

    public Product(String name, double price, String img, String description){
        this.productId = UUID.randomUUID().toString();
        this.name = name;
        this.price = price;
        this.image = img;
        this.description = description;
    }

    public Product(String Id, String name, double price, String img, String description){
        this.productId = Id;
        this.name = name;
        this.price = price;
        this.image = img;
        this.description = description;
    }

    @JsonProperty("productId")
    public String getId() {
        return this.productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void generateId() {
        this.productId = UUID.randomUUID().toString();
    }
}
