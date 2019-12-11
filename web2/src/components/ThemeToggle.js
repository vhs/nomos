import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { themes, ThemeContext } from "./Theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = event => {
    if (event.target.checked) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.default);
    }
  };

  const checked = theme === themes.dark;

  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={handleChange} color="default" />
      }
      label="Dark mode"
    />
  );
};

export default ThemeToggle;
