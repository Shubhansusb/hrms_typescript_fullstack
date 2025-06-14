import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth';
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee, uploadDocuments } from '../controllers/employee';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getEmployees);
router.get('/:id', authenticate, authorizeAdmin, getEmployeeById);
router.post('/', authenticate, authorizeAdmin, createEmployee);
router.put('/:id', authenticate, authorizeAdmin, updateEmployee);
router.delete('/:id', authenticate, authorizeAdmin, deleteEmployee);
router.post('/upload-documents', authenticate, uploadDocuments);

export default router;