package br.com.piecepilot.backend.controller;

import br.com.piecepilot.backend.service.CompatibilityService;
import br.com.piecepilot.backend.entity.Computer;
import br.com.piecepilot.backend.entity.component.ComputerComponent;
import br.com.piecepilot.backend.repository.component.ComponentRepository;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*")
public class ComputerBuilderController {
    private CompatibilityService compatibilityService;
    
    public ComputerBuilderController(CompatibilityService compatibilityService, ComponentRepository componentsRepository) {
        this.compatibilityService = compatibilityService;
    }
    
    @PostMapping(path="/api/compatible-components")
    public ResponseEntity<HashMap<String, List<? extends ComputerComponent>>> compatibleComponents(@RequestBody Computer computer) {
        HashMap<String, List<? extends ComputerComponent>> responsePayload = new HashMap<>();
        try {
            responsePayload.put("cpu", compatibilityService.GetCompatibleCpus(computer));
            responsePayload.put("hdd", compatibilityService.GetCompatibleHdds(computer));
            responsePayload.put("motherBoard", compatibilityService.GetCompatibleMotherBoards(computer));
            responsePayload.put("ram", compatibilityService.GetCompatibleRams(computer));
            return new ResponseEntity<>(responsePayload, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

}
