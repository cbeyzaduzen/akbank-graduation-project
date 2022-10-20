import Box from '@mui/material/Box'
import { BoardLink } from './BoardLink';
import { boardListStyle } from './BoardList.style';
import { CreateBoard } from './CreateBoard';

type BoardListProps = {
  boardKey: number[]
}

export const BoardList: React.FC<BoardListProps> = ({ boardKey }) => {
  return (
    <Box sx={boardListStyle}>
      {
        boardKey.map(boardId => {
          return (
            <BoardLink key={boardId} boardId={boardId} />
          )
        })
      }
      < CreateBoard />
    </Box >
  )
}
