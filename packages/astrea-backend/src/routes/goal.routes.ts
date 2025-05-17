import {Router} from 'express';
import {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal, getGoal, getGoalsByTopic,
} from '../controllers/goal.controller';
import {isAuthenticated} from '../middleware/isAuthenticated';


const router = Router();

router.use(isAuthenticated);

router.post('/', createGoal);
router.get('/', getGoals);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.get('/topic/:topicId', getGoalsByTopic);

export default router;
