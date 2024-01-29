package br.com.piecepilot.backend.entity.component;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.piecepilot.backend.entity.component.compatibility.Socket;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Cpu extends ComputerComponent{
    @Enumerated(EnumType.STRING)
    private Socket socket;

    public Cpu(){
        super();
    }

    public Cpu(String name, double price, String img, String description, Socket socket) {
        super(name, price, img, description); // Chama o construtor da classe pai (ComputerComponent) com os parâmetros necessários
        this.socket = socket;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static Cpu fromJson(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, Cpu.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

    // Getter e setter para o socket
    public Socket getSocket() {
        return socket;
    }

    public void setSocket(Socket socket) {
        this.socket = socket;
    }

    @Override
    public String toString() {
        return "Cpu";
    }
}
