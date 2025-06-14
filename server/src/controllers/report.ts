import { Request, Response } from 'express';
import { prisma } from '../models/prisma';
import { upload } from '../middleware/multer';
import type { Employee } from '../models/employee';

export const submitReport = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;
  const uploadFields = upload.fields([
    { name: 'screenshot1', maxCount: 1 },
    { name: 'screenshot2', maxCount: 1 },
    { name: 'screenshot3', maxCount: 1 },
  ]);

  uploadFields(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    try {
      const { description, reportDate } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const report = await prisma.dailyReport.create({
        data: {
          employeeId: user.id,
          reportDate: new Date(reportDate),
          description,
          screenshot1: files.screenshot1 ? files.screenshot1[0].path : undefined,
          screenshot2: files.screenshot2 ? files.screenshot2[0].path : undefined,
          screenshot3: files.screenshot3 ? files.screenshot3[0].path : undefined,
        },
      });
      res.status(201).json(report);
    } catch (error: any) {
      res.status(500).json({ message: 'Error submitting report', error: error.message });
    }
  });
};

export const getReports = async (req: Request, res: Response) => {
  const user = (req as any).user as Employee;

  try {
    const reports = await prisma.dailyReport.findMany({
      where: { employeeId: user.id },
    });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await prisma.dailyReport.findMany({
      include: {
        employee: {
          select: { name: true, email: true },
        },
      },
    });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching all reports', error: error.message });
  }
};