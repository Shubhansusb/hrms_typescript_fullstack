import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

interface ProtectedRouteProps {
	requireAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAuth }) => {
	const user = useSelector((state: RootState) => state.auth.user);

	if (requireAuth && !user) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	if (!requireAuth && user) {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
