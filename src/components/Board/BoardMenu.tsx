import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Delete, Edit, Logout } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Divider, IconButton, Menu } from '@mui/material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useAppSelector } from '../../hooks/useAppSelector';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { logoutRequest } from '../../store/auth/authActions';
import { removeMemberRequest } from '../../store/boards/boardActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/reducers';

type BoardMenuProps = {
  boardId: number
  openMembersModal: () => void
  startEdit: () => void
  openDeleteModal: () => void
}

export const BoardMenu: React.FC<BoardMenuProps> = ({ boardId, openMembersModal, openDeleteModal, startEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const board = useAppSelector(state => state.app.boards[boardId]);
  const userId = useAppSelector(state => state.auth.userId);
  const isOwner = (board.ownerId === userId);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  }

  const handleOpenMemberModal = () => {
    openMembersModal();
    handleClose();
  }

  const handleOpenDeleteModal = () => {
    openDeleteModal();
    handleClose();
  }
  const handleStartEdit = () => {
    startEdit();
    handleClose();
  }

  const handleLeaveBoard = () => {
    const member = board.members.find(member => member.BoardMember.userId === userId)!
    dispatch(removeMemberRequest({ memberID: member.BoardMember.id, boardId: boardId }))
    navigate(`/user${userId}`)
  }

  return (
    <Box position='relative'>
      <IconButton
        onClick={handleClick}
        color='secondary'
      >
        <SettingsIcon className='!text-white' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          {
            isOwner &&
            <MenuItem onClick={handleStartEdit}>
              <ListItemIcon>
                <Edit fontSize='small' />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          }
          <MenuItem onClick={handleOpenMemberModal}>
            <ListItemIcon>
              <GroupOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </MenuItem>
          {
            isOwner &&
            <MenuItem onClick={handleOpenDeleteModal}>
              <ListItemIcon>
                <Delete fontSize='small' />
              </ListItemIcon>
              <ListItemText>Delete Board</ListItemText>
            </MenuItem>
          }
          {
            !isOwner &&
            <MenuItem onClick={handleLeaveBoard}>
              <ListItemIcon>
                <HighlightOffOutlinedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Leave Board</ListItemText>
            </MenuItem>
          }
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
