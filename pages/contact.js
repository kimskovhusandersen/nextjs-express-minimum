import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Link from "../src/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackBar from "@material-ui/core/SnackBar";

import ButtonArrow from "../src/ui/ButtonArrow";

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url("/assets/background.jpg")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url("/assets/mobileBackground.jpg")`
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
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    }
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: "5em",
    borderRadius: 5
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    heigh: 45,
    width: 245,
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down("sm")]: {
      heigh: 40,
      width: 225
    }
  }
}));

const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const Contact = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const { setRouteIndex, setMenuIndex } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);

  const initialAlert = {
    open: false,
    message: "",
    backgroundColor: ""
  };
  const [alert, setAlert] = useState(initialAlert);

  const onChange = event => {
    let { id, value } = event.target;
    switch (id) {
      case "email":
        setEmail(value);
        setEmailHelper(!emailValidation.test(value) ? "Invalid email" : "");
        break;
      case "phone":
        setPhone(value);
        setPhoneHelper(
          !phoneValidation.test(value) ? "Invalid phone number" : ""
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!name || !!emailHelper || !!phoneHelper || !message || !!loading) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, [name, email, phone, message, emailHelper, phoneHelper, loading]);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await axios.get("https://jsonplaceholder.typicode.com/todos/1");
      setAlert({
        open: true,
        message: "Message sent successfully!",
        backgroundColor: "#4bb543"
      });
    } catch (err) {
      setAlert({
        open: true,
        message: "Something went wront, please try again!",
        backgroundColor: "#ff3232"
      });
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  let buttonContents = (
    <>
      Send Message
      <img
        src="/assets/airplane.svg"
        alt="airplane"
        style={{ marginLeft: "1em" }}
      />
    </>
  );

  if (loading) {
    buttonContents = <CircularProgress size={30} />;
  }

  return (
    <Grid container direction="row">
      <Head>
        <title key="title">Contact Us | Arc Development</title>
        <meta
          name="description"
          key="description"
          content="Let us guide you through the custom software design and development process. Send us a message with any of your ideas or question to get started!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | Contact Us"
          key="og:title"
        />
        <meta property="og:url" content="arc.com/contact" key="og:url" />
        <link rel="canonical" key="canonical" href="https://arc.com/contact" />
      </Head>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ margin: matchesSM ? "1em 0 5em" : matchesMD ? "5em 0" : 0 }}
        lg={4}
        xl={3}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="h1"
                style={{ lineHeight: 1 }}
              >
                Contact Us
              </Typography>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="body1"
                style={{ color: theme.palette.common.blue }}
              >
                We're waiting.
              </Typography>
            </Grid>
            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <img
                  src="/assets/phone.svg"
                  alt="phone"
                  style={{
                    marginRight: "0.5em",
                    verticalAlign: "bottom"
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1em" }}
                >
                  <a
                    href="tel:5555555555"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    (555) 555-555
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ marginBottom: "2em" }}>
              <Grid item>
                <img
                  src="/assets/email.svg"
                  alt="envelope"
                  style={{
                    marginRight: "0.5em",
                    verticalAlign: "bottom"
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{ color: theme.palette.common.blue, fontSize: "1em" }}
                >
                  <a
                    href="mailto:zachary@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    zachary@gmail.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ width: "20em" }}>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Name"
                  id="name"
                  value={name}
                  fullWidth
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Email"
                  id="email"
                  value={email}
                  fullWidth
                  onChange={onChange}
                  error={!!emailHelper}
                  helperText={emailHelper}
                />
              </Grid>
              <Grid item style={{ marginBottom: "0.5em" }}>
                <TextField
                  label="Phone"
                  id="phone"
                  value={phone}
                  fullWidth
                  onChange={onChange}
                  error={!!phoneHelper}
                  helperText={phoneHelper}
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "20em" }}>
              <TextField
                InputProps={{ disableUnderline: true }}
                value={message}
                fullWidth
                multiline
                rows={10}
                id="message"
                onChange={e => setMessage(e.target.value)}
                className={classes.message}
              />
            </Grid>
            <Grid item container justify="center" style={{ marginTop: "2em" }}>
              <Button
                disabled={formDisabled}
                variant="contained"
                className={classes.sendButton}
                onClick={() => setOpenDialog(true)}
              >
                Send Message
                <img
                  src="/assets/send.svg"
                  alt="airplane"
                  style={{ marginLeft: "1em" }}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        fullScreen={matchesSM}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          style: {
            padding: matchesXS ? "0.4em" : matchesSM ? "5em" : "5em 15em"
          }
        }}
        style={{ zIndex: 1302 }}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography align="center" variant="h4" gutterBottom>
                Confirm Message
              </Typography>
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Name"
                id="name"
                value={name}
                fullWidth
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Email"
                id="email"
                value={email}
                fullWidth
                onChange={onChange}
                error={!!emailHelper}
                helperText={emailHelper}
              />
            </Grid>
            <Grid item style={{ marginBottom: "0.5em" }}>
              <TextField
                label="Phone"
                id="phone"
                value={phone}
                fullWidth
                onChange={onChange}
                error={!!phoneHelper}
                helperText={phoneHelper}
              />
            </Grid>
          </Grid>
          <Grid item style={{ maxWidth: matchesSM ? "100%" : "20em" }}>
            <TextField
              InputProps={{ disableUnderline: true }}
              value={message}
              fullWidth
              multiline
              rows={10}
              id="message"
              onChange={e => setMessage(e.target.value)}
              className={classes.message}
            />
          </Grid>
          <Grid
            item
            container
            direction={matchesSM ? "column" : "row"}
            style={{ marginTop: "2em" }}
            align="center"
          >
            <Grid item>
              <Button
                style={{ fontWeight: 300 }}
                color="primary"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={formDisabled}
                variant="contained"
                className={classes.sendButton}
                onClick={onConfirm}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <SnackBar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
      <Grid
        item
        container
        direction={matchesMD ? "column" : "row"}
        className={classes.background}
        alignItems="center"
        justify={matchesMD ? "center" : undefined}
        lg={8}
        xl={9}
      >
        <Grid
          item
          style={{
            marginLeft: matchesMD ? 0 : "3em",
            textAlign: matchesMD ? "center" : "inherit"
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography align={matchesMD ? "center" : undefined} variant="h1">
                Simple Software.
                <br />
                Revolutionary Results.
              </Typography>
              <Typography
                align={matchesMD ? "center" : undefined}
                variant="subtitle2"
                style={{ fontSize: "1.5rem" }}
              >
                Take advantage of the 21st Century
              </Typography>
              <Grid container justify={matchesMD ? "center" : undefined} item>
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
    </Grid>
  );
};

export default Contact;
