import React from "react";

import { IconButton, Tooltip } from "@material-ui/core";

const MyButton = ({ children, onClick, btnClassName, tipClassName, tip }) => {
  return (
    <div>
      <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
          {children}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default MyButton;
