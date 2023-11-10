package BudgetApp.BudgetAppBack.operation;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Operation")
@Table(name = "operation")
@Getter
@Setter
@NoArgsConstructor
public class Operation {
    @Id
    @SequenceGenerator(
            name = "operation_sequence",
            sequenceName = "operation_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "operation_sequence"
    )
    private Long id;
    private String name;
    private double amount;
    private String currency;
    private Date operDate;
    private String type;
    private boolean mandatory;
    private String place;
}
