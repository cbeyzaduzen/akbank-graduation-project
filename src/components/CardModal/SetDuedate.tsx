import { useState } from 'react';
import { Box, Button, IconButton, Popover, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import EventIcon from '@mui/icons-material/Event';
import format from 'date-fns/format';
import { duedateFormContStyle, duedateFormStyle } from './CardModal.style';
import { updateCardRequest } from '../../store/cards/cardActions';
import { AppDispatch } from '../../store/reducers';
import { useDispatch } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';

type SetDuedateProps = {
  cardID: number
}

export const SetDuedate: React.FC<SetDuedateProps> = ({ cardID }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<Date | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSetDuedate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return
    dispatch(updateCardRequest({ cardID, data: { duedate: format(value, 'yyyy-MM-dd') } }))
    handleClose();
  }

  const handleRemoveDuedate = () => {
    dispatch(updateCardRequest({ cardID, data: { duedate: '1970-01-01' } }));
    setValue(null);
  }

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color='secondary'
      >
        <EventIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{ mt: 1 }}
      >
        <Box component='form' onSubmit={handleSetDuedate} sx={duedateFormStyle}>
          <Box sx={duedateFormContStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Duedate'
                value={value}
                onChange={(newValue:any) => {
                  setValue(newValue);
                }}
                renderInput={(params:any) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box display='flex' justifyContent='space-around'>
              <Button type='submit' sx={{ my: 1 }} >Set</Button>
              <Button sx={{ my: 1 }} onClick={handleRemoveDuedate} >Remove</Button>
            </Box>
          </Box>
        </Box>
      </Popover >
    </Box >
  );
}
