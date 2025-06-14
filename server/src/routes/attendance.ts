import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getAttendance, punchIn, punchOut } from '../controllers/attendance';

const router = Router();

router.post('/punch-in', authenticate, punchIn);
router.post('/punch-out', authenticate, punchOut);
router.get('/', authenticate, getAttendance);

export default router;