package BudgetApp.BudgetAppBack.recipt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReciptService {
    private final ReciptRepository reciptRepository;

    @Autowired
    public ReciptService(ReciptRepository reciptRepository) {
        this.reciptRepository = reciptRepository;
    }

    public List<Recipt> getRecipt() {
        return reciptRepository.findAll();
    }

    public void addNewRecipt(Recipt recipt) {
        try {
            reciptRepository.save(recipt);
        } catch (IllegalStateException e) {
            System.out.println("klucz już istnieje");//todo ogarnąć to
        }
    }

    public void deleteRecipt(Long reciptId) {
        boolean exists = reciptRepository.existsById(reciptId);
        if(!exists) {
            throw new IllegalStateException(
                    "recipt with id " + reciptId + " does not exist!"
            );
        }
        reciptRepository.deleteById(reciptId);
    }
}
