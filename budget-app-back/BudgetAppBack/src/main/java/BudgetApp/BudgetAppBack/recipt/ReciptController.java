package BudgetApp.BudgetAppBack.recipt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/recipt")
public class ReciptController {

    private final ReciptService reciptService;

    @Autowired
    public ReciptController(ReciptService reciptService) {
        this.reciptService = reciptService;
    }

    @GetMapping
    public List<Recipt> getRecipt() {
        return reciptService.getRecipt();
    }

    @PostMapping
    public void newRecipt(@RequestBody Recipt recipt) {
        try {
            reciptService.addNewRecipt(recipt);
        } catch (RuntimeException e) {
            //todo ogarnąć to, sprawdzić najpiew czy istnieje
        }
    }

    @DeleteMapping
    public void deleteRecipt(@PathVariable("reciptId") Long reciptId) {
        reciptService.deleteRecipt(reciptId);
    }
}
