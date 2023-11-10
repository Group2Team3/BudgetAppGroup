package BudgetApp.BudgetAppBack.customer;

import BudgetApp.BudgetAppBack.account.Account;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Customer")
@Table(
        name = "customer",
        uniqueConstraints = {
                @UniqueConstraint(name = "customer_mail_unique", columnNames = "mail")
        }
)
@Getter
@Setter
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

    public Customer(Long id, String mail, String name) {
        this.id = id;
        this.mail = mail;
        this.name = name;
    }

    public Customer(String mail, String name) {
        this.mail = mail;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", mail='" + mail + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    @OneToMany
    @JoinColumn(name = "id")
    private List<Account> customerAccounts;
}
