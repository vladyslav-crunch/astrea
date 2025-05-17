import {Router} from 'express';
import {isAuthenticated} from '../middleware/isAuthenticated';
import {
    createTask,
    getTasks,
    getTasksByTopic,
    getTasksByGoal,
    updateTask,
    deleteTask, getTaskById,
} from '../controllers/task.controller';

const router = Router();

router.use(isAuthenticated);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.get('/topic/:topicId', getTasksByTopic);
router.get('/goal/:goalId', getTasksByGoal);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
