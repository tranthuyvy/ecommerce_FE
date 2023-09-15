import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    mode: "dark", // Set the custom color mode name here
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#ff0000",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },
    blue: {
      main: "#178BFF",
    },
    success: {
      main: "#52C742",
    },

    background: {
      default: "",
      // paper: '#121019',
      paper: "rgb(0, 0, 22)",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#ff0000",
    },
  },
});

const customerTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9155FD",
    },
    secondary: {
      main: "#ff0000",
    },
    white: {
      main: "#fff",
    },
    orange: {
      main: "#ffdb0f",
    },
    blue: {
      main: "#000dff",
    },

    background: {
      default: "",
      // paper: '#121019',
      paper: "white",
    },
  },
});

export { customTheme, darkTheme, customerTheme };
