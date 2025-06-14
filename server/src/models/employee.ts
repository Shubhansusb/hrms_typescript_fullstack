export interface Employee {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  marksheets?: string;
  aadharCard?: string;
  panCard?: string;
}