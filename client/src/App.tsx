// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './pages/Dashboard';
// import ApplyLeave from './components/ApplyLeave';
// import LeaveList from './components/LeaveList';
// import AdminLeaveList from './components/AdminLeaveList';
// import EmployeeList from './components/EmployeeList';
// import EmployeeForm from './components/EmployeeForm';
// import EmployeeDetails from './components/EmployeeDetails';
// import PunchInOut from './components/PunchInOut';
// import DailyReportForm from './components/DailyReportForm';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { initializeAuth } from './redux/authSlice';
// import type { AppDispatch } from './redux/store';

// const App = () => {
// 	const dispatch = useDispatch<AppDispatch>();

// 	useEffect(() => {
// 		dispatch(initializeAuth());
// 	}, [dispatch]);

// 	return (
// 		<BrowserRouter>
// 			<Routes>
// 				<Route
// 					path='/'
// 					element={<Layout />}
// 				>
// 					<Route element={<ProtectedRoute requireAuth={true} />}>
// 						<Route
// 							index
// 							element={<Dashboard />}
// 						/>
// 						<Route
// 							path='leaves/apply'
// 							element={<ApplyLeave />}
// 						/>
// 						<Route
// 							path='leaves'
// 							element={<LeaveList />}
// 						/>
// 						<Route
// 							path='leaves/admin'
// 							element={<AdminLeaveList />}
// 						/>
// 						<Route
// 							path='employees'
// 							element={<EmployeeList />}
// 						/>
// 						<Route
// 							path='employees/new'
// 							element={<EmployeeForm />}
// 						/>
// 						<Route
// 							path='employees/edit/:id'
// 							element={<EmployeeForm />}
// 						/>
// 						<Route
// 							path='employees/:id'
// 							element={<EmployeeDetails />}
// 						/>
// 						<Route
// 							path='attendance'
// 							element={<PunchInOut />}
// 						/>
// 						<Route
// 							path='reports/submit'
// 							element={<DailyReportForm />}
// 						/>
// 					</Route>
// 					<Route element={<ProtectedRoute requireAuth={false} />}>
// 						<Route
// 							path='login'
// 							element={<Login />}
// 						/>
// 						<Route
// 							path='register'
// 							element={<Register />}
// 						/>
// 					</Route>
// 				</Route>
// 			</Routes>
// 		</BrowserRouter>
// 	);
// };

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './components/ApplyLeave';
import LeaveList from './components/LeaveList';
import AdminLeaveList from './components/AdminLeaveList';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import PunchInOut from './components/PunchInOut';
import DailyReportForm from './components/DailyReportForm';
import AdminReportList from './components/AdminReportList';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './redux/authSlice';
import type { AppDispatch } from './redux/store';

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(initializeAuth());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					<Route element={<ProtectedRoute requireAuth={true} />}>
						<Route
							index
							element={<Dashboard />}
						/>
						<Route
							path='leaves/apply'
							element={<ApplyLeave />}
						/>
						<Route
							path='leaves'
							element={<LeaveList />}
						/>
						<Route
							path='leaves/admin'
							element={<AdminLeaveList />}
						/>
						<Route
							path='employees'
							element={<EmployeeList />}
						/>
						<Route
							path='employees/new'
							element={<EmployeeForm />}
						/>
						<Route
							path='employees/edit/:id'
							element={<EmployeeForm />}
						/>
						<Route
							path='employees/:id'
							element={<EmployeeDetails />}
						/>
						<Route
							path='attendance'
							element={<PunchInOut />}
						/>
						<Route
							path='reports/submit'
							element={<DailyReportForm />}
						/>
						<Route
							path='reports/admin'
							element={<AdminReportList />}
						/>
					</Route>
					<Route element={<ProtectedRoute requireAuth={false} />}>
						<Route
							path='login'
							element={<Login />}
						/>
						<Route
							path='register'
							element={<Register />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;