import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Typography
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      // className={props.className}
      onClick={() => {
        history.push("/login");
        dispatch({ type: "LOGOUT" });
      }}
    >
      Log Out
    </Typography>
  );
}

export default LogOutButton;
