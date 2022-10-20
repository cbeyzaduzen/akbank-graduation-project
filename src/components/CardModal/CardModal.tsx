import Typography from "@mui/material/Typography/Typography";
import MuiCard from "@mui/material/Card/Card";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AddLabel } from "./AddLabel";
import {
  Breadcrumbs,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Link,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CreateChecklist } from "./CreateChecklistMenu";
import { SetDuedate } from "./SetDuedate";
import {
  cardTitleStyle,
  modalContainerStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalStyle,
} from "./CardModal.style";
import { Labels } from "./Labels";
import { Checklists } from "./Checklists";
import { Comments } from "./Comments";
import { CardUpdates } from "./CardUpdates";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

type CardModalProps = {
  cardID: number;
  open: boolean;
  close: () => void;
};

export const CardModal: React.FC<CardModalProps> = ({
  cardID,
  open,
  close,
}) => {
  const card = useAppSelector((state) => state.app.cards[cardID]);

  const BreadcrumbsData = [
    <Typography>Boards</Typography>,
    <Typography>{card.title}</Typography>,
  ];

  return (
    <Dialog sx={modalContainerStyle} open={open} onClose={close}>
      <MuiCard sx={modalStyle} variant="outlined">
        <CardHeader
          sx={modalHeaderStyle}
          action={
            <CardActions sx={{ flex: 1 }}>
              <SetDuedate cardID={cardID} />
              <AddLabel cardID={cardID} />
              <AccountCircleOutlinedIcon className="!text-white !ml-3" />
              <AttachmentOutlinedIcon className="!text-white !ml-3" />
              <CreateChecklist cardID={cardID} />
              <MoreHorizOutlinedIcon className="!text-white !ml-3" />
              <IconButton
                onClick={close}
                color="secondary"
                sx={{ "&.MuiButtonBase-root": { ml: "auto" } }}
              >
                <Close />
              </IconButton>
            </CardActions>
          }
        />
        <CardContent sx={modalContentStyle}>
          <Breadcrumbs className="!mb-4" separator="›" aria-label="breadcrumb">
            {BreadcrumbsData}
          </Breadcrumbs>
          <CardUpdates
            cardID={cardID}
            title={card.title}
            description={card.description}
          />
          <Labels cardID={cardID} cardLabels={card.labels} />
          <Checklists checklistIDs={card.checklistIDs} />
          <Comments cardID={cardID} comments={card.comments} />
        </CardContent>
      </MuiCard>
    </Dialog>
  );
};
