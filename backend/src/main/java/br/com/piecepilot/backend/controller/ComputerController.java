package br.com.piecepilot.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.piecepilot.backend.entity.Computer;
import br.com.piecepilot.backend.repository.ComputerRepository;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*")
public class ComputerController {
    private ComputerRepository computerRepository;

    public ComputerController(ComputerRepository computerRepository){
        this.computerRepository = computerRepository;
    }

    @GetMapping(path="/api/highlight-computers")
    public ResponseEntity<?> getHighlightComputers() {
        List<Computer> computers = new ArrayList<>();
        try {
            Computer computer1 = computerRepository.findById("highlight1");
            computers.add(computer1);

            Computer computer2 = computerRepository.findById("highlight2");
            computers.add(computer2);

            Computer computer3 = computerRepository.findById("highlight3");
            computers.add(computer3);

            return new ResponseEntity<>(computers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }
}
