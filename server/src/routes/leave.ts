import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { applyLeave, getAllLeaves, getLeaves, updateLeaveStatus } from '../controllers/leave';

const router = Router();

router.get('/', authenticate, getLeaves);
router.get('/admin', authenticate, authorizeAdmin, getAllLeaves);
router.post('/apply', authenticate, applyLeave);
router.put('/:id/status', authenticate, authorizeAdmin, updateLeaveStatus);

export default router;