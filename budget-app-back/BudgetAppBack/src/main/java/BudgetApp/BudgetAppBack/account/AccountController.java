package BudgetApp.BudgetAppBack.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/account")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAccount() {
        return accountService.getAccount();
    }

    @PostMapping
    public void registerNewAccount(@RequestBody Account account) {
        try {
            accountService.addNewAccount(account);
        } catch (RuntimeException e) {
            //todo sprawdzić czy istnieje i potem dopiero dodać
        }
    }

    @DeleteMapping(path = "{accountId}")
    public void deleteAccount(@PathVariable("accountId") Long accountId) {
        accountService.deleteAccount(accountId);
    }
}
