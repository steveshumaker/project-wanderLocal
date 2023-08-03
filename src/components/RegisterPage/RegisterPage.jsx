import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import Button from "@mui/material/Button";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          sx={{ mt: 3, mb: 2, width:"12em" }}
          variant="contained"
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
