package BudgetApp.BudgetAppBack.goal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name = "Goal")
@Table(name = "goal")
@Getter
@Setter
@NoArgsConstructor
public class Goal {
    @Id
    @SequenceGenerator(
            name = "goal_sequence",
            sequenceName = "goal_sequence",
            allocationSize = 1
    )
    private Long id;
    private String name;
    private double amount;
    private String description;
    private Date dateFrom;
    private Date dateTo;

    public Goal(Long id, String name, double amount, String description, Date dateFrom, Date dateTo) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
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
