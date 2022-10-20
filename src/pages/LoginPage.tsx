import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Box, CircularProgress } from '@mui/material';
import { AppContainer } from '../components/Layout/AppContainer';
import { Content } from '../components/Layout/Content';
import { ScrollContainer } from '../components/Layout/ScrollContainer';
import { clearErrors } from '../store/boardStatus/boardStatusSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/reducers';


export const LoginPage = () => {
  const appStatus = useAppSelector(state => state.status.appStatus);
  const dispatch = useDispatch<AppDispatch>();

  const handleClearErrors = () => {
    dispatch(clearErrors());
  }

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <Content>
          <ScrollContainer>
            <LoginForm>
              <Box display='flex' my={2}>
                <Typography mr={2}>Don't have an account ? </Typography>
                <Typography color='primary'>
                  <Link style={{color:"#81E7F7"}} onClick={handleClearErrors} to='/register'>Register</Link>
                </Typography>
              </Box>
            </LoginForm>
          </ScrollContainer>
        </Content>
      </AppContainer> :
     <CircularProgress />
  )
}