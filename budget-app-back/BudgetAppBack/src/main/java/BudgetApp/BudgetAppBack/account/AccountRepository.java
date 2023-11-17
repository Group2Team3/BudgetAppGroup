package BudgetApp.BudgetAppBack.account;

import BudgetApp.BudgetAppBack.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}
