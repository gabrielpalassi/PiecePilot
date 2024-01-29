package br.com.piecepilot.backend.entity.component;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import br.com.piecepilot.backend.entity.component.compatibility.HddConnection;
import br.com.piecepilot.backend.entity.component.compatibility.RamType;
import br.com.piecepilot.backend.entity.component.compatibility.Socket;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class MotherBoard extends ComputerComponent{
    private Socket socket;
    @Enumerated(EnumType.STRING)
    private List<HddConnection> hddConnection;
    private RamType ramType;
    private int ramSlots;

    public MotherBoard() {
        super();
    }

    public MotherBoard(String name, double price, String img, String description, Socket socket, List<HddConnection> hddConnection, RamType ramType, int ramSlots) {
        super(name, price, img, description); // Chama o construtor da classe pai (ComputerComponent) com os parâmetros necessários
        this.hddConnection = hddConnection;
        this.socket = socket;
        this.ramType = ramType; 
        this.ramSlots = ramSlots;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static MotherBoard fromJson(String json) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, MotherBoard.class);
    }

    public String toJson() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(this);
    }

    public Socket getSocket() {
        return socket;
    }

    public void setSocket(Socket socket) {
        this.socket = socket;
    }

    public RamType getRamType() {
        return ramType;
    }

    public void setRamType(RamType ramType) {
        this.ramType = ramType;
    }

    public List<HddConnection> getHddConnection() {
        return hddConnection;
    }

    public void setHddConnection(List<HddConnection> hddConnection) {
        this.hddConnection = hddConnection;
    }


    public int getRamSlots() {
        return ramSlots;
    }

    public void setRamSlots(int ramSlots) {
        this.ramSlots = ramSlots;
    }

    @Override
    public String toString() {
        return "MotherBoard";
    }
}
