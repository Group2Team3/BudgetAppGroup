package BudgetApp.BudgetAppBack.customer;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.beans.Transient;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getCustomer() {
        return customerRepository.findAll();
    }

    public void addNewCustomer(Customer customer) {
        try {
            customerRepository.save(customer);
        } catch (IllegalStateException e) {
            System.out.println("klucz już istnieje");//todo ogarnąć to
        }
    }

    public void deleteCustomer(Long customerId) {
        boolean exists = customerRepository.existsById(customerId);
        if(!exists) {
            throw new IllegalStateException(
                    "customer with id " + customerId + " does not exists!"
            );
        }
        customerRepository.deleteById(customerId);
    }

    @Transactional
    public void updateCustomer(Long customerId, String mail, String name) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(
                () -> new IllegalStateException("customer with id " + customerId + " does not exists!"));

        if(mail != null && !mail.isEmpty() && !Objects.equals(customer.getMail(), mail)) {
            customer.setMail(mail);
        }
        if(name != null && !name.isEmpty() && !Objects.equals(customer.getName(), name)) {
            customer.setName(name);
        }
    }
}
