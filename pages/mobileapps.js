import React from "react";
import Head from "next/head";
import Lottie from "react-lottie";
import Link from "../src/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

import CallToAction from "../src/ui/CallToAction";

import integrationAnimation from "../src/animations/integrationAnimation/data.json";

const useStyles = makeStyles(theme => ({
  heading: {
    maxWidth: "40em"
  },
  arrowContainer: {
    marginTop: "0.5em"
  },
  rowContainer: {
    padding: "0 5em",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.5em"
    }
  }
}));

const MobileApps = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const { setRouteIndex, setMenuIndex } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: integrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Grid container direction="column">
      <Head>
        <title key="title">
          iOS/Android App Design and Development | Arc Development
        </title>
        <meta
          name="description"
          key="description"
          content="Mobile Apps made easy | Our cutting-edge mobile app development process lets us build beautifully designed, carefully crafted apps for both iOS and Android."
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | iOS/Andriod App Development"
          key="og:title"
        />
        <meta property="og:url" content="arc.com/mobileapps" key="og:url" />
        <link
          rel="canonical"
          key="canonical"
          href="https://arc.com/mobileapps"
        />
      </Head>
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        justify={matchesMD ? "center" : undefined}
        className={classes.rowContainer}
        style={{ marginTop: matchesXS ? "1em" : "2em" }}
      >
        <Hidden mdDown>
          <Grid
            item
            className={classes.arrowContainer}
            style={{ marginRight: "1em", marginLeft: "-3.5em" }}
            onClick={() => setMenuIndex(1)}
          >
            <IconButton
              style={{ backgroundColor: "transparent" }}
              component={Link}
              href="/customsoftware"
            >
              <img
                src="/assets/backArrow.svg"
                alt="Back to Custom Software Development"
              />
            </IconButton>
          </Grid>
        </Hidden>
        <Grid item container direction="column" className={classes.heading}>
          <Grid item>
            <Typography align={matchesMD ? "center" : undefined} variant="h1">
              iOS/Android App Development
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
              paragraph
            >
              Mobile apps allow you to take your tools on the go.
            </Typography>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
              paragraph
            >
              Whether you want an app for your customers, employees, or
              yourself, we can build cross-platform native solutions for any
              part of your business process. This opens you up to a whole new
              world of possibilities by taking advantage of phone features like
              the camera, GPS, push notifications, and more.
            </Typography>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
              paragraph
            >
              Convenience. Connection.
            </Typography>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item className={classes.arrowContainer}>
            <IconButton
              style={{ backgroundColor: "transparent" }}
              component={Link}
              href="/websites"
              onClick={() => setMenuIndex(3)}
            >
              <img
                src="/assets/forwardArrow.svg"
                alt="forward to Website Development"
              />
            </IconButton>
          </Grid>
        </Hidden>
      </Grid>
      <Grid
        item
        container
        direction={matchesSM ? "column" : "row"}
        className={classes.rowContainer}
        style={{ margin: "15em 0" }}
      >
        <Grid item container direction="column" md>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="h4"
              gutterBottom
            >
              Integration
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
              paragraph
            >
              Our technology enables an innate interconnection between web and
              mobile applications, putting everything you need right in one
              convenient place.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
              paragraph
            >
              This allows you to extend your reach, reinvent interactions, and
              develop a stronger relationship with your users than ever before.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Lottie
            options={defaultOptions}
            style={{
              maxWidth: matchesMD ? "15em" : "20em",
              height: matchesMD ? "20em" : undefined
            }}
          />
        </Grid>
        <Grid item container direction="column" md>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : "right"}
              variant="h4"
              gutterBottom
            >
              Simultaneous Platform Support
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : "right"}
              variant="body1"
              paragraph
            >
              Our cutting-edge development process allows us to create apps for
              iPhone, Android, and tablets — all at the same time.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align={matchesMD ? "center" : "right"}
              variant="body1"
              paragraph
            >
              This significantly reduces costs and creates a more unified brand
              experience across all devices.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        className={classes.rowContainer}
        style={{
          marginBottom: "15em",
          display: matchesMD ? "grid" : undefined
        }}
      >
        <Grid item container direction="column" alignItems="center" md>
          <Grid item>
            <Typography align="center" variant="h4" gutterBottom>
              Extend Functionality
            </Typography>
          </Grid>
          <Grid item>
            <img src="/assets/swiss.svg" alt="swiss army knife" />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          md
          style={{ margin: matchesMD ? "10em 0" : 0 }}
        >
          <Grid item>
            <Typography align="center" variant="h4" gutterBottom>
              Extend Access
            </Typography>
          </Grid>
          <Grid item>
            <img
              src="/assets/access.svg"
              alt="tear-one-off sign"
              style={{ maxWidth: matchesXS ? "20em" : "28em" }}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" md>
          <Grid item>
            <Typography align="center" variant="h4" gutterBottom>
              Increase Engagement
            </Typography>
          </Grid>
          <Grid item>
            <img src="/assets/engagement.svg" alt="app with notification" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CallToAction
          setMenuIndex={setMenuIndex}
          setRouteIndex={setRouteIndex}
        />
      </Grid>
    </Grid>
  );
};

export default MobileApps;
