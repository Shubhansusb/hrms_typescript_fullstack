export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export type Leave = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
  updatedAt: string;
};