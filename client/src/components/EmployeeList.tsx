// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../services/api';

// interface Employee {
// 	id: string;
// 	name: string;
// 	email: string;
// 	role: string;
// }

// const EmployeeList = () => {
// 	const [employees, setEmployees] = useState<Employee[]>([]);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchEmployees = async () => {
// 			try {
// 				const response = await api.get('/employees');
// 				setEmployees(response.data);
// 			} catch (err: any) {
// 				setError(err.response?.data?.message || 'Failed to fetch employees');
// 			}
// 		};
// 		fetchEmployees();
// 	}, []);

// 	if (error) {
// 		return <div className='text-red-500 text-center p-6'>{error}</div>;
// 	}

// 	return (
// 		<div className='max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Employees</h2>
// 			<Link
// 				to='/employees/new'
// 				className='inline-block mb-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300'
// 			>
// 				Add Employee
// 			</Link>
// 			{employees.length === 0 ? (
// 				<p className='text-gray-600'>No employees found.</p>
// 			) : (
// 				<div className='space-y-4'>
// 					{employees.map((employee) => (
// 						<div
// 							key={employee.id}
// 							className='p-4 border rounded-lg shadow-sm'
// 						>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Name:</span> {employee.name}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Email:</span> {employee.email}
// 							</p>
// 							<p className='text-gray-600'>
// 								<span className='font-medium'>Role:</span> {employee.role}
// 							</p>
// 							<Link
// 								to={`/employees/${employee.id}`}
// 								className='mt-2 inline-block text-blue-600 hover:underline'
// 							>
// 								View Details
// 							</Link>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default EmployeeList;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Plus, User } from 'lucide-react';

interface Employee {
	id: string;
	name: string;
	email: string;
	role: string;
}

const EmployeeList = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await api.get('/employees');
				setEmployees(response.data);
			} catch (err: any) {
				setError(err.response?.data?.message || 'Failed to fetch employees');
			}
		};
		fetchEmployees();
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
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2'>
					<User className='w-6 h-6 text-blue-600' />
					Employees
				</h2>
				<Link
					to='/employees/new'
					className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
				>
					<Plus className='w-5 h-5' />
					Add Employee
				</Link>
			</div>
			{employees.length === 0 ? (
				<p className='text-gray-500 dark:text-gray-400 text-center py-8'>
					No employees found.
				</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{employees.map((employee) => (
						<div
							key={employee.id}
							className='bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border border-gray-100 dark:border-gray-700'
						>
							<div className='flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2'>
								<User className='w-4 h-4' />
								<p className='font-medium text-gray-900 dark:text-gray-100'>
									{employee.name}
								</p>
							</div>
							<p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>
								{employee.email}
							</p>
							<p className='text-sm text-gray-600 dark:text-gray-300 mb-3'>
								<span className='font-medium text-gray-900 dark:text-gray-100'>
									Role:
								</span>{' '}
								<span className='inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
									{employee.role}
								</span>
							</p>
							<Link
								to={`/employees/${employee.id}`}
								className='text-blue-600 dark:text-blue-400 hover:underline text-sm'
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

export default EmployeeList;