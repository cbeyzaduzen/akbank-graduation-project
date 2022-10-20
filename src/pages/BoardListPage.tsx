import { useEffect } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { BoardList } from '../components/BoardList/BoardList'
import { AppContainer } from '../components/Layout/AppContainer'
import { CircularProgress } from '@mui/material'
import { getLabelTypesRequest } from '../store/app/otherActions'
import { getBoardListRequest } from '../store/boards/boardActions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/reducers'

export const BoardListPage = () => {
  const boardKey = useAppSelector(state => state.app.boardKey);
  const appStatus = useAppSelector(state => state.status.appStatus);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getBoardListRequest());
    dispatch(getLabelTypesRequest())
  }, [dispatch])

  return (
    appStatus === 'idle' ?
      <AppContainer>
        <div className='text-4xl font-bold flex justify-center mt-52' style={{backgroundColor:"#F6F7F9"}}>Scrumboard App</div>
        <BoardList boardKey={boardKey} />
      </AppContainer> :
     <CircularProgress />
  )
}