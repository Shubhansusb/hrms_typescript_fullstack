import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/prisma';
import type { Employee } from '../models/employee';

export const register = async (req: Request, res: Response) => {
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

    const token = jwt.sign({ id: employee.id, email: employee.email, role: employee.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ token, employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const employee = await prisma.employee.findUnique({ where: { email } });
    if (!employee) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: employee.id, email: employee.email, role: employee.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token, employee: { id: employee.id, name: employee.name, email: employee.email, role: employee.role } });
  } catch (error: any) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};