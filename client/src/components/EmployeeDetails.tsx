// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api, { BACKEND_URL } from '../services/api';

// interface Employee {
// 	id: string;
// 	name: string;
// 	email: string;
// 	role: string;
// 	profileImage?: string;
// 	marksheets?: string;
// 	aadharCard?: string;
// 	panCard?: string;
// }

// const EmployeeDetails = () => {
// 	const { id } = useParams<{ id: string }>();
// 	const navigate = useNavigate();
// 	const [employee, setEmployee] = useState<Employee | null>(null);
// 	const [error, setError] = useState<string | null>(null);
// 	const [showConfirm, setShowConfirm] = useState(false);

// 	useEffect(() => {
// 		const fetchEmployee = async () => {
// 			try {
// 				const response = await api.get(`/employees/${id}`);
// 				setEmployee(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch employee');
// 			}
// 		};
// 		fetchEmployee();
// 	}, [id]);

// 	const handleDelete = async () => {
// 		try {
// 			await api.delete(`/employees/${id}`);
// 			navigate('/employees');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to delete employee');
// 		}
// 	};

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	if (!employee) {
// 		return <div className='text-center p-6'>Loading...</div>;
// 	}

// 	return (
// 		<div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
// 				Employee Details
// 			</h2>
// 			<div className='space-y-4'>
// 				<p className='text-gray-600'>
// 					<span className='font-medium'>Name:</span> {employee.name}
// 				</p>
// 				<p className='text-gray-600'>
// 					<span className='font-medium'>Email:</span> {employee.email}
// 				</p>
// 				<p className='text-gray-600'>
// 					<span className='font-medium'>Role:</span> {employee.role}
// 				</p>
// 				{employee.profileImage && (
// 					<div>
// 						<span className='font-medium'>Profile Image:</span>
// 						<img
// 							src={`${BACKEND_URL}/uploads/${employee.profileImage
// 								.split('/')
// 								.pop()}`}
// 							alt='Profile'
// 							className='mt-2 w-32 h-32 object-cover rounded-lg'
// 						/>
// 					</div>
// 				)}
// 				{employee.marksheets && (
// 					<p className='text-gray-600'>
// 						<span className='font-medium'>Marksheets:</span>{' '}
// 						<a
// 							href={`${BACKEND_URL}/uploads/${employee.marksheets
// 								.split('/')
// 								.pop()}`}
// 							target='_blank'
// 							className='text-blue-600 hover:underline'
// 						>
// 							View
// 						</a>
// 					</p>
// 				)}
// 				{employee.aadharCard && (
// 					<p className='text-gray-600'>
// 						<span className='font-medium'>Aadhar Card:</span>{' '}
// 						<a
// 							href={`${BACKEND_URL}/uploads/${employee.aadharCard
// 								.split('/')
// 								.pop()}`}
// 							target='_blank'
// 							className='text-blue-600 hover:underline'
// 						>
// 							View
// 						</a>
// 					</p>
// 				)}
// 				{employee.panCard && (
// 					<p className='text-gray-600'>
// 						<span className='font-medium'>PAN Card:</span>{' '}
// 						<a
// 							href={`${BACKEND_URL}/uploads/${employee.panCard
// 								.split('/')
// 								.pop()}`}
// 							target='_blank'
// 							className='text-blue-600 hover:underline'
// 						>
// 							View
// 						</a>
// 					</p>
// 				)}
// 			</div>
// 			<div className='mt-6 space-x-4'>
// 				<button
// 					onClick={() => navigate(`/employees/edit/${id}`)}
// 					className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300'
// 				>
// 					Edit
// 				</button>
// 				<button
// 					onClick={() => setShowConfirm(true)}
// 					className='py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300'
// 				>
// 					Delete
// 				</button>
// 			</div>
// 			{showConfirm && (
// 				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
// 					<div className='bg-white p-6 rounded-lg shadow-lg'>
// 						<p className='text-gray-800 mb-4'>
// 							Are you sure you want to delete this employee?
// 						</p>
// 						<div className='space-x-4'>
// 							<button
// 								onClick={handleDelete}
// 								className='py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300'
// 							>
// 								Yes
// 							</button>
// 							<button
// 								onClick={() => setShowConfirm(false)}
// 								className='py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300'
// 							>
// 								No
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default EmployeeDetails;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { BACKEND_URL } from '../services/api';
import { FileText, Image as ImageIcon, User } from 'lucide-react';

interface Employee {
	id: string;
	name: string;
	email: string;
	role: string;
	profileImage?: string;
	marksheets?: string;
	aadharCard?: string;
	panCard?: string;
}

const EmployeeDetails = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [showConfirm, setShowConfirm] = useState(false);

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const response = await api.get(`/employees/${id}`);
				setEmployee(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch employee');
			}
		};
		fetchEmployee();
	}, [id]);

	const handleDelete = async () => {
		try {
			await api.delete(`/employees/${id}`);
			navigate('/employees');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to delete employee');
		}
	};

	if (error) {
		return (
			<div className='text-center p-8 text-red-500 dark:text-red-400'>
				{error}
			</div>
		);
	}

	if (!employee) {
		return (
			<div className='text-center p-8 text-gray-500 dark:text-gray-400'>
				Loading...
			</div>
		);
	}

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<User className='w-6 h-6 text-blue-600' />
				Employee Details
			</h2>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700'>
				<div className='space-y-4'>
					<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
						<User className='w-4 h-4' />
						<p className='text-sm'>
							<span className='font-medium text-gray-900 dark:text-gray-100'>
								Name:
							</span>{' '}
							{employee.name}
						</p>
					</div>
					<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
						<p className='text-sm'>
							<span className='font-medium text-gray-900 dark:text-gray-100'>
								Email:
							</span>{' '}
							{employee.email}
						</p>
					</div>
					<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
						<p className='text-sm'>
							<span className='font-medium text-gray-900 dark:text-gray-100'>
								Role:
							</span>{' '}
							<span className='inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
								{employee.role}
							</span>
						</p>
					</div>
					{employee.profileImage && (
						<div>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
								<ImageIcon className='w-4 h-4' />
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									Profile Image:
								</span>
							</div>
							<a
								href={`${BACKEND_URL}/uploads/${employee.profileImage
									.split('/')
									.pop()}`}
								target='_blank'
								rel='noopener noreferrer'
							>
								<img
									src={`${BACKEND_URL}/uploads/${employee.profileImage
										.split('/')
										.pop()}`}
									alt='Profile'
									className='w-24 h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-200'
								/>
							</a>
						</div>
					)}
					{employee.marksheets && (
						<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
							<FileText className='w-4 h-4' />
							<p className='text-sm'>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									Marksheets:
								</span>{' '}
								<a
									href={`${BACKEND_URL}/uploads/${employee.marksheets
										.split('/')
										.pop()}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-600 dark:text-blue-400 hover:underline'
								>
									View
								</a>
							</p>
						</div>
					)}
					{employee.aadharCard && (
						<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
							<FileText className='w-4 h-4' />
							<p className='text-sm'>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									Aadhar Card:
								</span>{' '}
								<a
									href={`${BACKEND_URL}/uploads/${employee.aadharCard
										.split('/')
										.pop()}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-600 dark:text-blue-400 hover:underline'
								>
									View
								</a>
							</p>
						</div>
					)}
					{employee.panCard && (
						<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
							<FileText className='w-4 h-4' />
							<p className='text-sm'>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									PAN Card:
								</span>{' '}
								<a
									href={`${BACKEND_URL}/uploads/${employee.panCard
										.split('/')
										.pop()}`}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-600 dark:text-blue-400 hover:underline'
								>
									View
								</a>
							</p>
						</div>
					)}
				</div>
				<div className='mt-6 flex gap-3'>
					<button
						onClick={() => navigate(`/employees/edit/${id}`)}
						className='flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						Edit
					</button>
					<button
						onClick={() => setShowConfirm(true)}
						className='flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						Delete
					</button>
				</div>
			</div>
			{showConfirm && (
				<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
					<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full border border-gray-100 dark:border-gray-700'>
						<p className='text-gray-800 dark:text-gray-200 mb-4 text-center'>
							Are you sure you want to delete this employee?
						</p>
						<div className='flex gap-3'>
							<button
								onClick={handleDelete}
								className='flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
							>
								Yes
							</button>
							<button
								onClick={() => setShowConfirm(false)}
								className='flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmployeeDetails;