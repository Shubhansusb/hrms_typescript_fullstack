import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

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
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await api.get(`/employees`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				const employeeData = response.data.find(
					(emp: Employee) => emp.id === id
				);
				if (!employeeData) {
					setError('Employee not found');
					return;
				}
				setEmployee(employeeData);
			} catch (err: any) {
				setError(
					err.response?.data?.message || 'Failed to fetch employee details'
				);
			}
		};
		fetchEmployee();
	}, [id]);

	const handleDelete = async () => {
		try {
			const token = localStorage.getItem('token');
			await api.delete(`/employees/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			navigate('/employees');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to delete employee');
		}
	};

	if (error) {
		return <div className='text-red-500 text-center p-6'>{error}</div>;
	}

	if (!employee) {
		return <div className='text-gray-600 text-center p-6'>Loading...</div>;
	}

	return (
		<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-lg font-semibold text-gray-800 mb-4'>
				Employee Details
			</h2>
			<div className='space-y-4'>
				<p className='text-gray-600'>
					<span className='font-medium'>Name:</span> {employee.name}
				</p>
				<p className='text-gray-600'>
					<span className='font-medium'>Email:</span> {employee.email}
				</p>
				<p className='text-gray-600'>
					<span className='font-medium'>Role:</span> {employee.role}
				</p>

				<h3 className='text-sm font-medium text-gray-800 mt-6'>Documents</h3>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{employee.profileImage && (
						<div>
							<p className='text-gray-600 font-medium'>Profile Image:</p>
							<img
								src={`http://localhost:5000/${employee.profileImage}`}
								alt='Profile'
								className='mt-2 w-32 h-32 object-cover rounded-md'
							/>
						</div>
					)}
					{employee.marksheets && (
						<div>
							<p className='text-gray-600 font-medium'>Marksheets:</p>
							<a
								href={`http://localhost:5000/${employee.marksheets}`}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:underline'
							>
								View Marksheets
							</a>
						</div>
					)}
					{employee.aadharCard && (
						<div>
							<p className='text-gray-600 font-medium'>Aadhar Card:</p>
							<a
								href={`http://localhost:5000/${employee.aadharCard}`}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:underline'
							>
								View Aadhar Card
							</a>
						</div>
					)}
					{employee.panCard && (
						<div>
							<p className='text-gray-600 font-medium'>PAN Card:</p>
							<a
								href={`http://localhost:5000/${employee.panCard}`}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:underline'
							>
								View PAN Card
							</a>
						</div>
					)}
				</div>

				<button
					onClick={() => setIsDeleteModalOpen(true)}
					className='mt-6 py-2 px-4 rounded-md text-white font-medium bg-red-600 hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-300'
				>
					Delete Employee
				</button>
			</div>

			{isDeleteModalOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
					<div className='bg-white p-6 rounded-lg shadow-md'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4'>
							Confirm Deletion
						</h3>
						<p className='text-gray-600 mb-4'>
							Are you sure you want to delete {employee.name}? This action
							cannot be undone.
						</p>
						<div className='flex justify-end space-x-2'>
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className='py-2 px-4 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-100 transition-all duration-300'
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className='py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-300'
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmployeeDetails;
