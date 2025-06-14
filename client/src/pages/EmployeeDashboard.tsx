import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../redux/store';
import api from '../services/api';
import { User, Calendar, Clock, FileText, Upload } from 'lucide-react';

const EmployeeDashboard = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No authentication token found');
			}
			const response = await api.post('/employees/upload-documents', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});
			setSuccess('Documents uploaded successfully');
			console.log('Documents uploaded:', response.data);
			e.currentTarget.reset();
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to upload documents');
			setSuccess(null);
		}
	};

	return (
		<div className='max-w-5xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<User className='w-6 h-6 text-blue-600' />
				Employee Dashboard
			</h2>
			<p className='text-gray-600 dark:text-gray-300 mb-6'>
				Welcome, {user?.name}
			</p>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
				<Link
					to='/leaves/apply'
					className='block p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Calendar className='w-5 h-5' />
					Apply for Leave
				</Link>
				<Link
					to='/leaves'
					className='block p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Calendar className='w-5 h-5' />
					View My Leaves
				</Link>
				<Link
					to='/attendance'
					className='block p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Clock className='w-5 h-5' />
					Punch In/Out
				</Link>
				<Link
					to='/reports/submit'
					className='block p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-center flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<FileText className='w-5 h-5' />
					Submit Daily Report
				</Link>
			</div>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700'>
				<h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2'>
					<Upload className='w-5 h-5 text-blue-600' />
					Upload Documents
				</h3>
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
							Profile Image
						</label>
						<input
							type='file'
							name='profileImage'
							accept='image/*'
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Marksheets
						</label>
						<input
							type='file'
							name='marksheets'
							accept='application/pdf'
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Aadhar Card
						</label>
						<input
							type='file'
							name='aadharCard'
							accept='application/pdf'
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							PAN Card
						</label>
						<input
							type='file'
							name='panCard'
							accept='application/pdf'
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-all duration-200'
						/>
					</div>
					<button
						type='submit'
						className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						<Upload className='w-5 h-5' />
						Upload Documents
					</button>
				</form>
			</div>
		</div>
	);
};

export default EmployeeDashboard;
