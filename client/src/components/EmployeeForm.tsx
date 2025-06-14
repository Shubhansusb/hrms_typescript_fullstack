// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../services/api';

// const EmployeeForm = () => {
// 	const { id } = useParams<{ id: string }>();
// 	const navigate = useNavigate();
// 	const [name, setName] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [role, setRole] = useState('Employee');
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		if (id) {
// 			const fetchEmployee = async () => {
// 				try {
// 					const response = await api.get(`/employees/${id}`);
// 					const employee = response.data;
// 					setName(employee.name);
// 					setEmail(employee.email);
// 					setRole(employee.role);
// 				} catch (err: any) {
// 					setError(err.response?.data?.message || 'Failed to fetch employee');
// 				}
// 			};
// 			fetchEmployee();
// 		}
// 	}, [id]);

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			if (id) {
// 				await api.put(`/employees/${id}`, { name, email, role });
// 			} else {
// 				await api.post('/employees', { name, email, password, role });
// 			}
// 			navigate('/employees');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Failed to save employee');
// 		}
// 	};

// 	return (
// 		<div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>
// 				{id ? 'Edit Employee' : 'Add Employee'}
// 			</h2>
// 			{error && <p className='text-red-500 mb-4'>{error}</p>}
// 			<form
// 				onSubmit={handleSubmit}
// 				className='space-y-4'
// 			>
// 				<div>
// 					<label className='block text-gray-700'>Name</label>
// 					<input
// 						type='text'
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-gray-700'>Email</label>
// 					<input
// 						type='email'
// 						value={email}
// 						onChange={(e) => setEmail(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
// 				{!id && (
// 					<div>
// 						<label className='block text-gray-700'>Password</label>
// 						<input
// 							type='password'
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 							className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 							required
// 						/>
// 					</div>
// 				)}
// 				<div>
// 					<label className='block text-gray-700'>Role</label>
// 					<select
// 						value={role}
// 						onChange={(e) => setRole(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 					>
// 						<option value='Employee'>Employee</option>
// 						<option value='Admin'>Admin</option>
// 					</select>
// 				</div>
// 				<button
// 					type='submit'
// 					className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300'
// 				>
// 					{id ? 'Update' : 'Add'} Employee
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default EmployeeForm;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Save, User } from 'lucide-react';

const EmployeeForm = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('Employee');
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			const fetchEmployee = async () => {
				try {
					const response = await api.get(`/employees/${id}`);
					const employee = response.data;
					setName(employee.name);
					setEmail(employee.email);
					setRole(employee.role);
				} catch (err: any) {
					setError(err.response?.data?.message || 'Failed to fetch employee');
				}
			};
			fetchEmployee();
		}
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (id) {
				await api.put(`/employees/${id}`, { name, email, role });
			} else {
				await api.post('/employees', { name, email, password, role });
			}
			navigate('/employees');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to save employee');
		}
	};

	return (
		<div className='max-w-lg mx-auto p-6'>
			<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2'>
				<User className='w-6 h-6 text-blue-600' />
				{id ? 'Edit Employee' : 'Add Employee'}
			</h2>
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700'>
				{error && (
					<p className='text-red-500 dark:text-red-400 mb-4 text-sm'>{error}</p>
				)}
				<form
					onSubmit={handleSubmit}
					className='space-y-5'
				>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Name
						</label>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Email
						</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
							required
						/>
					</div>
					{!id && (
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Password
							</label>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
								required
							/>
						</div>
					)}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Role
						</label>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className='w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200'
						>
							<option value='Employee'>Employee</option>
							<option value='Admin'>Admin</option>
						</select>
					</div>
					<button
						type='submit'
						className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
					>
						<Save className='w-5 h-5' />
						{id ? 'Update' : 'Add'} Employee
					</button>
				</form>
			</div>
		</div>
	);
};

export default EmployeeForm;