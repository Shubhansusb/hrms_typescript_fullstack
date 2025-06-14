// // import { useEffect, useState } from 'react';
// // import api, { BACKEND_URL } from '../services/api';

// // interface DailyReport {
// // 	id: string;
// // 	employee: { name: string; email: string };
// // 	reportDate: string;
// // 	description: string;
// // 	screenshot1?: string;
// // 	screenshot2?: string;
// // 	screenshot3?: string;
// // }

// // const AdminReportList = () => {
// // 	const [reports, setReports] = useState<DailyReport[]>([]);
// // 	const [error, setError] = useState<string | null>(null);

// // 	useEffect(() => {
// // 		const fetchReports = async () => {
// // 			try {
// // 				const response = await api.get('/reports/admin');
// // 				setReports(response.data);
// // 			} catch (err: any) {
// // 				setError(err.response?.data?.message || 'Failed to fetch reports');
// // 			}
// // 		};
// // 		fetchReports();
// // 	}, []);

// // 	if (error) {
// // 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// // 	}

// // 	return (
// // 		<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// // 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
// // 				Employee Daily Reports
// // 			</h2>
// // 			{reports.length === 0 ? (
// // 				<p className='text-gray-600'>No reports submitted yet.</p>
// // 			) : (
// // 				<div className='space-y-4'>
// // 					{reports.map((report) => (
// // 						<div
// // 							key={report.id}
// // 							className='p-4 border rounded-lg shadow-sm'
// // 						>
// // 							<p className='text-gray-600'>
// // 								<span className='font-medium'>Employee:</span>{' '}
// // 								{report.employee.name} ({report.employee.email})
// // 							</p>
// // 							<p className='text-gray-600'>
// // 								<span className='font-medium'>Date:</span>{' '}
// // 								{new Date(report.reportDate).toLocaleDateString()}
// // 							</p>
// // 							<p className='text-gray-600'>
// // 								<span className='font-medium'>Description:</span>{' '}
// // 								{report.description}
// // 							</p>
// // 							<div className='mt-2 space-x-4'>
// // 								{report.screenshot1 && (
// // 									<img
// // 										src={`${BACKEND_URL}/uploads/${report.screenshot1
// // 											.split('/')
// // 											.pop()}`}
// // 										alt='Screenshot 1'
// // 										className='inline-block w-24 h-24 object-cover rounded-lg'
// // 									/>
// // 								)}
// // 								{report.screenshot2 && (
// // 									<img
// // 										src={`${BACKEND_URL}/uploads/${report.screenshot2
// // 											.split('/')
// // 											.pop()}`}
// // 										alt='Screenshot 2'
// // 										className='inline-block w-24 h-24 object-cover rounded-lg'
// // 									/>
// // 								)}
// // 								{report.screenshot3 && (
// // 									<img
// // 										src={`${BACKEND_URL}/uploads/${report.screenshot3
// // 											.split('/')
// // 											.pop()}`}
// // 										alt='Screenshot 3'
// // 										className='inline-block w-24 h-24 object-cover rounded-lg'
// // 									/>
// // 								)}
// // 							</div>
// // 						</div>
// // 					))}
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default AdminReportList;
// import { useEffect, useState } from 'react';
// import api, { BACKEND_URL } from '../services/api';
// import { Calendar, Image as ImageIcon, User } from 'lucide-react';

// interface DailyReport {
// 	id: string;
// 	employee: { name: string; email: string };
// 	reportDate: string;
// 	description: string;
// 	screenshot1?: string;
// 	screenshot2?: string;
// 	screenshot3?: string;
// }

// const AdminReportList = () => {
// 	const [reports, setReports] = useState<DailyReport[]>([]);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchReports = async () => {
// 			try {
// 				const response = await api.get('/reports/admin');
// 				setReports(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch reports');
// 			}
// 		};
// 		fetchReports();
// 	}, []);

