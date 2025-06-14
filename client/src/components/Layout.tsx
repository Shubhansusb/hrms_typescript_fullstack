// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { logout } from '../redux/authSlice';
// import type { RootState } from '../redux/store';

// const Layout = () => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const user = useSelector((state: RootState) => state.auth.user);

// 	const handleLogout = () => {
// 		dispatch(logout());
// 		navigate('/login');
// 	};

// 	return (
// 		<div className='min-h-screen flex'>
// 			{user && (
// 				<aside className='w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6'>
// 					<h1 className='text-2xl font-bold mb-8'>HRMS</h1>
// 					<nav>
// 						<ul className='space-y-4'>
// 							<li>
// 								<Link
// 									to='/'
// 									className='hover:text-blue-200'
// 								>
// 									Dashboard
// 								</Link>
// 							</li>
// 							{user.role === 'Admin' ? (
// 								<>
// 									<li>
// 										<Link
// 											to='/leaves/admin'
// 											className='hover:text-blue-200'
// 										>
// 											All Leaves
// 										</Link>
// 									</li>
// 									<li>
// 										<Link
// 											to='/employees'
// 											className='hover:text-blue-200'
// 										>
// 											Employees
// 										</Link>
// 									</li>
// 									<li>
// 										<Link
// 											to='/reports/admin'
// 											className='hover:text-blue-200'
// 										>
// 											Employee Reports
// 										</Link>
// 									</li>
// 								</>
// 							) : (
// 								<>
// 									<li>
// 										<Link
// 											to='/leaves'
// 											className='hover:text-blue-200'
// 										>
// 											My Leaves
// 										</Link>
// 									</li>
// 									<li>
// 										<Link
// 											to='/leaves/apply'
// 											className='hover:text-blue-200'
// 										>
// 											Apply Leave
// 										</Link>
// 									</li>
// 									<li>
// 										<Link
// 											to='/attendance'
// 											className='hover:text-blue-200'
// 										>
// 											Attendance
// 										</Link>
// 									</li>
// 									<li>
// 										<Link
// 											to='/reports/submit'
// 											className='hover:text-blue-200'
// 										>
// 											Submit Report
// 										</Link>
// 									</li>
// 								</>
// 							)}
// 							<li>
// 								<button
// 									onClick={handleLogout}
// 									className='text-left hover:text-blue-200'
// 								>
// 									Logout
// 								</button>
// 							</li>
// 						</ul>
// 					</nav>
// 				</aside>
// 			)}
// 			<main className='flex-1 p-8 bg-gray-100'>
// 				<Outlet />
// 			</main>
// 		</div>
// 	);
// };

// export default Layout;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import type { RootState } from '../redux/store';
import {
	Menu,
	LogOut,
	X,
	Home,
	Calendar,
	Users,
	Clock,
	FileText,
} from 'lucide-react';

const Layout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.auth.user);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleLogout = () => {
		dispatch(logout());
		navigate('/login');
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='min-h-screen flex bg-gray-50 dark:bg-gray-900'>
			{user && (
				<>
					{/* Mobile Sidebar Toggle Button */}
					<button
						className='md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200'
						onClick={toggleSidebar}
						aria-label='Toggle Sidebar'
					>
						{isSidebarOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</button>

					{/* Sidebar */}
					<aside
						className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 transform transition-transform duration-300 md:transform-none md:static md:w-64 z-40 ${
							isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
						} md:translate-x-0`}
					>
						<h1 className='text-2xl font-bold mb-8 flex items-center gap-2'>
							<Home className='w-6 h-6' />
							HRMS
						</h1>
						<nav>
							<ul className='space-y-3'>
								<li>
									<Link
										to='/'
										className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
										onClick={() => setIsSidebarOpen(false)}
									>
										<Home className='w-5 h-5' />
										Dashboard
									</Link>
								</li>
								{user.role === 'Admin' ? (
									<>
										<li>
											<Link
												to='/leaves/admin'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<Calendar className='w-5 h-5' />
												All Leaves
											</Link>
										</li>
										<li>
											<Link
												to='/employees'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<Users className='w-5 h-5' />
												Employees
											</Link>
										</li>
										<li>
											<Link
												to='/reports/admin'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<FileText className='w-5 h-5' />
												Employee Reports
											</Link>
										</li>
									</>
								) : (
									<>
										<li>
											<Link
												to='/leaves'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<Calendar className='w-5 h-5' />
												My Leaves
											</Link>
										</li>
										<li>
											<Link
												to='/leaves/apply'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<Calendar className='w-5 h-5' />
												Apply Leave
											</Link>
										</li>
										<li>
											<Link
												to='/attendance'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<Clock className='w-5 h-5' />
												Attendance
											</Link>
										</li>
										<li>
											<Link
												to='/reports/submit'
												className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200'
												onClick={() => setIsSidebarOpen(false)}
											>
												<FileText className='w-5 h-5' />
												Submit Report
											</Link>
										</li>
									</>
								)}
								<li>
									<button
										onClick={handleLogout}
										className='flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-800 transition-all duration-200 w-full text-left'
									>
										<LogOut className='w-5 h-5' />
										Logout
									</button>
								</li>
							</ul>
						</nav>
					</aside>

					{/* Overlay for Mobile Sidebar */}
					{isSidebarOpen && (
						<div
							className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
							onClick={toggleSidebar}
						></div>
					)}
				</>
			)}
			<main className='flex-1 p-6 md:p-8'>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;