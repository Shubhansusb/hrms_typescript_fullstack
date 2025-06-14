import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	if (!user) {
		return (
			<div className='text-center p-8 text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2'>
				<Loader2 className='w-6 h-6 animate-spin text-blue-600 dark:text-blue-400' />
				Loading...
			</div>
		);
	}

	return user.role === 'Admin' ? <AdminDashboard /> : <EmployeeDashboard />;
};

export default Dashboard;
