import { Request, Response } from 'express';
import { prisma } from '../models/prisma';
import type { Employee } from '../models/employee';
import { upload } from '../middleware/multer';

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'Employee',
      },
    });
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  try {
    const employee = await prisma.employee.update({
      where: { id },
      data: { name, email, role },
    });
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({ where: { id } });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};

export const uploadDocuments = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;
  const uploadFields = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'marksheets', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
  ]);

  uploadFields(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const updateData: any = {};
      if (files.profileImage) updateData.profileImage = files.profileImage[0].path;
      if (files.marksheets) updateData.marksheets = files.marksheets[0].path;
      if (files.aadharCard) updateData.aadharCard = files.aadharCard[0].path;
      if (files.panCard) updateData.panCard = files.panCard[0].path;

      const employee = await prisma.employee.update({
        where: { id: user.id },
        data: updateData,
      });
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ message: 'Error uploading documents', error: error.message });
    }
  });
};