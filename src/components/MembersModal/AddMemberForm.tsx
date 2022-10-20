import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { addMemberRequest } from '../../store/boards/boardActions';
import { AppDispatch } from '../../store/reducers';

type AddMemberFormProps = {
  boardId: number
  ownerName?: string
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ boardId, ownerName }) => {
  const { formValues, updateFormValues, clearFormValues } = useForm({ username: '', boardId: boardId });
  const dispatch = useDispatch<AppDispatch>();

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.username === ownerName) {
      clearFormValues();
      return
    }
    dispatch(addMemberRequest({ data: formValues }))
    clearFormValues();
  }

  return (
    <Box component='form' display='flex' onSubmit={handleAddMember}>
      <TextField name='username' type='text' value={formValues.username} placeholder='Username' onChange={updateFormValues} />
      <Button type='submit'>Add User</Button>
    </Box>
  )
}