import { Box, CardHeader as MuiCardHeader } from '@mui/material';
import { ListMenu } from './ListMenu';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { listHeaderStyle } from './List.styles';
import { ListEdit } from './ListEdit';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { updateListRequest } from '../../store/list/listActions';
import { AppDispatch } from '../../store/reducers';
import { useDispatch } from 'react-redux';

type ListHeaderProps = {
  listID: number
  dragHandleProps?: DraggableProvidedDragHandleProps
  isOwner: boolean
}

export const ListHeader: React.FC<ListHeaderProps> = ({ listID, dragHandleProps, isOwner }) => {
  const list:any = useAppSelector(state => state.app.lists[listID]);
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const headerRef = useRef<null | HTMLElement>(null);

  const startEdit = () => {
    setEditing(true);
  }

  const saveEdit = (value: string) => {
    dispatch(updateListRequest({ listID: list.id, data: { title: value } }));
    setEditing(false);
  }

  const cancelEdit = () => {
    setEditing(false);
  }

  return (
    <Box ref={headerRef}>
      <ListEdit title={list.title} open={editing} anchor={headerRef.current!} saveEdit={saveEdit} cancelEdit={cancelEdit} />
      <MuiCardHeader
        // If current user is not the board owner disable edit or deleting lists
        action={isOwner && <ListMenu listID={list.id} startEdit={startEdit} />}
        title={list.title}
        {...dragHandleProps}
        sx={listHeaderStyle}
      />
    </Box>
  )
}