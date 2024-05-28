package br.com.piecepilot.backend;

import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;

import br.com.piecepilot.backend.entity.Cart;
import br.com.piecepilot.backend.entity.Computer;
import br.com.piecepilot.backend.entity.Seller;
import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
import br.com.piecepilot.backend.entity.component.compatibility.RamType;
import br.com.piecepilot.backend.entity.component.compatibility.Socket;
import br.com.piecepilot.backend.entity.Product;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

	@Test
	void contextLoads() {
	}

	@Test
	void addToCartTest() {
		Cart cart = Cart.getCartBySellerID("a");

		// Criando alguns produtos
        Product product1 = new Cpu("cpu1", 101.00, null, null, Socket.AM4);
        Product product2 = new Cpu("cpu1", 101.00, null, null, Socket.AM4);
        Product product3 = new Cpu("cpu2", 99.00, null, null, Socket.AM4);
		Product product4 = new Ram("ram1", 10.50, null, null, RamType.DDR3, 4);
        // Adicionando produtos à lista
        cart.addToCart(product1);
        cart.addToCart(product2);
        cart.addToCart(product3);
		cart.addToCart(product4);
		cart.addToCart(product4);

		cart.removeFromCart(product4);		
		cart.removeFromCart(product4);

		// product 1
		assertTrue( cart.getItems().get(0).getQuantity() == 2 );
	}


	@Test
	void addToCartAPITest() {

		Seller seller = new Seller("Teste"); // na main tem que criar o vendedor 'login'

		Product product1 = new Computer("computer1", 1000.00, 
								null, null, new Cpu("cpu1", 10, "", null, Socket.AM4), 
								List.of(new Ram("ram1", 11, "", null, RamType.DDR3, 2)), 
								new MotherBoard("motherboard1", 12, "", "", null, List.of(HddConnection.NVMe), null, 0),
								List.of(new Hdd("hd1", 13, "", null, HddConnection.NVMe)));
		Ram product2 = new Ram("ram2", 10.50, "", null, RamType.DDR3, 4);
		
		try{
			for (int i = 0; i < 3; i++){
				mockMvc.perform(MockMvcRequestBuilders.post("/api/add-to-cart")
				.param("sellerId", seller.getId() + "")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(product1)))
				.andExpect(MockMvcResultMatchers.status().isOk());
			}
			for (int i = 0; i < 2; i++){
				mockMvc.perform(MockMvcRequestBuilders.post("/api/add-to-cart")
				.param("sellerId", seller.getId() + "")
				.contentType(MediaType.APPLICATION_JSON)
				.content(product2.toJson()))
				.andExpect(MockMvcResultMatchers.status().isOk());
			}
			mockMvc.perform(MockMvcRequestBuilders.post("/api/remove-from-cart")
				.param("sellerId", seller.getId() + "")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(product1)))
				.andExpect(MockMvcResultMatchers.status().isOk());
			
		} catch (Exception e) {
			System.out.println(e);
		}

	}
}
