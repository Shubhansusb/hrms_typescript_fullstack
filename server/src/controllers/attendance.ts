import { Request, Response } from 'express';
import { prisma } from '../models/prisma';
import type { Employee } from '../models/employee';

export const punchIn = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId: user.id,
        punchIn: { gte: today },
      },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already punched in today' });
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId: user.id,
        punchIn: new Date(),
      },
    });
    res.status(201).json(attendance);
  } catch (error: any) {
    res.status(500).json({ message: 'Error punching in', error: error.message });
  }
};

export const punchOut = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
      where: {
        employeeId: user.id,
        punchIn: { gte: today },
        punchOut: null,
      },
    });

    if (!attendance) {
      return res.status(400).json({ message: 'No punch-in record found for today' });
    }

    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: { punchOut: new Date() },
    });
    res.json(updatedAttendance);
  } catch (error: any) {
    res.status(500).json({ message: 'Error punching out', error: error.message });
  }
};

export const getAttendance = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;

  try {
    const attendances = await prisma.attendance.findMany({
      where: { employeeId: user.id },
    });
    res.json(attendances);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};