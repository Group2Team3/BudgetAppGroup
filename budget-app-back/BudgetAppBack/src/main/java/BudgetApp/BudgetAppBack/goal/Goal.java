package BudgetApp.BudgetAppBack.goal;

import BudgetApp.BudgetAppBack.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Entity(name = "Goal")
@Table(name = "goal")
@Getter
@Setter
@CrossOrigin
@NoArgsConstructor
public class Goal {
    @Id
    @SequenceGenerator(
            name = "goal_sequence",
            sequenceName = "goal_sequence",
            allocationSize = 1
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private double amount;

    @Column
    private String description;

    @Column
    private Date dateFrom;

    @Column
    private Date dateTo;

    @Column
    private double saved;

    @Column
    private String category;

    @Column
    private Date timeLeft;

    @Column
    private boolean accomplished;

    @Column
    private boolean timePassed;

    @ManyToOne
    private Customer customer;

    public Goal(Long id, String name, double amount, String description, Date dateFrom, Date dateTo, String category) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.category = category;
    }

    public Goal(String name, double amount, String description, Date dateFrom, Date dateTo, String category) {
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.category = category;
    }

    @Override
    public String toString() {
        return "Goal{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", dateFrom=" + dateFrom +
                ", dateTo=" + dateTo +
                '}';
    }
}
