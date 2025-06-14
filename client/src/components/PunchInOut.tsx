// import { useEffect, useState } from 'react';
// import api from '../services/api';

// interface Attendance {
// 	id: string;
// 	punchIn: string;
// 	punchOut?: string;
// }

// const PunchInOut = () => {
// 	const [attendance, setAttendance] = useState<Attendance[]>([]);
// 	const [error, setError] = useState<string | null>(null);
// 	const [message, setMessage] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchAttendance = async () => {
// 			try {
// 				const response = await api.get('/attendance');
// 				setAttendance(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch attendance');
// 			}
// 		};
// 		fetchAttendance();
// 	}, []);

// 	const handlePunchIn = async () => {
// 		try {
// 			const response = await api.post('/attendance/punch-in');
// 			setAttendance([...attendance, response.data]);
// 			setMessage('Punched in successfully');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to punch in');
// 		}
// 	};

// 	const handlePunchOut = async (id: string) => {
// 		try {
// 			const response = await api.post('/attendance/punch-out');
// 			setAttendance(
// 				attendance.map((att) => (att.id === id ? response.data : att))
// 			);
// 			setMessage('Punched out successfully');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to punch out');
// 		}
// 	};

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	const todayAttendance = attendance.find((att) => {
// 		const punchInDate = new Date(att.punchIn).toDateString();
// 		return punchInDate === new Date().toDateString();
// 	});

// 	return (
// 		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Attendance</h2>
// 			{message && <p className='text-green-500 mb-4'>{message}</p>}
// 			<div className='mb-6'>
// 				{todayAttendance ? (
// 					todayAttendance.punchOut ? (
// 						<p className='text-gray-600'>You have already punched out today.</p>
// 					) : (
// 						<button
// 							onClick={() => handlePunchOut(todayAttendance.id)}
// 							className='py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300'
// 						>
// 							Punch Out
// 						</button>
// 					)
// 				) : (
// 					<button
// 						onClick={handlePunchIn}
// 						className='py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300'
// 					>
// 						Punch In
// 					</button>
// 				)}
// 			</div>
// 			<h3 className='text-lg font-semibold text-gray-800 mb-4'>
// 				Attendance History
// 			</h3>
// 			{attendance.length === 0 ? (
// 				<p className='text-gray-600'>No attendance records found.</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{attendance.map((att) => (
// 						<div
// 							key={att.id}
// 							className='p-4 border rounded-lg shadow-sm'
// 						>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Punch In:</span>{' '}
// 								{new Date(att.punchIn).toLocaleString()}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Punch Out:</span>{' '}
// 								{att.punchOut
// 									? new Date(att.punchOut).toLocaleString()
// 									: 'Not punched out'}
// 							</p>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default PunchInOut;
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Clock } from 'lucide-react';

interface Attendance {
	id: string;
	punchIn: string;
	punchOut?: string;
}

const PunchInOut = () => {
	const [attendance, setAttendance] = useState<Attendance[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchAttendance = async () => {
			try {
				const response = await api.get('/attendance');
				setAttendance(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch attendance');
			}
		};
		fetchAttendance();
	}, []);

	const handlePunchIn = async () => {
		try {
			const response = await api.post('/attendance/punch-in');
			setAttendance([...attendance, response.data]);
			setMessage('Punched in successfully');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to punch in');
		}
	};

	const handlePunchOut = async (id: string) => {
		try {
			const response = await api.post('/attendance/punch-out');
			setAttendance(
				attendance.map((att) => (att.id === id ? response.data : att))
			);
			setMessage('Punched out successfully');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to punch out');
		}
	};

	if (error) {
		return (
			<div className='text-center p-8 text-red-500 dark:text-red-400'>
				{error}
			</div>
		);
	}

	const todayAttendance = attendance.find((att) => {
		const punchInDate = new Date(att.punchIn).toDateString();
		return punchInDate === new Date().toDateString();
	});

	return (
		<div className='max-w-5xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<Clock className='w-6 h-6 text-blue-600' />
				Attendance
			</h2>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-8'>
				{message && (
					<p className='text-green-500 dark:text-green-400 mb-4 text-sm'>
						{message}
					</p>
				)}
				<div className='mb-6'>
					{todayAttendance ? (
						todayAttendance.punchOut ? (
							<p className='text-gray-600 dark:text-gray-300 text-center'>
								You have already punched out today.
							</p>
						) : (
							<button
								onClick={() => handlePunchOut(todayAttendance.id)}
								className='w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
							>
								<Clock className='w-5 h-5' />
								Punch Out
							</button>
						)
					) : (
						<button
							onClick={handlePunchIn}
							className='w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
						>
							<Clock className='w-5 h-5' />
							Punch In
						</button>
					)}
				</div>
			</div>
			<h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
				Attendance History
			</h3>
			{attendance.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No attendance records found.
				</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{attendance.map((att, index) => (
						<div
							key={att.id}
							className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700 ${
								index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
							}`}
						>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
								<Clock className='w-4 h-4' />
								<p className='text-sm'>
									<span className='font-medium text-gray-900 dark:text-gray-100'>
										Punch In:
									</span>{' '}
									{new Date(att.punchIn).toLocaleString()}
								</p>
							</div>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
								<Clock className='w-4 h-4' />
								<p className='text-sm'>
									<span className='font-medium text-gray-900 dark:text-gray-100'>
										Punch Out:
									</span>{' '}
									{att.punchOut
										? new Date(att.punchOut).toLocaleString()
										: 'Not punched out'}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default PunchInOut;