import { useAppSelector } from './hooks/useAppSelector';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { BoardListPage } from './pages/BoardListPage';
import { BoardContentPage } from './pages/BoardContentPage';
import { RequireAuth } from './components/RequireAuth';
import { LoginPage } from './pages/LoginPage';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appStyle } from './App.style';

const App: React.FC = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <CssBaseline>
      <ThemeProvider theme={appStyle}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Navigate to={auth.userId ? `user${auth.userId}` : 'login'} />} />
            <Route path='login' element={auth.userId ? <Navigate to={`user${auth.userId}`} /> : <LoginPage />} />
            <Route path='register' element={auth.userId ? <Navigate to={`user${auth.userId}`} /> : <RegisterPage />} />
            <Route path='user:userId' element={<RequireAuth />}>
              <Route index element={<BoardListPage />} />
              <Route path='board:boardId' element={<BoardContentPage />} />
              <Route path='*' element={<Navigate to='' />} />
            </Route>
          </Routes>
        </BrowserRouter >
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
