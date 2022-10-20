import { DeleteOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import { useDispatch } from 'react-redux'
import { deleteCheckListItemRequest, updateCheckListItemRequest } from '../../store/checklist/checklistActions'
import { ChecklistItem as ChecklistItemType } from '../../store/checklist/checklistSlice'
import { AppDispatch } from '../../store/reducers'
import { ListItemEdit } from './ListItemEdit'

type ChecklistItemProps = {
  checklistID: number
  checklistItem: ChecklistItemType
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({ checklistID, checklistItem }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteChecklistItem = (checklistItemID: number) => {
    dispatch(deleteCheckListItemRequest({ checklistID, checklistItemID }));
  }

  const handleUpdateListItem = (checklistItemID: number, isChecked: boolean) => {
    dispatch(updateCheckListItemRequest({ checklistID, checklistItemID, data: { isChecked } }))
  }

  return (
    <Box display='flex' sx={{ py: 1, position: 'relative', alignItems: 'center' }} key={checklistItem.id}>
      <Checkbox sx={{ mr: 1, flex: '42px 0 0' }} checked={checklistItem.isChecked} onChange={(e) => handleUpdateListItem(checklistItem.id, e.target.checked)} />
      {/* <Typography sx={itemStyle} p={1} fontWeight={500}>{checklistItem.title}</Typography> */}
      <ListItemEdit checklistID={checklistID} checklistItem={checklistItem} />
      <IconButton sx={{ flex: '42px 0 0', marginLeft: 2 }} onClick={() => handleDeleteChecklistItem(checklistItem.id)}><DeleteOutlined /></IconButton>
    </Box>
  )
}
