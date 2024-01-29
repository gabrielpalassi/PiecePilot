package br.com.piecepilot.backend.entity.component;

import br.com.piecepilot.backend.entity.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name="computer_component")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class ComputerComponent extends Product{

    public ComputerComponent(){
        super();
    }

    public ComputerComponent(String name, double price, String img, String description) {
        super(name, price, img, description); // Chama o construtor da classe pai (Product) com os parâmetros necessários
    }
}