// 	if (error) {
// 		return (
// 			<div className='text-center p-8 text-red-500 dark:text-red-400'>
// 				{error}
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className='max-w-7xl mx-auto p-6'>
// 			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
// 				<ImageIcon className='w-6 h-6 text-blue-600' />
// 				Employee Daily Reports
// 			</h2>
// 			{reports.length === 0 ? (
// 				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
// 					No reports submitted yet.
// 				</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{reports.map((report, index) => (
// 						<div
// 							key={report.id}
// 							className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700 ${
// 								index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
// 							}`}
// 						>
// 							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
// 								<div>
// 									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
// 										<User className='w-4 h-4' />
// 										<p className='font-medium text-gray-900 dark:text-gray-100'>
// 											{report.employee.name}
// 										</p>
// 									</div>
// 									<p className='text-sm text-gray-500 dark:text-gray-400'>
// 										{report.employee.email}
// 									</p>
// 								</div>
// 								<div>
// 									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
// 										<Calendar className='w-4 h-4' />
// 										<p className='text-sm'>
// 											<span className='font-medium text-gray-900 dark:text-gray-100'>
// 												Date:
// 											</span>{' '}
// 											{new Date(report.reportDate).toLocaleDateString()}
// 										</p>
// 									</div>
// 									<p className='text-sm text-gray-600 dark:text-gray-300'>
// 										<span className='font-medium text-gray-900 dark:text-gray-100'>
// 											Description:
// 										</span>{' '}
// 										{report.description}
// 									</p>
// 								</div>
// 								<div className='flex gap-2 flex-wrap'>
// 									{report.screenshot1 && (
// 										<a
// 											href={`${BACKEND_URL}/uploads/${report.screenshot1
// 												.split('/')
// 												.pop()}`}
// 											target='_blank'
// 											rel='noopener noreferrer'
// 										>
// 											<img
// 												src={`${BACKEND_URL}/uploads/${report.screenshot1
// 													.split('/')
// 													.pop()}`}
// 												alt='Screenshot 1'
// 												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
// 											/>
// 										</a>
// 									)}
// 									{report.screenshot2 && (
// 										<a
// 											href={`${BACKEND_URL}/uploads/${report.screenshot2
// 												.split('/')
// 												.pop()}`}
// 											target='_blank'
// 											rel='noopener noreferrer'
// 										>
// 											<img
// 												src={`${BACKEND_URL}/uploads/${report.screenshot2
// 													.split('/')
// 													.pop()}`}
// 												alt='Screenshot 2'
// 												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
// 											/>
// 										</a>
// 									)}
// 									{report.screenshot3 && (
// 										<a
// 											href={`${BACKEND_URL}/uploads/${report.screenshot3
// 												.split('/')
// 												.pop()}`}
// 											target='_blank'
// 											rel='noopener noreferrer'
// 										>
// 											<img
// 												src={`${BACKEND_URL}/uploads/${report.screenshot3
// 													.split('/')
// 													.pop()}`}
// 												alt='Screenshot 3'
// 												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
// 											/>
// 										</a>
// 									)}
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default AdminReportList;
import { useEffect, useState } from 'react';
import api, { BACKEND_URL } from '../services/api';
import { Calendar, Image as ImageIcon, User } from 'lucide-react';

interface DailyReport {
	id: string;
	employee: { name: string; email: string };
	reportDate: string;
	description: string;
	screenshot1?: string;
	screenshot2?: string;
	screenshot3?: string;
}

const AdminReportList = () => {
	const [reports, setReports] = useState<DailyReport[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await api.get('/reports/admin');
				setReports(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch reports');
			}
		};
		fetchReports();
	}, []);

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
				<ImageIcon className='w-6 h-6 text-blue-600' />
				Employee Daily Reports
			</h2>
			{reports.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No reports submitted yet.
				</p>
			) : (
				<div className='space-y-4'>
					{reports.map((report, index) => (
						<div
							key={report.id}
							className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700 ${
								index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
							}`}
						>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
										<User className='w-4 h-4' />
										<p className='font-medium text-gray-900 dark:text-gray-100'>
											{report.employee.name}
										</p>
									</div>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										{report.employee.email}
									</p>
								</div>
								<div>
									<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
										<Calendar className='w-4 h-4' />
										<p className='text-sm'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												Date:
											</span>{' '}
											{new Date(report.reportDate).toLocaleDateString()}
										</p>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-300'>
										<span className='font-medium text-gray-900 dark:text-gray-100'>
											Description:
										</span>{' '}
										{report.description}
									</p>
								</div>
								<div className='flex gap-2 flex-wrap'>
									{report.screenshot1 && (
										<a
											href={`${BACKEND_URL}/uploads/${report.screenshot1
												.split('/')
												.pop()}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<img
												src={`${BACKEND_URL}/uploads/${report.screenshot1
													.split('/')
													.pop()}`}
												alt='Screenshot 1'
												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
											/>
										</a>
									)}
									{report.screenshot2 && (
										<a
											href={`${BACKEND_URL}/uploads/${report.screenshot2
												.split('/')
												.pop()}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<img
												src={`${BACKEND_URL}/uploads/${report.screenshot2
													.split('/')
													.pop()}`}
												alt='Screenshot 2'
												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
											/>
										</a>
									)}
									{report.screenshot3 && (
										<a
											href={`${BACKEND_URL}/uploads/${report.screenshot3
												.split('/')
												.pop()}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<img
												src={`${BACKEND_URL}/uploads/${report.screenshot3
													.split('/')
													.pop()}`}
												alt='Screenshot 3'
												className='w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
											/>
										</a>
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

export default AdminReportList;