import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { BoardMenu } from "./BoardMenu";
import { useRef, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { BoardEdit } from "./BoardEdit";
import { Link } from "react-router-dom";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import {
  backButtonStyle,
  backLinkStyle,
  buttonContainerStyle,
  editButtonStyle,
  titleContainerStyle,
} from "./Board.style";
import { Title } from "../Layout/Title";
import { MembersModal } from "../MembersModal/MembersModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';import { updateBoardRequest } from "../../store/boards/boardActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/reducers";
type BoardHeaderProps = {
  boardId: number;
};

export const BoardHeader: React.FC<BoardHeaderProps> = ({ boardId }) => {
  const pending = useAppSelector((state) => state.status.pending);
  const board = useAppSelector((state) => state.app.boards[boardId]);
  const auth = useAppSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const [membersModalStatus, setMembersModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const headerRef = useRef<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isOwner = board.ownerId === auth.userId;

  const startEdit = () => {
    setEditing(true);
  };

  const saveEdit = (value: string) => {
    dispatch(updateBoardRequest({ boardId: board.id, data: { title: value } }));
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditing(false);
  };

  const openMembersModal = () => {
    setMembersModalStatus(true);
  };
  const closeMembersModal = () => {
    setMembersModalStatus(false);
  };

  const openDeleteModal = () => {
    setDeleteModalStatus(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalStatus(false);
  };

  return (
    <Box
      ref={headerRef}
      sx={{ width: "100%", display: "flex", alignItems: "center" }}
    >
      <BoardEdit
        title={board.title}
        open={editing}
        anchor={headerRef.current!}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />
      <MembersModal
        open={membersModalStatus}
        close={closeMembersModal}
        boardId={boardId}
      />
      <ConfirmDeleteModal
        open={deleteModalStatus}
        close={closeDeleteModal}
        boardId={boardId}
      />
      <Box sx={backButtonStyle}>
        <Link to={`/user${auth.userId}`} style={backLinkStyle}>
          <Button
            className="!bg-cyan-500 !text-black !rounded-2xl"
            variant="contained"
            startIcon={<PollOutlinedIcon sx={{ mb: "2px" }} />}
          >
            Boards
          </Button>
        </Link>
      </Box>
      <Box sx={titleContainerStyle}>
        <Box className="!flex !items-center" sx={buttonContainerStyle}>
          {isOwner && (
            <IconButton
              onClick={startEdit}
              sx={editButtonStyle}
            >
              <VisibilityOutlinedIcon className="text-white" />
            </IconButton>
          )}
          <Title >{board.title}</Title>
        </Box>
      </Box>
      {pending ? (
        <Box sx={{ position: "absolute", right: "24px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ position: "absolute", right: "20px" }}>
          <BoardMenu
            boardId={boardId}
            openMembersModal={openMembersModal}
            openDeleteModal={openDeleteModal}
            startEdit={startEdit}
          />
        </Box>
      )}
    </Box>
  );
};
