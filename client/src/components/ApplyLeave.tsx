// import { useState } from 'react';
// import api from '../services/api';

// const ApplyLeave = () => {
// 	const [startDate, setStartDate] = useState('');
// 	const [endDate, setEndDate] = useState('');
// 	const [reason, setReason] = useState('');
// 	const [error, setError] = useState<string | null>(null);
// 	const [success, setSuccess] = useState<string | null>(null);

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			await api.post('/leaves/apply', { startDate, endDate, reason });
// 			setSuccess('Leave applied successfully');
// 			setStartDate('');
// 			setEndDate('');
// 			setReason('');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to apply for leave');
// 		}
// 	};

// 	return (
// 		<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Apply for Leave</h2>
// 			{error && <p className='text-red-500 mb-4'>{error}</p>}
// 			{success && <p className='text-green-500 mb-4'>{success}</p>}
// 			<form
// 				onSubmit={handleSubmit}
// 				className='space-y-4'
// 			>
// 				<div>
// 					<label className='block text-gray-700'>Start Date</label>
// 					<input
// 						type='date'
// 						value={startDate}
// 						onChange={(e) => setStartDate(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>End Date</label>
// 					<input
// 						type='date'
// 						value={endDate}
// 						onChange={(e) => setEndDate(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Reason</label>
// 					<textarea
// 						value={reason}
// 						onChange={(e) => setReason(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<button
// 					type='submit'
// 					className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300'
// 				>
// 					Apply
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default ApplyLeave;
import { useState } from 'react';
import api from '../services/api';
import { Calendar, Send } from 'lucide-react';

const ApplyLeave = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [reason, setReason] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post('/leaves/apply', { startDate, endDate, reason });
			setSuccess('Leave applied successfully');
			setStartDate('');
			setEndDate('');
			setReason('');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to apply for leave');
		}
	};

	return (
		<div className='max-w-lg mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<Calendar className='w-6 h-6 text-blue-600' />
				Apply for Leave
			</h2>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700'>
				{error && (
					<p className='text-red-500 dark:text-red-400 mb-4 text-sm'>{error}</p>
				)}
				{success && (
					<p className='text-green-500 dark:text-green-400 mb-4 text-sm'>
						{success}
					</p>
				)}
				<form
					onSubmit={handleSubmit}
					className='space-y-5'
				>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Start Date
						</label>
						<input
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							End Date
						</label>
						<input
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Reason
						</label>
						<textarea
							value={reason}
							onChange={(e) => setReason(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none h-32'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						<Send className='w-5 h-5' />
						Apply
					</button>
				</form>
			</div>
		</div>
	);
};

export default ApplyLeave;