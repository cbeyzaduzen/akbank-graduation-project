import { CommentOutlined } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Comment } from "../../store/cards/cardSlice";
import { commentStyle } from "./CardModal.style";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { addCommentRequest } from "../../store/cards/cardActions";
import { AppDispatch } from "../../store/reducers";
import { useDispatch } from "react-redux";

type CommnetsProps = {
  cardID: number;
  comments: Comment[];
};

export const Comments: React.FC<CommnetsProps> = ({ cardID, comments }) => {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.auth.username)!;
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    dispatch(
      addCommentRequest({ username, data: { cardId: cardID, message: newComment } })
    );
    setNewComment("");
  };

  return (
    <Box width="100%">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CommentOutlined />
        <Typography color="#252F3E" py={1} ml={1} fontWeight={700}>
          Comments
        </Typography>
      </Box>
      <Box>
        {comments.length === 0 && (
          <Typography sx={{ my: 1 }} color="text.disabled">
            There are no comments yet...
          </Typography>
        )}
      </Box>
      <Box className="!flex !items-center">
        <Avatar
          className="!mr-2"
          alt="Cemile Beyza Düzen"
          src="/static/images/avatar/1.jpg"
        />
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          multiline
          variant="outlined"
          label="Add Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </Box>
      <Button
        className="!ml-12 !mt-2 !mb-5 !bg-gray-200 !text-gray-400 !rounded-2xl"
        onClick={handleAddComment}
      >
        Save
      </Button>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormatListBulletedOutlinedIcon />
        <Typography color="#252F3E" py={1} ml={1} fontWeight={700}>
          Activity
        </Typography>
      </Box>
      <Box>
        {comments.map((comment) => {
          let createDate: any = comment.createdAt?.split("T");
          let newCreateDate = createDate[0];
          return (
            <>
              <Box
                key={comment.id}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <Tooltip title={comment.author.username}>
                  <Avatar className="!mr-3">
                    {comment.author.username.slice(0, 1).toUpperCase()}
                  </Avatar>
                </Tooltip>
                <Box sx={commentStyle}>
                  <div className="!flex">
                    <Typography className="!font-semibold !text-gray-500 !mr-3">
                      {comment.author.username}
                    </Typography>
                    <Typography className="!font-thin !text-gray-500">
                      {newCreateDate}
                    </Typography>
                  </div>

                  <Typography className="!text-gray-700">
                    {comment.message}
                  </Typography>
                </Box>
              </Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};
