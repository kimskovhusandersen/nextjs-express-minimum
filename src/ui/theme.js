import { createMuiTheme } from "@material-ui/core/styles";

const blue = "#0B72B9";
const orange = "#FFBA60";
const grey = "#868686";

const theme = createMuiTheme({
  palette: {
    common: {
      blue,
      orange
    },
    primary: {
      main: blue
    },
    secondary: {
      main: orange
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: "700",
      fontSize: "1rem",
      color: "white"
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white"
    },
    h1: {
      fontFamily: "Raleway",
      fontSize: "2.5rem",
      color: blue,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: blue
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: blue,
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: blue,
      lineHeight: 1
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: grey
    },
    subtitle2: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: "white"
    },
    body1: { fontSize: "1.25rem", color: grey, fontWeight: 300 },
    caption: {
      fontSize: "1rem",
      color: grey,
      fontWeight: 300
    },
    learnButton: {
      borderColor: blue,
      borderWidth: 2,
      textTransform: "none",
      color: blue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: blue,
        fontSize: "1rem"
      }
    },
    MuiInput: {
      root: { color: grey, fontWeight: 300 },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${blue}`
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${blue}`
        }
      }
    }
  }
});

export default theme;
