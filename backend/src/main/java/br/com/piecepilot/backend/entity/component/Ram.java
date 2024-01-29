package br.com.piecepilot.backend.entity.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.piecepilot.backend.entity.component.compatibility.RamType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Ram extends ComputerComponent{
    @Enumerated(EnumType.STRING)
    private RamType ramType;
    private int sticksNumber;
  
    public Ram(){
        super();
    }

    public Ram(String name, double price, String img, String description, RamType ramType, int sticksNumber) {
        super(name, price, img, description); // Chama o construtor da classe pai (ComputerComponent) com os parâmetros necessários
        this.ramType = ramType;
        this.sticksNumber = sticksNumber;
    }

    // Getter e setter para o socket
    public RamType getRamType() {
        return ramType;
    }

    public void setRamType(RamType ramType) {
        this.ramType = ramType;
    }

    public int getSticksNumber() {
        return sticksNumber;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static Ram fromJson(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, Ram.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

    public void setSticksNumber(int sticksNumber) {
        this.sticksNumber = sticksNumber;
    }

    @Override
    public String toString() {
        return "Ram";
    }

}
