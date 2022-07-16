import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  palette: {
    primary: { main: "#8700f5" },
    text: {
      primary: "#000",
      secondary: "#000",
    },
  },
});
function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
export default ThemeWrapper;
