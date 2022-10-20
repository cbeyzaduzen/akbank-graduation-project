import { Box, CardContent, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Card as MuiCard } from '@mui/material'
import { CardLabels } from './CardLabels';
import { CardControls } from './CardControls';

type CardProps = {
  index: number
  cardID: number
}

export const Card: React.FC<CardProps> = ({ index, cardID }) => {
  const card = useAppSelector(state => state.app.cards[cardID]);


  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <MuiCard elevation={2} sx={{ mb: 2 }} {...provided.draggableProps} ref={provided.innerRef} >
          <CardContent sx={{ borderBottom: '1px solid lightgray', py: 1 }} {...provided.dragHandleProps}>
            <CardLabels cardLabels={card.labels} />
            <Typography fontSize='18px'>{card.title}</Typography>
            {
              card.description &&
              <Box >
                <Typography>{card.description}</Typography>
              </Box>
            }
          </CardContent>
          <CardControls cardID={cardID} />
        </MuiCard>
      )}
    </Draggable>
  )
}

