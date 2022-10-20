import Box from '@mui/material/Box/Box';

const style = {
  flex: '1 1 0',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  bgcolor: '#F6F7F9'
}

export const Content: React.FC = ({ children }) => {
  return (
    <Box sx={style}>
      {children}
    </Box>
  )
}
