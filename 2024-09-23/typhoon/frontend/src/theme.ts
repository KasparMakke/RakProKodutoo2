import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Sinine (näide)
    },
    secondary: {
      main: "#ff4081", // Roosa (näide)
    },
    background: {
      default: "#f5f5f5", // Taust
    },
    text: {
      primary: "#000000", // Peamine tekst
      secondary: "#757575", // Teisene tekst
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h3: {
      fontWeight: 700,
      fontSize: "2rem",
    },
  },
});

export default theme;
