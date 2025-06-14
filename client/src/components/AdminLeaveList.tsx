// import { useEffect, useState } from 'react';
// import api from '../services/api';

// interface Leave {
// 	id: string;
// 	employee: { name: string; email: string };
// 	startDate: string;
// 	endDate: string;
// 	reason: string;
// 	status: string;
// }

// const AdminLeaveList = () => {
// 	const [leaves, setLeaves] = useState<Leave[]>([]);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchLeaves = async () => {
// 			try {
// 				const response = await api.get('/leaves/admin');
// 				setLeaves(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch leaves');
// 			}
// 		};
// 		fetchLeaves();
// 	}, []);

// 	const handleStatusUpdate = async (
// 		id: string,
// 		status: 'Approved' | 'Rejected'
// 	) => {
// 		try {
// 			await api.put(`/leaves/${id}/status`, { status });
// 			setLeaves((prev) =>
// 				prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
// 			);
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to update leave status');
// 		}
// 	};

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	return (
// 		<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Leave Requests</h2>
// 			{leaves.length === 0 ? (
// 				<p className='text-gray-600'>No leave requests found.</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{leaves.map((leave) => (
// 						<div
// 							key={leave.id}
// 							className='p-4 border rounded-lg shadow-sm'
// 						>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Employee:</span>{' '}
// 								{leave.employee.name} ({leave.employee.email})
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Start Date:</span>{' '}
// 								{new Date(leave.startDate).toLocaleDateString()}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>End Date:</span>{' '}
// 								{new Date(leave.endDate).toLocaleDateString()}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Reason:</span> {leave.reason}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Status:</span> {leave.status}
// 							</p>
// 							{leave.status === 'Pending' && (
// 								<div className='mt-2 space-x-2'>
// 									<button
// 										onClick={() => handleStatusUpdate(leave.id, 'Approved')}
// 										className='py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300'
// 									>
// 										Approve
// 									</button>
// 									<button
// 										onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
// 										className='py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300'
// 									>
// 										Reject
// 									</button>
// 								</div>
// 							)}
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default AdminLeaveList;
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Calendar, Clock, User } from 'lucide-react';

interface Leave {
	id: string;
	employee: { name: string; email: string };
	startDate: string;
	endDate: string;
	reason: string;
	status: string;
}

const AdminLeaveList = () => {
	const [leaves, setLeaves] = useState<Leave[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeaves = async () => {
			try {
				const response = await api.get('/leaves/admin');
				setLeaves(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch leaves');
			}
		};
		fetchLeaves();
	}, []);

	const handleStatusUpdate = async (
		id: string,
		status: 'Approved' | 'Rejected'
	) => {
		try {
			await api.put(`/leaves/${id}/status`, { status });
			setLeaves((prev) =>
				prev.map((leave) => (leave.id === id ? { ...leave, status } : leave))
			);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to update leave status');
		}
	};

	if (error) {
		return (
			<div className='text-center p-8 text-red-500 dark:text-red-400'>
				{error}
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<Clock className='w-6 h-6 text-blue-600' />
				Leave Requests
			</h2>
			{leaves.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No leave requests found.
				</p>
			) : (
				<div className='grid grid-cols-1 gap-4'>
					{leaves.map((leave) => (
						<div
							key={leave.id}
							className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700'
						>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
										<User className='w-4 h-4' />
										<p className='font-medium text-gray-900 dark:text-gray-100'>
											{leave.employee.name}
										</p>
									</div>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										{leave.employee.email}
									</p>
								</div>
								<div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
										<Calendar className='w-4 h-4' />
										<p className='text-sm'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												Start:
											</span>{' '}
											{new Date(leave.startDate).toLocaleDateString()}
										</p>
									</div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
										<Calendar className='w-4 h-4' />
										<p className='text-sm'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												End:
											</span>{' '}
											{new Date(leave.endDate).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div className='flex flex-col justify-between'>
									<div>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												Reason:
											</span>{' '}
											{leave.reason}
										</p>
										<p className='text-sm mt-1'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												Status:
											</span>{' '}
											<span
												className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
													leave.status === 'Approved'
														? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
														: leave.status === 'Rejected'
														? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
														: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
												}`}
											>
												{leave.status}
											</span>
										</p>
									</div>
									{leave.status === 'Pending' && (
										<div className='flex gap-2 mt-3'>
											<button
												onClick={() => handleStatusUpdate(leave.id, 'Approved')}
												className='flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
											>
												Approve
											</button>
											<button
												onClick={() => handleStatusUpdate(leave.id, 'Rejected')}
												className='flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
											>
												Reject
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AdminLeaveList;