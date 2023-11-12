package BudgetApp.BudgetAppBack.customer;

import BudgetApp.BudgetAppBack.goal.Goal;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Customer")
@Table(name = "customer")
@Getter
@Setter
@CrossOrigin
@NoArgsConstructor
public class Customer {
    @Id
    @SequenceGenerator(
            name = "customer_sequence",
            sequenceName = "customer_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "customer_sequence"
    )
    private Long id;

    @Column(
            nullable = false,
            unique = true
    )
    private String mail;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private  String password;

//    @OneToMany
//    @JoinColumn(name = "id")
//    private List<Account> accounts;

    @OneToMany
    @JoinColumn(name = "id")
    private List<Goal> goals;


    public Customer(Long id, String mail, String name, String password) {
        this.id = id;
        this.mail = mail;
        this.name = name;
        this.password = password;
    }

    public Customer(String mail, String name, String password) {
        this.mail = mail;
        this.name = name;
        this.password = password;
    }
}
