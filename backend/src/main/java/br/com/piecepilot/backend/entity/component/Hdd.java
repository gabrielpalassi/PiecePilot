package br.com.piecepilot.backend.entity.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Hdd extends ComputerComponent{
    @Enumerated(EnumType.STRING)
    private HddConnection hddConnection;

    public Hdd(){
        super();
    }
    
    public Hdd(String name, double price, String img, String description, HddConnection hddConnection) {
        super(name, price, img, description); // Chama o construtor da classe pai (ComputerComponent) com os parâmetros necessários
        this.hddConnection = hddConnection;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static Hdd fromJson(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, Hdd.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

    // Getter e setter para o socket
    public HddConnection getHddConnection() {
        return hddConnection;
    }

    public void setHddConnection(HddConnection hddConnection) {
        this.hddConnection = hddConnection;
    }

    @Override
    public String toString() {
        return "Hdd";
    }
}
