// import { Router } from 'express';
// import { authenticate } from '../middleware/auth';
// import { getReports, submitReport } from '../controllers/report';

// const router = Router();

// router.post('/submit', authenticate, submitReport);
// router.get('/', authenticate, getReports);

// export default router;
import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { getReports, submitReport, getAllReports } from '../controllers/report';

const router = Router();

router.post('/submit', authenticate, submitReport);
router.get('/', authenticate, getReports);
router.get('/admin', authenticate, authorizeAdmin, getAllReports);

export default router;