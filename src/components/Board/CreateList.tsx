import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Popover, TextField } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useForm } from "../../hooks/useForm";
import { createListRequest } from "../../store/list/listActions";
import { AppDispatch } from "../../store/reducers";
import { createListStyle, newListButtonContStyle } from "./Board.style";

type CreateListProps = {
  boardId: number;
};

export const CreateList: React.FC<CreateListProps> = ({ boardId }) => {
  const board = useAppSelector((state) => state.app.boards[boardId]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { formValues, updateFormValues, clearFormValues } = useForm({
    title: "",
  });
  const createListRef = useRef<null | HTMLElement>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearFormValues();
  };

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    dispatch(
      createListRequest({
        data: {
          title: formValues.title || "Untitled Board",
          boardId: boardId,
          order: board.listIDs.length,
        },
      })
    );
    clearFormValues();
  };

  return (
    <Box ref={createListRef} sx={newListButtonContStyle}>
      <Button
        sx={{
          height: "100%",
          minWidth: "350px",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
        startIcon={<AddCircleIcon className="!text-red-500 !text-4xl" />}
        fullWidth
        size="large"
        onClick={handleClick}
      >
        Add a List
      </Button>
      <Popover
        open={open}
        anchorEl={createListRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={0}
        sx={{
          ".MuiPaper-root": { borderRadius: "4px", bgcolor: "secondary.main" },
        }}
      >
        <Box component="form" sx={createListStyle} onSubmit={handleCreateList}>
          <TextField
            className="!w-full !border-none !bg-gray-200"
            autoFocus
            name="title"
            placeholder="List Title"
            value={formValues.title}
            onChange={updateFormValues}
          />
          <Button
            type="submit"
            className="!bg-gray-200 !mt-2 !rounded-xl !text-gray-600"
          >
            Add
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};
