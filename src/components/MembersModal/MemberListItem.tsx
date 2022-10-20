import { CancelOutlined } from '@mui/icons-material'
import Avatar from '@mui/material/Avatar/Avatar'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import Typography from '@mui/material/Typography/Typography'
import { useDispatch } from 'react-redux'
import { removeMemberRequest } from '../../store/boards/boardActions'
import { AppDispatch } from '../../store/reducers'
import { listItemStyle, userNameStyle } from './MembersModal.style'

type MemberListItemProps = {
  username: string
  memberID: number
  boardId: number
  isOwner: boolean
}

export const MemberListItem: React.FC<MemberListItemProps> = ({ username, memberID, boardId, isOwner }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveMember = () => {
    dispatch(removeMemberRequest({ memberID, boardId }))
  }

  return (
    <Box sx={listItemStyle}  >
      <Avatar sx={{ bgcolor: 'primary.main' }}>{(username.slice(0, 1)).toUpperCase()}</Avatar>
      <Typography sx={{ ml: 2, ...userNameStyle }}>{username}</Typography>
      <Typography sx={{ mr: 1 }}>Member</Typography>
      {
        isOwner &&
        <IconButton onClick={handleRemoveMember}>
          <CancelOutlined />
        </IconButton>
      }
    </Box >
  )
}