package BudgetApp.BudgetAppBack.operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/vi/operation")
public class OperationController {
    private final OperationService operationService;

    @Autowired
    public OperationController(OperationService operationService) {
        this.operationService = operationService;
    }

    @GetMapping
    public List<Operation> getOperation() {
        return operationService.getOperation();
    }

    @PostMapping
    public void newOperation(@RequestBody Operation operation) {
        try {
            operationService.addNewOperation(operation);
        } catch (RuntimeException e) {
            //todo ogarnąć to, sprawdzić najpiew czy istnieje
        }
    }

    @DeleteMapping
    public void deleteOperation(@PathVariable("operationId") Long operationId) {
        operationService.deleteOperation(operationId);
    }

}
