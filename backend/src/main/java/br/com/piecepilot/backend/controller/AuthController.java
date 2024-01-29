package br.com.piecepilot.backend.controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.hash.Hashing;

import br.com.piecepilot.backend.entity.Seller;
import br.com.piecepilot.backend.repository.SellerRepository;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*")
public class AuthController {
    private SellerRepository sellerRepository;

    public AuthController(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    @PostMapping(path="/api/sign-up")
    public ResponseEntity<?> signUp(@RequestParam String name, @RequestParam String cpf, @RequestParam String email, @RequestParam String password) {
        try {
            if (sellerRepository.findByEmail(email) == null) {
                String hashedPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
                Seller seller = new Seller(name, cpf, email, hashedPassword);
                sellerRepository.save(seller);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

    @PostMapping(path="/api/sign-in")
    public ResponseEntity<Seller> signIn(@RequestParam String email, @RequestParam String password) {
        try {
            Seller seller = sellerRepository.findByEmail(email);
            if (seller != null) {
                String hashedPassword = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
                if (seller.getPassword().equals(hashedPassword)) {
                    return new ResponseEntity<>(seller, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }
}
