import React from "react";
import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { MenuItem } from "react-pro-sidebar";


const Item = ({ title, to, icon, selected, setSelected }) =>{
    const Theme = useTheme();
    const colors = tokens(Theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
}

export default Item