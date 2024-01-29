package br.com.piecepilot.backend.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.piecepilot.backend.entity.component.ComputerComponent;
import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import br.com.piecepilot.backend.repository.component.ComponentRepository;
import br.com.piecepilot.backend.repository.component.CpuRepository;
import br.com.piecepilot.backend.repository.component.HddRepository;
import br.com.piecepilot.backend.repository.component.MotherBoardRepository;
import br.com.piecepilot.backend.repository.component.RamRepository;

@RestController
@RequestMapping(produces = "application/json")
@CrossOrigin(origins = "*")
public class ComponentsController {
    private ComponentRepository componentRepository;
    private MotherBoardRepository motherBoardRepository;
    private HddRepository hddRepository;
    private RamRepository ramRepository;
    private CpuRepository cpuRepository;

    public ComponentsController(
            ComponentRepository componentRepository,
            MotherBoardRepository motherBoardRepository,
            HddRepository hddRepository,
            RamRepository ramRepository,
            CpuRepository cpuRepository
        ){
        this.componentRepository = componentRepository;
        this.motherBoardRepository = motherBoardRepository;
        this.hddRepository = hddRepository;
        this.ramRepository = ramRepository;
        this.cpuRepository = cpuRepository;
    }

    @GetMapping(path="/api/components")
    public ResponseEntity<HashMap<String, List<? extends ComputerComponent>>>  getAllComponents() {
        try {
            return new ResponseEntity<>(componentRepository.getComponents(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }
    
    @PostMapping(path="/api/add-component")
    public ResponseEntity<String> addComponent(@RequestBody String component) {
        try {
            ComputerComponent objComponent;
            if (component.contains("ramSlots")) {
                objComponent = MotherBoard.fromJson(component);
                objComponent.generateId();
                motherBoardRepository.save((MotherBoard) objComponent);
            }
            else if (component.contains("socket")) {
                objComponent = Cpu.fromJson(component);
                objComponent.generateId();
                cpuRepository.save( (Cpu) objComponent);
            }
            else if (component.contains("hddConnection")) {
                objComponent = Hdd.fromJson(component);
                objComponent.generateId();
                hddRepository.save( (Hdd) objComponent);
            }
            else if (component.contains("ramType")) {
                objComponent = Ram.fromJson(component);
                objComponent.generateId();
                ramRepository.save( (Ram) objComponent);
            }
            else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(objComponent.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

    @DeleteMapping(path="/api/delete-component")
    public ResponseEntity<Void> deleteComponent(@RequestBody String component) {
        try {
            ComputerComponent objComponent;
            if (component.contains("ramSlots")) {
                objComponent = MotherBoard.fromJson(component);
                motherBoardRepository.delete((MotherBoard) objComponent);
            }
            else if (component.contains("socket")) {
                objComponent = Cpu.fromJson(component);
                cpuRepository.delete( (Cpu) objComponent);
            }
            else if (component.contains("hddConnection")) {
                objComponent = Hdd.fromJson(component);
                hddRepository.delete( (Hdd) objComponent);
            }
            else if (component.contains("ramType")) {
                objComponent = Ram.fromJson(component);
                ramRepository.delete( (Ram) objComponent);
            }
            else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }

    @PutMapping(path="/api/update-component")
    public ResponseEntity<Void> updateComponent(@RequestBody String component) {
        try {
            ComputerComponent objComponent;
            if (component.contains("ramSlots")) {
                objComponent = MotherBoard.fromJson(component);
                motherBoardRepository.save((MotherBoard) objComponent);
            }
            else if (component.contains("socket")) {
                objComponent = Cpu.fromJson(component);
                cpuRepository.save( (Cpu) objComponent);
            }
            else if (component.contains("hddConnection")) {
                objComponent = Hdd.fromJson(component);
                hddRepository.save( (Hdd) objComponent);
            }
            else if (component.contains("ramType")) {
                objComponent = Ram.fromJson(component);
                ramRepository.save( (Ram) objComponent);
            }
            else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);       
        }
    }
}