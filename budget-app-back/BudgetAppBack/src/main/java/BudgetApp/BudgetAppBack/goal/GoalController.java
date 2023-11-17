package BudgetApp.BudgetAppBack.goal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/goal")
public class GoalController {
    private final GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<Goal> getGoal() {
        return goalService.getGoal();
    }

    @PostMapping
    public void newGoal(@RequestBody Goal goal) {
        try {
            goalService.addNewGoal(goal);
        } catch (RuntimeException e) {
            //todo ogarnąć to, sprawdzić najpiew czy istnieje
        }
    }

    @DeleteMapping
    public void deleteGoal(@PathVariable("goalId") Long goalId) {
        goalService.deleteGoal(goalId);
    }
}
