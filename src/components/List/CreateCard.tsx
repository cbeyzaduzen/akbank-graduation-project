import { Add } from '@mui/icons-material'
import { Button, Popover, TextField } from '@mui/material'
import Box from '@mui/material/Box/Box'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useForm } from '../../hooks/useForm'
import { createCardRequest } from '../../store/cards/cardActions'
import { AppDispatch } from '../../store/reducers'
import {createCardStyle } from './List.styles'

type CreateCardProps = {
  listID: number
}

export const CreateCard: React.FC<CreateCardProps> = ({ listID }) => {
  const list:any = useAppSelector(state => state.app.lists[listID]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { formValues, updateFormValues, clearFormValues } = useForm({ title: '' });
  const createCardRef = useRef<null | HTMLElement>(null);

  const handleClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
    clearFormValues();
  }

  const handleCreateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(createCardRequest({ data: { title: formValues.title || 'Untitled Card', listId: list.id, order: list.cardIDs.length } }))
    clearFormValues();
  }

  return (
    <Box ref={createCardRef} mt='auto' borderTop='1px solid lightgray'>
      <Button
      className='!flex !justify-start !text-gray-600 !ml-1'
        sx={{ py: 2 }}
        startIcon={<Add sx={{ pb: '1px' }} />}
        fullWidth
        size='large'
        onClick={handleClick}
      >
        Add a card
      </Button>
      <Popover
        open={open}
        anchorEl={createCardRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
        transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        elevation={0}
        sx={{ '.MuiPaper-root': { borderRadius: '0 0 4px 4px' } }}
      >
        <Box component='form' sx={createCardStyle} onSubmit={handleCreateCard}>
          <TextField className='!w-full' autoFocus sx={{ bgcolor: 'white' }} name='title' placeholder='Card Title' value={formValues.title} onChange={updateFormValues} />
          <Button className="!bg-gray-200 !mt-2 !rounded-xl !text-gray-600" type='submit' >Add</Button>
        </Box>
      </Popover >
    </Box>
  )
}