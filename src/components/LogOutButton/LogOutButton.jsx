import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      // className={props.className}
      style={{ color: "black", border: "1px solid black" }}
      onClick={() => {
        dispatch({ type: "LOGOUT" });
        setTimeout(() => history.push("/login"), 100);
      }}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
