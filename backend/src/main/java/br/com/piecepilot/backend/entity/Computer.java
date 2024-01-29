package br.com.piecepilot.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.piecepilot.backend.entity.component.Cpu;
import br.com.piecepilot.backend.entity.component.Hdd;
import br.com.piecepilot.backend.entity.component.MotherBoard;
import br.com.piecepilot.backend.entity.component.Ram;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "computer")
public class Computer extends Product{
    @ManyToOne(optional = false)
    private Cpu cpu;

    @ManyToOne(optional = false)
    private MotherBoard motherBoard;

    @ManyToMany
    @JoinTable(
        name = "computer_ram",  
        joinColumns = @JoinColumn(name = "computer_id"),  
        inverseJoinColumns = @JoinColumn(name = "ram_id")
    )
    private List<Ram> rams;

    @ManyToMany
    @JoinTable(
        name = "computer_hdd",  
        joinColumns = @JoinColumn(name = "computer_id"),  
        inverseJoinColumns = @JoinColumn(name = "hdd_id")  
    )
    private List<Hdd> hdds;

    public Computer() {
        super();
    }
    
    public Computer(String name, double price, String img, String description, Cpu cpu, List<Ram> rams, MotherBoard motherBoard, List<Hdd> hdds) {
        super(name, price, img, description); 
        this.cpu = cpu;
        this.rams = rams;
        this.motherBoard = motherBoard;
        this.hdds = hdds;
    }

    public Computer(String Id, String name, double price, String img, String description, Cpu cpu, List<Ram> rams, MotherBoard motherBoard, List<Hdd> hdds) {
        super(Id, name, price, img, description); 
        this.cpu = cpu;
        this.rams = rams;
        this.motherBoard = motherBoard;
        this.hdds = hdds;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static Computer fromJson(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, Computer.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

    @Override
    public String toString() {
        return "Computer";
    }
    public Cpu getCpu() {
        return cpu;
    }
    public void setCpu(Cpu cpu) {
        this.cpu = cpu;
    }
    public List<Ram> getRams() {
        return rams;
    }
    public void setRams(List<Ram> rams) {
        this.rams = rams;
    }
    public MotherBoard getMotherBoard() {
        return motherBoard;
    }
    public void setMotherBoard(MotherBoard motherBoard) {
        this.motherBoard = motherBoard;
    }
    public List<Hdd> getHdds() {
        return hdds;
    }
    public void setHdds(List<Hdd> hdds) {
        this.hdds = hdds;
    } 

}
