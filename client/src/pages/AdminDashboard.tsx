// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';
// import { Users, Calendar, FileText, Plus } from 'lucide-react';

// interface Stats {
// 	totalEmployees: number;
// 	pendingLeaves: number;
// }

// const AdminDashboard = () => {
// 	const [stats, setStats] = useState<Stats>({
// 		totalEmployees: 0,
// 		pendingLeaves: 0,
// 	});
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchStats = async () => {
// 			try {
// 				const [employeesRes, leavesRes] = await Promise.all([
// 					api.get('/employees'),
// 					api.get('/leaves/admin'),
// 				]);
// 				const totalEmployees = employeesRes.data.length;
// 				const pendingLeaves = leavesRes.data.filter(
// 					(leave: any) => leave.status === 'Pending'
// 				).length;
// 				setStats({ totalEmployees, pendingLeaves });
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch stats');
// 			}
// 		};
// 		fetchStats();
// 	}, []);

// 	if (error) {
// 		return (
// 			<div className='text-center p-8 text-red-500 dark:text-red-400'>
// 				{error}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='max-w-5xl mx-auto p-6'>
// 			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
// 				<Users className='w-6 h-6 text-blue-600' />
// 				Admin Dashboard
// 			</h2>
// 			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
// 				<div className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200'>
// 					<div className='flex items-center gap-2 mb-2'>
// 						<Users className='w-5 h-5 text-blue-600' />
// 						<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
// 							Total Employees
// 						</h3>
// 					</div>
// 					<p className='text-3xl font-bold text-blue-600 dark:text-blue-500'>
// 						{stats.totalEmployees}
// 					</p>
// 				</div>
// 				<div className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200'>
// 					<div className='flex items-center gap-2 mb-2'>
// 						<Calendar className='w-5 h-5 text-blue-600' />
// 						<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
// 							Pending Leave Requests
// 						</h3>
// 					</div>
// 					<p className='text-3xl font-bold text-blue-600 dark:text-blue-500'>
// 						{stats.pendingLeaves}
// 					</p>
// 				</div>
// 			</div>
// 			<div className='space-y-4'>
// 				<Link
// 					to='/employees'
// 					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
// 				>
// 					<Users className='w-5 h-5' />
// 					View All Employees
// 				</Link>
// 				<Link
// 					to='/leaves/admin'
// 					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
// 				>
// 					<Calendar className='w-5 h-5' />
// 					Manage Leave Requests
// 				</Link>
// 				<Link
// 					to='/employees/new'
// 					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
// 				>
// 					<Plus className='w-5 h-5' />
// 					Add New Employee
// 				</Link>
// 				<Link
// 					to='/reports/admin'
// 					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
// 				>
// 					<FileText className='w-5 h-5' />
// 					View Employee Reports
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default AdminDashboard;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Users, Calendar, FileText, Plus } from 'lucide-react';

interface Stats {
	totalEmployees: number;
	pendingLeaves: number;
}

const AdminDashboard = () => {
	const [stats, setStats] = useState<Stats>({
		totalEmployees: 0,
		pendingLeaves: 0,
	});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					throw new Error('No authentication token found');
				}
				const [employeesRes, leavesRes] = await Promise.all([
					api.get('/employees', {
						headers: { Authorization: `Bearer ${token}` },
					}),
					api.get('/leaves/admin', {
						headers: { Authorization: `Bearer ${token}` },
					}),
				]);
				const totalEmployees = employeesRes.data.length;
				const pendingLeaves = leavesRes.data.filter(
					(leave: any) => leave.status === 'Pending'
				).length;
				setStats({ totalEmployees, pendingLeaves });
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch stats');
			}
		};
		fetchStats();
	}, []);

	if (error) {
		return (
			<div className='text-center p-8 text-red-500 dark:text-red-400'>
				{error}
			</div>
		);
	}

	return (
		<div className='max-w-5xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<Users className='w-6 h-6 text-blue-600' />
				Admin Dashboard
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
				<div className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200'>
					<div className='flex items-center gap-2 mb-2'>
						<Users className='w-5 h-5 text-blue-600' />
						<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
							Total Employees
						</h3>
					</div>
					<p className='text-3xl font-bold text-blue-600 dark:text-blue-500'>
						{stats.totalEmployees}
					</p>
				</div>
				<div className='p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200'>
					<div className='flex items-center gap-2 mb-2'>
						<Calendar className='w-5 h-5 text-blue-600' />
						<h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
							Pending Leave Requests
						</h3>
					</div>
					<p className='text-3xl font-bold text-blue-600 dark:text-blue-500'>
						{stats.pendingLeaves}
					</p>
				</div>
			</div>
			<div className='space-y-4'>
				<Link
					to='/employees'
					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Users className='w-5 h-5' />
					View All Employees
				</Link>
				<Link
					to='/leaves/admin'
					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Calendar className='w-5 h-5' />
					Manage Leave Requests
				</Link>
				<Link
					to='/employees/new'
					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Plus className='w-5 h-5' />
					Add New Employee
				</Link>
				<Link
					to='/reports/admin'
					className='block p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<FileText className='w-5 h-5' />
					View Employee Reports
				</Link>
			</div>
		</div>
	);
};

export default AdminDashboard;