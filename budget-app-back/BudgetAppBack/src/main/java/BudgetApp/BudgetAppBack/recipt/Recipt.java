package BudgetApp.BudgetAppBack.recipt;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.util.Date;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity(name = "Recipt")
@Table(name = "recipt")
@Getter
@Setter
@NoArgsConstructor
public class Recipt {
    @Id
    @SequenceGenerator(
            name = "recipt_sequence",
            sequenceName = "recipt_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "operation_sequence"
    )
    private Long id;
    @Lob
    private Blob photo;
    private Date date;
    private double amount;

    public Recipt(Long id, Blob photo, Date date, double amount) {
        this.id = id;
        this.photo = photo;
        this.date = date;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Recipt{" +
                "id=" + id +
                ", photo=" + photo +
                ", date=" + date +
                ", amount=" + amount +
                '}';
    }
}
