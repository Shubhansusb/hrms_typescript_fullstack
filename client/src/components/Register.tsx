// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../redux/authSlice';
// import api from '../services/api';

// const Register = () => {
// 	const [name, setName] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [role, setRole] = useState('Employee');
// 	const [error, setError] = useState<string | null>(null);
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		try {
// 			const response = await api.post('/auth/register', {
// 				name,
// 				email,
// 				password,
// 				role,
// 			});
// 			dispatch(login(response.data));
// 			navigate('/');
// 		} catch (err: any) {
// 			setError(err.response?.data?.message || 'Registration failed');
// 		}
// 	};

// 	return (
// 		<div className='max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg'>
// 			<h2 className='text-2xl font-bold text-gray-800 mb-6'>Register</h2>
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
// 				<div>
// 					<label className='block text-gray-700'>Password</label>
// 					<input
// 						type='password'
// 						value={password}
// 						onChange={(e) => setPassword(e.target.value)}
// 						className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						required
// 					/>
// 				</div>
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
// 					Register
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default Register;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import api from '../services/api';
import { UserPlus } from 'lucide-react';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('Employee');
	const [error, setError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await api.post('/auth/register', {
				name,
				email,
				password,
				role,
			});
			dispatch(login(response.data));
			navigate('/');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6'>
			<div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700'>
				<h2 className='text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2 justify-center'>
					<UserPlus className='w-6 h-6 text-blue-600' />
					Register
				</h2>
				{error && (
					<p className='text-red-500 dark:text-red-400 mb-4 text-sm text-center'>
						{error}
					</p>
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
						<UserPlus className='w-5 h-5' />
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;