package br.com.piecepilot.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.piecepilot.backend.entity.Cart;
import br.com.piecepilot.backend.entity.Client;
import br.com.piecepilot.backend.entity.Computer;
import br.com.piecepilot.backend.entity.Item;
import br.com.piecepilot.backend.entity.Order;
import br.com.piecepilot.backend.entity.Product;
import br.com.piecepilot.backend.entity.Seller;
import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import br.com.piecepilot.backend.repository.ClientRepository;
import br.com.piecepilot.backend.repository.ItemRepository;
import br.com.piecepilot.backend.repository.OrderRepository;
import br.com.piecepilot.backend.repository.SellerRepository;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*")
public class CartController {
    private SellerRepository sellerRepository;
    private ClientRepository clientRepository;
    private OrderRepository orderRepository;
    private ItemRepository itemRepository;

    public CartController(
        SellerRepository sellerRepository, 
        ClientRepository clientRepository,
        OrderRepository orderRepository,
        ItemRepository itemRepository) {
        this.sellerRepository = sellerRepository;
        this.clientRepository = clientRepository;
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
    }

    @PostMapping(path="/api/add-to-cart", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> addToCart(@RequestBody String product, @RequestParam("sellerId") String sellerId) {
       
        Cart cart = Cart.getCartBySellerID(sellerId);
       
        Product objProduct;
        try {
            if (product.contains("motherBoard")) 
                objProduct = Computer.fromJson(product);
            else if (product.contains("ramSlots"))
                objProduct = MotherBoard.fromJson(product);
            else if (product.contains("socket"))
                objProduct = Cpu.fromJson(product);
            else if (product.contains("hddConnection"))
                objProduct = Hdd.fromJson(product);
            else if (product.contains("ramType"))
                objProduct = Ram.fromJson(product);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            if (objProduct.getId() == "") {
                objProduct.generateId();
            }
            cart.addToCart(objProduct);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

    @PostMapping(path="/api/remove-from-cart", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> removeFromCart(@RequestBody String product, @RequestParam("sellerId") String sellerId) {     
       
        Cart cart = Cart.getCartBySellerID(sellerId);

        Product objProduct = new Product();
        try {
            if (product.contains("motherBoard")) 
                objProduct = Computer.fromJson(product);
            else if (product.contains("ramSlots"))
                objProduct = MotherBoard.fromJson(product);
            else if (product.contains("socket"))
                objProduct = Cpu.fromJson(product);
            else if (product.contains("hddConnection"))
                objProduct = Hdd.fromJson(product);
            else if (product.contains("ramType"))
                objProduct = Ram.fromJson(product);
            else
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            cart.removeFromCart(objProduct);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

    @GetMapping(path="/api/get-cart")
    public ResponseEntity<Object> getCart(@RequestParam("sellerId") String sellerId) {
        Cart cart = Cart.getCartBySellerID(sellerId);

        try {
            if (cart != null) {
                return new ResponseEntity<>(cart.getItems(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path="/api/checkout")
    public ResponseEntity<String> checkout(@RequestParam("sellerId") String sellerId, @RequestParam("clientCpf")String clientCpf) {
        try {
            Cart cart = Cart.getCartBySellerID(sellerId);
            List<Item> items = cart.getItems();
            Seller seller = sellerRepository.findById(sellerId);
            Client client = clientRepository.findByCpf(clientCpf);
            if (client == null) {
                client = new Client("", clientCpf);
                clientRepository.save(client);
            } 
            Order order = new Order(seller, client);
            orderRepository.save(order);
            for (Item item : items) {
                item.setOrder(order);
                itemRepository.save(item);
            }
            order.setItems(items);
            orderRepository.save(order);
            Cart.freeCart(sellerId);
            return new ResponseEntity<>(order.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }
}
