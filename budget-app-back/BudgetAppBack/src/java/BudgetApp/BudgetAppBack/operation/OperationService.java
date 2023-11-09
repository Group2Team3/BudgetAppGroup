package BudgetApp.BudgetAppBack.operation;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperationService {
    private final OperationRepository operationRepository;

    @Autowired
    public OperationService(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    public List<Operation> getOperation() {
        return operationRepository.findAll();
    }

    public void addNewOperation(Operation operation) {
        try {
            operationRepository.save(operation);
        } catch (IllegalStateException e) {
            System.out.println("klucz już istnieje");//todo ogarnąć to
        }
    }

    public void deleteOperation(Long operationId) {
        boolean exists =  operationRepository.existsById(operationId);
        if(!exists) {
            throw new IllegalStateException(
                    "operation with id " + operationId + " does not exists!"
            );
        }
        operationRepository.deleteById(operationId);
    }
}
