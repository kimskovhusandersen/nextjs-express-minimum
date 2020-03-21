import React from "react";
import Link from "../Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonArrow from "./ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em"
    }
  },
  background: {
    backgroundImage: `url("/assets/background.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url("/assets/mobileBackground.jpg")`,
      backgroundAttachment: "inherit"
    }
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    heigh: 80,
    width: 205,
    backgroundColor: theme.palette.common.orange,
    marginRight: "5em",
    marginLeft: "2em",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginRight: 0
    }
  }
}));
const CallToAction = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { setRouteIndex, setMenuIndex } = props;
  return (
    <Grid
      container
      alignItems="center"
      justify={matchesSM ? "center" : "space-between"}
      className={classes.background}
      direction={matchesSM ? "column" : "row"}
      style={{ height: "60em" }}
    >
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : "5em",
          textAlign: matchesSM ? "center" : "inherit"
        }}
      >
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h1">
              Simple Software.
              <br />
              Revolutionary Results.
            </Typography>
            <Typography variant="subtitle2" style={{ fontSize: "1.5rem" }}>
              Take advantage of the 21st Century
            </Typography>
            <Grid container justify={matchesSM ? "center" : undefined} item>
              <Button
                component={Link}
                href="/revolution"
                variant="outlined"
                className={classes.learnButton}
                onClick={() => {
                  setRouteIndex(3);
                  setMenuIndex(0);
                }}
              >
                <span style={{ marginRight: 5 }}>Learn More</span>
                <ButtonArrow
                  width={10}
                  height={10}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          component={Link}
          href="/estimate"
          variant="contained"
          className={classes.estimateButton}
          onClick={() => {
            setRouteIndex(false);
            setMenuIndex(0);
          }}
        >
          Free Estimate
        </Button>
      </Grid>
    </Grid>
  );
};

export default CallToAction;
