package BudgetApp.BudgetAppBack.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getCustomer() {
        return customerService.getCustomer();
    }

    @PostMapping
    public void registerNewCustomer(@RequestBody Customer customer) {
        try {
            customerService.addNewCustomer(customer);
        } catch (RuntimeException e) {
            //todo ogarnąć to, sprawdzić najpiew czy istnieje
        }
    }

    @DeleteMapping(path = "{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Long customerId) {
        customerService.deleteCustomer(customerId);
    }

    @PutMapping(path = "{customerId}")
    public void updateCustomer(
            @PathVariable("customerId") Long customerId,
            @RequestParam(required = false) String mail,
            @RequestParam(required = false) String name) {
        customerService.updateCustomer(customerId, mail, name);
    }

}
