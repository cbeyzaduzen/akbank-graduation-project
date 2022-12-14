import { useAppSelector } from '../../hooks/useAppSelector'
import { List } from '../List/List'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box } from '@mui/material'
import { boardStyle } from './Board.style';
import { CreateList } from './CreateList'
import { changeListOrderRequest, changeCardOrderRequest, moveCardToAnotherListRequest } from '../../store/app/otherActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/reducers';

type BoardProps = {
  boardId: number;
}

export const Board: React.FC<BoardProps> = ({ boardId }) => {
  const board = useAppSelector(state => state.app.boards[boardId]);
  const lists = useAppSelector(state => state.app.lists);
  const userId = useAppSelector(state => state.auth.userId);
  const dispatch =useDispatch<AppDispatch>();
  const listIDs = board.listIDs;
  const isOwner = (board.ownerId === userId);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // Dropped out of container
    if (!destination) {
      return;
    }

    // Dropped on same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'list') { // Handle list drag-drop
      const newListIDs = Array.from(listIDs);

      newListIDs.splice(source.index, 1);
      newListIDs.splice(destination.index, 0, Number(draggableId.match(/[0-9]+$/)![0]));

      dispatch(changeListOrderRequest({ boardId, newListIDs }))
      return;
    }
    else { // Handle card drag-drop
      const sourceListID = Number(source.droppableId.match(/[0-9]+$/)![0])
      const targetListID = Number(destination.droppableId.match(/[0-9]+$/)![0])

      if (sourceListID === targetListID) { // Card dropped in same list
        const newCardIDs = Array.from(lists[sourceListID].cardIDs);

        newCardIDs.splice(source.index, 1);
        newCardIDs.splice(destination.index, 0, Number(draggableId.match(/[0-9]+$/)![0]));

        dispatch(changeCardOrderRequest({ listID: sourceListID, newCardIDs }))
      }
      else { // Card dropped in another list
        const newSourceCardIDs = Array.from(lists[sourceListID].cardIDs)
        const newTargetCardIDs = Array.from(lists[targetListID].cardIDs)

        const cardID = newSourceCardIDs.splice(source.index, 1)[0];
        newTargetCardIDs.splice(destination.index, 0, cardID);

        dispatch(moveCardToAnotherListRequest({ source: { listID: sourceListID, newCardIDs: newSourceCardIDs }, target: { listID: targetListID, newCardIDs: newTargetCardIDs } }))
      }

      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='list'>
        {(provided) => (
          <Box sx={boardStyle}{...provided.droppableProps} ref={provided.innerRef}>
            {
              listIDs.map((listID, index) => {
                return <List key={listID} index={index} listID={listID} isOwner={isOwner} />
              })
            }
            {provided.placeholder}
            <CreateList boardId={boardId} />
          </Box>
        )}
      </Droppable>
    </DragDropContext >
  )
}

