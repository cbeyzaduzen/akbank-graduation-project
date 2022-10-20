import { AddOutlined } from '@mui/icons-material'
import Box from '@mui/material/Box/Box'
import IconButton from '@mui/material/IconButton/IconButton'
import TextField from '@mui/material/TextField/TextField'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCheckListItemRequest } from '../../store/checklist/checklistActions'
import { AppDispatch } from '../../store/reducers'

type CreateItemProps = {
  checklistID: number
}

export const CreateItem: React.FC<CreateItemProps> = ({ checklistID }) => {
  const [newItemTitle, setNewItemTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateChecklistItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCheckListItemRequest({ data: { checklistId: checklistID, title: newItemTitle || 'New Checklist Item', isChecked: false } }));
    setNewItemTitle('');
  }

  return (
    <Box py={1} pl='42px' component='form' sx={{ display: 'flex', alignItems: 'center' }} onSubmit={handleCreateChecklistItem}>
      <TextField sx={{ flex: '0px 1 0', ml: 1 }} type='text' value={newItemTitle} placeholder='Item name' onChange={e => setNewItemTitle(e.target.value)} />
      <IconButton type='submit' sx={{ bgcolor: 'secondary.main', flex: '42px 0 0', height: '42px', marginLeft: 2 }}>
        <AddOutlined />
      </IconButton>
    </Box>
  )
}
