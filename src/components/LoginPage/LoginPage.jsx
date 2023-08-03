import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
// MUI
import Button from "@mui/material/Button";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2, width:"12em" }}
          onClick={() => {
            history.push("/registration");
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
