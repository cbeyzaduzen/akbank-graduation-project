import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

export const RequireAuth: React.FC = () => {
  const auth = useAppSelector(state => state.auth);
  const boardKey = useAppSelector(state => state.app.boardKey);
  let params = useParams();

  // if user not login navigate to login page
  if (!auth.userId) return <Navigate to='/login' />;

  //if not current user boardlist navigate to current user board list
  if (Number(params.userId) !== auth.userId) return <Navigate to={`/user${auth.userId}`} />

  // if not current user list board navigate to current user board list
  if (params.boardId && !boardKey.includes(Number(params.boardId))) return <Navigate to={`/user${auth.userId}`} />
  else return <Outlet />
}