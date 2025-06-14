// import { useEffect, useState } from 'react';
// import api from '../services/api';

// interface Leave {
// 	id: string;
// 	startDate: string;
// 	endDate: string;
// 	reason: string;
// 	status: string;
// }

// const LeaveList = () => {
// 	const [leaves, setLeaves] = useState<Leave[]>([]);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchLeaves = async () => {
// 			try {
// 				const response = await api.get('/leaves');
// 				setLeaves(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch leaves');
// 			}
// 		};
// 		fetchLeaves();
// 	}, []);

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	return (
// 		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>My Leaves</h2>
// 			{leaves.length === 0 ? (
// 				<p className='text-gray-600'>No leaves found.</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{leaves.map((leave) => (
// 						<div
// 							key={leave.id}
// 							className='p-4 border rounded-lg shadow-sm'
// 						>
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
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default LeaveList;
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Calendar } from 'lucide-react';

interface Leave {
	id: string;
	startDate: string;
	endDate: string;
	reason: string;
	status: string;
}

const LeaveList = () => {
	const [leaves, setLeaves] = useState<Leave[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeaves = async () => {
			try {
				const response = await api.get('/leaves');
				setLeaves(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch leaves');
			}
		};
		fetchLeaves();
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
				<Calendar className='w-6 h-6 text-blue-600' />
				My Leaves
			</h2>
			{leaves.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No leaves found.
				</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{leaves.map((leave) => (
						<div
							key={leave.id}
							className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700'
						>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
								<Calendar className='w-4 h-4' />
								<p className='text-sm'>
									<span className='font-medium text-gray-900 dark:text-gray-100'>
										Start:
									</span>{' '}
									{new Date(leave.startDate).toLocaleDateString()}
								</p>
							</div>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
								<Calendar className='w-4 h-4' />
								<p className='text-sm'>
									<span className='font-medium text-gray-900 dark:text-gray-100'>
										End:
									</span>{' '}
									{new Date(leave.endDate).toLocaleDateString()}
								</p>
							</div>
							<p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									Reason:
								</span>{' '}
								{leave.reason}
							</p>
							<p className='text-sm'>
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
					))}
				</div>
			)}
		</div>
	);
};

export default LeaveList;