package BudgetApp.BudgetAppBack.customer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class CustomerConfig {

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository repository) {
        return args -> {
            Customer azej = new Customer( "testowy@mail.pl", "ążej", "dupa");
            Customer januz = new Customer( "testowansko@mail.pl", "januż", "a");
            repository.saveAll(
                    List.of(azej, januz)
            );
        };
//        return null;
    }
//    todo dodac dane
}
