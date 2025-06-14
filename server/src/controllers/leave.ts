import { Request, Response } from 'express';
import { prisma } from '../models/prisma';
import type { Employee } from '../models/employee';

export const getLeaves = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;

  try {
    const leaves = await prisma.leave.findMany({
      where: { employeeId: user.id },
    });
    res.json(leaves);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching leaves', error: error.message });
  }
};

export const getAllLeaves = async (req: Request, res: Response) => {
  try {
    const leaves = await prisma.leave.findMany({
      include: { employee: { select: { name: true, email: true } } },
    });
    res.json(leaves);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching all leaves', error: error.message });
  }
};

export const applyLeave = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;
  const { startDate, endDate, reason } = req.body;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    if (start > end) {
      return res.status(400).json({ message: 'Start date must be before or equal to end date' });
    }

    const leave = await prisma.leave.create({
      data: {
        employeeId: user.id,
        startDate: start,
        endDate: end,
        reason,
        status: 'Pending',
      },
    });
    res.status(201).json(leave);
  } catch (error: any) {
    res.status(500).json({ message: 'Error applying for leave', error: error.message });
  }
};

export const updateLeaveStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const leave = await prisma.leave.findUnique({ where: { id } });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    const updatedLeave = await prisma.leave.update({
      where: { id },
      data: { status },
    });
    res.json(updatedLeave);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating leave status', error: error.message });
  }
};