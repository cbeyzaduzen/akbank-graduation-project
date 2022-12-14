import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button/Button'
import TextField from '@mui/material/TextField/TextField'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { updateCardRequest } from '../../store/cards/cardActions'
import { AppDispatch } from '../../store/reducers'
import { cardUpdateStyle } from './CardModal.style'

type CardUpdatesProps = {
  cardID: number
  title: string
  description?: string
}

export const CardUpdates: React.FC<CardUpdatesProps> = ({ cardID, title, description }) => {
  const { formValues, updateFormValues } = useForm({ title, description: description || '' });
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateCardRequest({ cardID, data: { title: formValues.title || 'Untitled Card', description: formValues.description } }));
  }
  return (
    <Box component='form' sx={cardUpdateStyle} onSubmit={handleUpdateCard}>
      <TextField sx={{ m: 1 }} fullWidth name='title' variant='outlined' label='Title' value={formValues.title} onChange={updateFormValues} />
      <TextField sx={{ m: 1 }} fullWidth name='description' multiline variant='outlined' label='Description' value={formValues.description} onChange={updateFormValues} />
      <Button type='submit'>Save</Button>
    </Box>
  )
}
