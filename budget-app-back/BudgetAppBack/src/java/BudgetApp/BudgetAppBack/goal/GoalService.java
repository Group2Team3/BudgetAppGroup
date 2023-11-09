package BudgetApp.BudgetAppBack.goal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    @Autowired
    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public List<Goal> getGoal() {
        return goalRepository.findAll();
    }

    public void addNewGoal(Goal goal) {
        try {
            goalRepository.save(goal);
        } catch (IllegalStateException e) {
            System.out.println("cel już istnieje");//todo ogarnąć to
        }
    }
    
    public void deleteGoal(Long goalId) {
        boolean exists = goalRepository.existsById(goalId);
        if(!exists) {
            throw new IllegalStateException(
                    "goal with id " + goalId + " does not exists!"
            );
        }
        goalRepository.deleteById(goalId);
    }
}
