import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector } from "../../hooks/useAppSelector";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import { deleteBoardRequest } from "../../store/boards/boardActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/reducers";

type ConfirmDeleteModalProps = {
  open: boolean;
  boardId: number;
  close: () => void;
};

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  close,
  boardId,
}) => {
  const title = useAppSelector((state) => state.app.boards[boardId].title);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteBoard = () => {
    dispatch(deleteBoardRequest({ boardId }));
    close();
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{`Delete ${title} ?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Will you confirm it will be deleted?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleDeleteBoard}>Confirm</Button>
        <Button onClick={close} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
