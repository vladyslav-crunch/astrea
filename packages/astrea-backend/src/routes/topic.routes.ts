import {Router} from 'express';
import {
    createTopic,
    getTopics,
    getTopic,
    updateTopic,
    deleteTopic, getTopicsWithTaskCount,
} from '../controllers/topic.controller';
import {isAuthenticated} from '../middleware/isAuthenticated';

const router = Router();

router.use(isAuthenticated); // protect all topic routes

router.post('/', createTopic);
router.get('/', getTopics);
router.get('/with-task-stats', getTopicsWithTaskCount);
router.get('/:id', getTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;
