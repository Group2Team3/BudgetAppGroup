package BudgetApp.BudgetAppBack.account;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    public List<Account> getAccount() {
        return accountRepository.findAll();
    }
    
    public void addNewAccount(Account account) {
        try {
            accountRepository.save(account);
        } catch (DataIntegrityViolationException e) {
            System.out.println("klucz już istnieje");//todo ogarnąć to
        }
    }
    public void deleteAccount(Long accountId) {
        boolean exists =  accountRepository.existsById(accountId);
        if(!exists) {
            throw new IllegalStateException(
                    "account with id " + accountId + " does not exists!"
            );
        }
        accountRepository.deleteById(accountId);
    }

    @Transactional
    public void updateAccount(Long accountId) {
        System.out.println("not implemented - accountService");
    }
}
