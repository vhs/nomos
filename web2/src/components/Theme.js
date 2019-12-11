import React, { useState } from "react";
import PropTypes from "prop-types";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export const themes = {
  dark: "dark",
  default: "default"
};

const themeObjects = {
  dark: createMuiTheme({
    palette: {
      type: "dark"
    }
  }),
  default: createMuiTheme()
};

export const ThemeContext = React.createContext();

const initialThemeKey = () => {
  return window.localStorage.getItem("theme") || "default";
};

const initialTheme = () => {
  return themeObjects[initialThemeKey()] || themeObjects.default;
};

const Theme = ({ children }) => {
  const [theme, $setTheme] = useState(initialThemeKey());
  const [themeObject, setThemeObject] = useState(initialTheme());

  const setTheme = key => {
    $setTheme(key);
    window.localStorage.setItem("theme", key);
    setThemeObject(themeObjects[key] || themeObjects.default);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeObject, setThemeObject }}
    >
      <ThemeProvider theme={themeObject}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

Theme.propTypes = {
  children: PropTypes.any
};

export default Theme;
