import {Router} from 'express';
import {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal, getGoal, getGoalsByTopicWithStats, reorderGoals, getDefaultGoal,
} from '../controllers/goal.controller';
import {isAuthenticated} from '../middleware/isAuthenticated';


const router = Router();

router.use(isAuthenticated);


router.get('/', getGoals);
router.patch('/reorder', reorderGoals);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);
router.post('/topic/:topicId', createGoal);
router.get('/topic/:topicId', getGoalsByTopicWithStats);
router.get('/topic/:topicId/drafts', getDefaultGoal);


export default router;
