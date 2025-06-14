// import { useState, useEffect } from 'react';
// import api, { BACKEND_URL } from '../services/api';

// interface DailyReport {
// 	id: string;
// 	reportDate: string;
// 	description: string;
// 	screenshot1?: string;
// 	screenshot2?: string;
// 	screenshot3?: string;
// }

// const DailyReportForm = () => {
// 	const [reportDate, setReportDate] = useState(
// 		new Date().toISOString().split('T')[0]
// 	);
// 	const [description, setDescription] = useState('');
// 	const [reports, setReports] = useState<DailyReport[]>([]);
// 	const [error, setError] = useState<string | null>(null);
// 	const [success, setSuccess] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchReports = async () => {
// 			try {
// 				const response = await api.get('/reports');
// 				setReports(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch reports');
// 			}
// 		};
// 		fetchReports();
// 	}, []);

// 	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();
// 		const formData = new FormData(e.currentTarget);
// 		formData.append('reportDate', reportDate);
// 		formData.append('description', description);

// 		try {
// 			const response = await api.post('/reports/submit', formData, {
// 				headers: { 'Content-Type': 'multipart/form-data' },
// 			});
// 			setReports([...reports, response.data]);
// 			setSuccess('Report submitted successfully');
// 			setDescription('');
// 			setReportDate(new Date().toISOString().split('T')[0]);
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to submit report');
// 		}
// 	};

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	return (
// 		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
// 				Submit Daily Report
// 			</h2>
// 			{success && <p className='text-green-500 mb-4'>{success}</p>}
// 			<form
// 				onSubmit={handleSubmit}
// 				className='space-y-4'
// 			>
// 				<div>
// 					<label className='block text-gray-700'>Report Date</label>
// 					<input
// 						type='date'
// 						value={reportDate}
// 						onChange={(e) => setReportDate(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Description</label>
// 					<textarea
// 						value={description}
// 						onChange={(e) => setDescription(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Screenshot 1</label>
// 					<input
// 						type='file'
// 						name='screenshot1'
// 						accept='image/*'
// 						className='w-full p-3 border rounded-lg'
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Screenshot 2</label>
// 					<input
// 						type='file'
// 						name='screenshot2'
// 						accept='image/*'
// 						className='w-full p-3 border rounded-lg'
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Screenshot 3</label>
// 					<input
// 						type='file'
// 						name='screenshot3'
// 						accept='image/*'
// 						className='w-full p-3 border rounded-lg'
// 					/>
// 				</div>
// 				<button
// 					type='submit'
// 					className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300'
// 				>
// 					Submit Report
// 				</button>
// 			</form>
// 			<h3 className='text-lg font-semibold text-gray-800 mt-8 mb-4'>
// 				Report History
// 			</h3>
// 			{reports.length === 0 ? (
// 				<p className='text-gray-600'>No reports found.</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{reports.map((report) => (
// 						<div
// 							key={report.id}
// 							className='p-4 border rounded-lg shadow-sm'
// 						>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Date:</span>{' '}
// 								{new Date(report.reportDate).toLocaleDateString()}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Description:</span>{' '}
// 								{report.description}
// 							</p>
// 							<div className='mt-2 space-x-4'>
// 								{report.screenshot1 && (
// 									<img
// 										src={`${BACKEND_URL}/uploads/${report.screenshot1
// 											.split('/')
// 											.pop()}`}
// 										alt='Screenshot 1'
// 										className='inline-block w-24 h-24 object-cover rounded-lg'
// 									/>
// 								)}
// 								{report.screenshot2 && (
// 									<img
// 										src={`${BACKEND_URL}/uploads/${report.screenshot2
// 											.split('/')
// 											.pop()}`}
// 										alt='Screenshot 2'
// 										className='inline-block w-24 h-24 object-cover rounded-lg'
// 									/>
// 								)}
// 								{report.screenshot3 && (
// 									<img
// 										src={`${BACKEND_URL}/uploads/${report.screenshot3
// 											.split('/')
// 											.pop()}`}
// 										alt='Screenshot 3'
// 										className='inline-block w-24 h-24 object-cover rounded-lg'
// 									/>
// 								)}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default DailyReportForm;
import { useState, useEffect } from 'react';
import api, { BACKEND_URL } from '../services/api';
import { Calendar, Image as ImageIcon, Send } from 'lucide-react';

interface DailyReport {
	id: string;
	reportDate: string;
	description: string;
	screenshot1?: string;
	screenshot2?: string;
	screenshot3?: string;
}

const DailyReportForm = () => {
	const [reportDate, setReportDate] = useState(
		new Date().toISOString().split('T')[0]
	);
	const [description, setDescription] = useState('');
	const [reports, setReports] = useState<DailyReport[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await api.get('/reports');
				setReports(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch reports');
			}
		};
		fetchReports();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		formData.append('reportDate', reportDate);
		formData.append('description', description);

		try {
			const response = await api.post('/reports/submit', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			setReports([...reports, response.data]);
			setSuccess('Report submitted successfully');
			setDescription('');
			setReportDate(new Date().toISOString().split('T')[0]);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to submit report');
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
		<div className='max-w-5xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<ImageIcon className='w-6 h-6 text-blue-600' />
				Submit Daily Report
			</h2>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-8'>
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
							Report Date
						</label>
						<input
							type='date'
							value={reportDate}
							onChange={(e) => setReportDate(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none h-32'
							required
						/>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Screenshot 1
							</label>
							<input
								type='file'
								name='screenshot1'
								accept='image/*'
								className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Screenshot 2
							</label>
							<input
								type='file'
								name='screenshot2'
								accept='image/*'
								className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
							/>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Screenshot 3
							</label>
							<input
								type='file'
								name='screenshot3'
								accept='image/*'
								className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
							/>
						</div>
					</div>
					<button
						type='submit'
						className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						<Send className='w-5 h-5' />
						Submit Report
					</button>
				</form>
			</div>
			<h3 className='text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
				Report History
			</h3>
			{reports.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No reports found.
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
										<Calendar className='w-4 h-4' />
										<p className='text-sm'>
											<span className='font-medium text-gray-900 dark:text-gray-100'>
												Date:
											</span>{' '}
											{new Date(report.reportDate).toLocaleDateString()}
										</p>
									</div>
								</div>
								<div>
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

export default DailyReportForm;