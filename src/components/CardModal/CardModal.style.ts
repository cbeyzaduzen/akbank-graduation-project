export const modalContainerStyle = {
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  '.MuiPaper-root': {
    maxWidth: 'none'
  }
}

export const modalStyle = {
  width: 800,
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  borderColor: 'primary.dark'
}

export const modalHeaderStyle = {
  bgcolor: '#252F3E', p: 1, justifyContent: 'flex-start',
  '.MuiCardHeader-content': { flex: 0 },
  '.MuiCardHeader-action': { flex: 1 },
}

export const modalContentStyle = {
  bgcolor: 'background.paper',
  overflow: 'overlay',
  height: 'max-content',
  px: 3,
}

export const cardTitleStyle = {
  color: 'primary.main',
  fontSize: '25px',
  fontWeight: '600',
  my: 1
}

export const cardUpdateStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mb: 3
}

export const cListFormStyle = {
  height: 'fit-content',
  width: '300px',
  p: 1,
  backgroundColor: 'white',
  borderRadius: '10px'
}

export const cListFormContStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

export const cListFormInnerContStyle = {
  width: '100%',
  flex: 75,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'end',
  flexDirection: 'column'
}

export const duedateFormStyle = {
  height: 'fit-content',
  width: '300px',
  p: 1,
  backgroundColor: 'white',
  borderRadius: '10px'
}

export const duedateFormContStyle = {
  width: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  pt: 3
}

export const userNameStyle = {
  color: 'primary.main',
  fontWeight: '700',
  mt: 1,
  minWidth: '300px'
}

export const commentStyle = {
  p: '16.5px 14px',
  flex: 1,
  maxWidth: '60%',
  borderRadius: '0 100px 100px 0',
  border: '1px solid lightgray'
}