package br.com.piecepilot.backend.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Cart {
    private List<Item> items;
    public static HashMap<String, Cart> cartsBySellerID = new HashMap<>();

    public Cart(){
        this.items = new ArrayList<>();
    }

    public static Cart getCartBySellerID (String sellerId) {
        if (cartsBySellerID.containsKey(sellerId)) {
            return cartsBySellerID.get(sellerId);
        }
        Cart cart = new Cart();
        cartsBySellerID.put(sellerId, cart);
        return cart;
    }

    public static void freeCart(String sellerId) {
        cartsBySellerID.remove(sellerId);
    }

    public Cart(List<Item> items){
        this.items = items;
    }

    public void addToCart(Product product) {
        for (Item item : items){
            if (item.getProduct().getId().equals(product.getId())){
                item.addQuantity();
                item.updatePrice();
                return;
            }
        }
        items.add(new Item(1, product));
        return;
    }

    public void removeFromCart(Product product){
        for (Item item : items){
            if (item.getProduct().getName().equals(product.getName())){
                item.removeQuantity();
                item.updatePrice();
                if (item.getQuantity() == 0){
                    items.remove(item);
                }
                return;
            }
        }
        return;
    }

    public void removeItem(Item item) {
        items.remove(item);
    }

    public List<Item> getItems() {
        return new ArrayList<>(items); 
    }

}
