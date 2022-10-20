import CardActions from "@mui/material/CardActions/CardActions";
import IconButton from "@mui/material/IconButton/IconButton";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardModal } from "../CardModal/CardModal";
import { useAppSelector } from "../../hooks/useAppSelector";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CommentIcon from "@mui/icons-material/Comment";

type CardControlsProps = {
  cardID: number;
};

export const CardControls: React.FC<CardControlsProps> = ({ cardID }) => {
  const [cardModalStatus, setCardModalStatus] = useState(false);
  const card = useAppSelector((state) => state.app.cards[cardID]);

  const openCardModal = () => {
    setCardModalStatus(true);
  };

  const closeCardModal = () => {
    setCardModalStatus(false);
  };

  return (
    <CardActions className="!flex !justify-between" >
      <IconButton onClick={openCardModal}>
        <VisibilityIcon />
      </IconButton>
      <div>
        <IconButton className="!text-sm">
          <AttachmentIcon />
          {card.checklistIDs.length}
        </IconButton>
        <IconButton className="!text-sm" >
          <CommentIcon />
          {card.comments.length}
        </IconButton>
      </div>

      <CardModal
        cardID={cardID}
        open={cardModalStatus}
        close={closeCardModal}
      />
    </CardActions>
  );
};
