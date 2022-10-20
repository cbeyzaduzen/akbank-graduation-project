import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppContainer } from "../components/Layout/AppContainer";
import { Content } from "../components/Layout/Content";
import { ScrollContainer } from "../components/Layout/ScrollContainer";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { clearErrors } from "../store/boardStatus/boardStatusSlice";
import { AppDispatch } from "../store/reducers";

export const RegisterPage = () => {
  const appStatus = useAppSelector((state) => state.status.appStatus);
  const dispatch = useDispatch<AppDispatch>();

  const handleClearErrors = () => {
    dispatch(clearErrors());
  };

  return appStatus === "idle" ? (
    <AppContainer>
      <Content>
        <ScrollContainer>
          <RegisterForm>
            <Box display="flex" my={2}>
              <Typography mr={2}>Already have an account ? </Typography>
              <Typography color="primary">
                <Link
                  style={{ color: "#81E7F7" }}
                  onClick={handleClearErrors}
                  to="/login"
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </RegisterForm>
        </ScrollContainer>
      </Content>
    </AppContainer>
  ) : (
    <CircularProgress />
  );
};
