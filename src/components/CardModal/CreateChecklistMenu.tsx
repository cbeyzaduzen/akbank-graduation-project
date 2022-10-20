import { CheckBoxOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Box, Button, IconButton, Popover, TextField } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import {
  cListFormContStyle,
  cListFormInnerContStyle,
  cListFormStyle,
} from "./CardModal.style";
import { createCheckListRequest } from "../../store/checklist/checklistActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/reducers";

type CreateChecklistProps = {
  cardID: number;
};

export const CreateChecklist: React.FC<CreateChecklistProps> = ({ cardID }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { formValues, updateFormValues, clearFormValues } = useForm({
    checklistTitle: "",
  });

  const handleAddChecklist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createCheckListRequest({
        data: {
          cardId: cardID,
          title: formValues.checklistTitle || "Untitled Checklist",
        },
      })
    );
    handleClose();
    clearFormValues();
  };

  return (
    <Box>
      <IconButton onClick={handleClick} color="secondary">
        <CheckBoxOutlined />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 1 }}
      >
        <Box component="form" onSubmit={handleAddChecklist} sx={cListFormStyle}>
          <Box sx={cListFormContStyle}>
            <Box sx={cListFormInnerContStyle}>
              <TextField
                autoFocus
                sx={{ width: "100%", my: 2 }}
                name="checklistTitle"
                label="Checklist Title"
                value={formValues.checklistTitle}
                onChange={updateFormValues}
                variant="outlined"
              />
              <Button
                type="submit"
                className="!bg-gray-200 !text-gray-400 !rounded-2xl"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
