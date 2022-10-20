import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Board } from "../components/Board/Board";
import { useAppSelector } from "../hooks/useAppSelector";
import { BoardHeader } from "../components/Board/BoardHeader";
import { Header } from "../components/Layout/Header";
import { AppContainer } from "../components/Layout/AppContainer";
import { Content } from "../components/Layout/Content";
import { CircularProgress } from "@mui/material";
import { getBoardRequest } from "../store/boards/boardActions";
import { AppDispatch } from "../store/reducers";
import { useDispatch } from "react-redux";

export const BoardContentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const boardId = Number(params.boardId);
  const appStatus = useAppSelector((state) => state.status.appStatus);

  useEffect(() => {
    dispatch(getBoardRequest({ boardId }));
  }, [dispatch, boardId]);

  return appStatus === "idle" ? (
    <AppContainer>
      <Header>
        <BoardHeader boardId={boardId} />
      </Header>
      <Content>
        <Board boardId={boardId} />
      </Content>
    </AppContainer>
  ) : (
    <CircularProgress />
  );
};
