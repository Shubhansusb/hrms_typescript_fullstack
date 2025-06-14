import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Employee {
	id: string;
	name: string;
	email: string;
	role: string;
}

const Employees = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await api.get('/employees', {
					headers: { Authorization: `Bearer ${token}` },
				});
				setEmployees(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch employees');
			}
		};
		fetchEmployees();
	}, []);

	if (error) {
		return <div className='text-red-500 text-center p-6'>{error}</div>;
	}

	return (
		<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-lg font-semibold text-gray-800 mb-4'>Employees</h2>
			{employees.length === 0 ? (
				<p className='text-gray-600'>No employees found.</p>
			) : (
				<div className='space-y-4'>
					{employees.map((employee) => (
						<div
							key={employee.id}
							className='p-4 border rounded-md shadow-sm'
						>
							<p className='text-gray-600'>
								<span className='font-medium'>Name:</span> {employee.name}
							</p>
							<p className='text-gray-600'>
								<span className='font-medium'>Email:</span> {employee.email}
							</p>
							<p className='text-gray-600'>
								<span className='font-medium'>Role:</span> {employee.role}
							</p>
							<Link
								to={`/employees/${employee.id}`}
								className='mt-2 inline-block text-blue-600 hover:underline text-sm'
							>
								View Details
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Employees;
