import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import { Typography } from "@mui/material";
import {
  linkContainerStyle,
  linkFlexStyle,
  linkIconStyle,
  linkInnerContStyle,
  linkStyle,
  linkTextContStyle,
  linkTextStyle,
} from "./BoardList.style";

type BoardLinkProps = {
  boardId: number;
};

export const BoardLink: React.FC<BoardLinkProps> = ({ boardId }) => {
  const board = useAppSelector((state) => state.app.boards[boardId]);
  return (
    <Box sx={linkContainerStyle}>
      <Link to={`board${boardId}`} style={linkStyle}>
        <Box sx={linkInnerContStyle}>
          <Box sx={linkFlexStyle}>
            <PollOutlinedIcon color="primary" sx={linkIconStyle} />
          </Box>
          <Box sx={linkTextContStyle}>
            <Typography color="primary" sx={linkTextStyle}>
              {board.title}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
