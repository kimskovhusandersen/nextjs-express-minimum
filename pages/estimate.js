import React, { useState, useEffect } from "react";
import Head from "next/head";
import { cloneDeep } from "lodash";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

import estimateAnimation from "../src/animations/estimateAnimation/data.json";

const useStyles = makeStyles(theme => ({
  icon: {
    width: "12em",
    height: "10em"
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    backgroundColor: theme.palette.common.orange,
    height: 50,
    width: 225,
    fontSize: "1.25rem",
    marginTop: "4em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2.5em"
    },
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    margin: "3em 0 2em",
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
  },
  specialText: {
    fontFamily: "Raleway",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.common.orange
  }
}));

const defaultQuestions = [
  {
    id: 1,
    title: "Which service are you instereted in?",
    active: true,
    options: [
      {
        id: 1,
        title: "Custom Software Development",
        subtitle: null,
        category: "service",
        icon: "/assets/software.svg",
        iconAlt: "three floating screens",
        selected: false,
        cost: 0
      },
      {
        id: 2,
        title: "iOS/Andriod App Development",
        subtitle: null,
        category: "service",
        icon: "/assets/mobile.svg",
        iconAlt: "phone and tablet outline",
        selected: false,
        cost: 0
      },
      {
        id: 3,
        title: "Website Development",
        subtitle: null,
        category: "service",
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 0
      }
    ]
  }
];

const softwareQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which platforms do you need supported?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Web Application",
        subtitle: null,
        category: "platform",
        icon: "/assets/website.svg",
        iconAlt: "computer outline",
        selected: false,
        cost: 100
      },
      {
        id: 2,
        title: "iOS Application",
        subtitle: null,
        category: "platform",
        icon: "/assets/iphone.svg",
        iconAlt: "outline of iphone",
        selected: false,
        cost: 100
      },
      {
        id: 3,
        title: "Android Application",
        subtitle: null,
        category: "platform",
        icon: "/assets/android.svg",
        iconAlt: "outlines of android phone",
        selected: false,
        cost: 100
      }
    ],
    active: true
  },
  {
    id: 3,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Photo/Video",
        subtitle: null,
        category: "feature",
        icon: "/assets/camera.svg",
        iconAlt: "camera outline",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "GPS",
        subtitle: null,
        category: "feature",
        icon: "/assets/gps.svg",
        iconAlt: "gps pin",
        selected: false,
        cost: 25
      },
      {
        id: 3,
        title: "File Transfer",
        subtitle: null,
        category: "feature",
        icon: "/assets/upload.svg",
        iconAlt: "outline of cloud with arrow pointing up",
        selected: false,
        cost: 25
      }
    ],
    active: false
  },
  {
    id: 4,
    title: "Which features do you expect to use?",
    subtitle: "Select all that apply.",
    options: [
      {
        id: 1,
        title: "Users/Authentication",
        subtitle: null,
        category: "feature",
        icon: "/assets/users.svg",
        iconAlt: "outline of a person with a plus sign",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "Biometrics",
        subtitle: null,
        category: "feature",
        icon: "/assets/biometrics.svg",
        iconAlt: "fingerprint",
        selected: false,
        cost: 25
      },
      {
        id: 3,
        title: "Push Notifications",
        subtitle: null,
        category: "feature",
        icon: "/assets/bell.svg",
        iconAlt: "outline of a bell",
        selected: false,
        cost: 25
      }
    ],
    active: false
  },
  {
    id: 5,
    title: "What type of custom features do you expect to need?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Low Complexity",
        subtitle: "(Informational)",
        category: "complexity",
        icon: "/assets/info.svg",
        iconAlt: "'i' inside a circle",
        selected: false,
        cost: 25
      },
      {
        id: 2,
        title: "Medium Complexity",
        subtitle: "(Interactive, Customizable, Realtime)",
        category: "complexity",
        icon: "/assets/customized.svg",
        iconAlt: "two toggle switches",
        selected: false,
        cost: 50
      },
      {
        id: 3,
        title: "High Complexity",
        subtitle: "(Data Modeling and Computation)",
        category: "complexity",
        icon: "/assets/data.svg",
        iconAlt: "outline of line graph",
        selected: false,
        cost: 100
      }
    ],
    active: false
  },
  {
    id: 6,
    title: "How many users do you expect?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "0-10",
        subtitle: null,
        category: "user",
        icon: "/assets/person.svg",
        iconAlt: "person outline",
        selected: false,
        cost: 1
      },
      {
        id: 2,
        title: "10-100",
        subtitle: null,
        category: "user",
        icon: "/assets/persons.svg",
        iconAlt: "outline of two people",
        selected: false,
        cost: 1.25
      },
      {
        id: 3,
        title: "100+",
        subtitle: null,
        category: "user",
        icon: "/assets/people.svg",
        iconAlt: "outline of three people",
        selected: false,
        cost: 1.5
      }
    ],
    active: false
  }
];

const websiteQuestions = [
  { ...defaultQuestions[0], active: false },
  {
    id: 2,
    title: "Which type of website are you wanting?",
    subtitle: "Select one.",
    options: [
      {
        id: 1,
        title: "Basic",
        subtitle: "(Informational)",
        category: "website",
        icon: "/assets/info.svg",
        iconAlt: "person outline",
        selected: false,
        cost: 100
      },
      {
        id: 2,
        title: "Interactive",
        subtitle: "(Users, API's, Messaging)",
        category: "website",
        icon: "/assets/customized.svg",
        iconAlt: "outline of two people",
        selected: false,
        cost: 200
      },
      {
        id: 3,
        title: "E-Commerce",
        subtitle: "(Sales)",
        category: "website",
        icon: "/assets/globe.svg",
        iconAlt: "outline of three people",
        selected: false,
        cost: 250
      }
    ],
    active: true
  }
];

const emailValidation = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneValidation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const vowelValidation = /^[aieouAIEOU].*/;

const Estimate = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const [questions, setQuestions] = useState(defaultQuestions);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [total, setTotal] = useState(0);
  const [selections, setSelections] = useState([]);
  const [service, setService] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [feature, setFeature] = useState([]);
  const [complexity, setComplexity] = useState([]);
  const [user, setUser] = useState([]);
  const [website, setWebsite] = useState([]);
  const [texts, setTexts] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: estimateAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    setService([...selections].filter(s => s.category === "service"));
    setPlatform([...selections].filter(s => s.category === "platform"));
    setFeature([...selections].filter(s => s.category === "feature"));
    setComplexity([...selections].filter(s => s.category === "complexity"));
    setUser([...selections].filter(s => s.category === "user"));
    setWebsite([...selections].filter(s => s.category === "website"));
  }, [selections]);

  useEffect(() => {
    let txts = [];

    if (platform.length) {
      let str = `You want ${service.map(s => s.title)} for`;
      platform.map((p, i, arr) => {
        str += arr.length - 1 === i ? (arr.length > 1 ? " and " : " ") : " ";
        str += vowelValidation.test(p.title.charAt(0)) ? "an " : "a ";
        str += p.title;
        str += arr.length - 1 === i ? "." : ",";
      });
      txts.push(str);
    }

    if (feature.length) {
      let str = "with ";
      feature.map((p, i, arr) => {
        str += arr.length - 1 === i ? (arr.length > 1 ? " and " : " ") : " ";
        str += p.title;
        str += arr.length - 1 === i ? "." : ",";
      });
      txts.push(str);
    }

    if (complexity.length || user.length) {
      let str = "";
      if (complexity.length) {
        str += "The custom features will be of ";
        complexity.map(p => (str += p.title.toLowerCase()));
      }
      if (user.length && !complexity.length) {
        str += "The ";
      } else if (user.length && complexity.length) {
        str += " and the ";
      }
      if (user.length) {
        str += "project will be used by about ";
        user.map(p => (str += p.title.toLowerCase()));
        str += " users";
      }
      str += ".";
      txts.push(str);
    }

    if (website.length) {
      let str = `You want `;
      website.map(p => {
        str += vowelValidation.test(p.title.charAt(0)) ? "an " : "a ";
        str += p.title;
        str += " Website.";
      });
      txts.push(str);
    }

    setTexts(txts);
  }, [service, platform, feature, complexity, user, website]);

  useEffect(() => {
    const current = questions.find(q => q.active);
    const last = questions[questions.length - 1];
    if (current.id === 1) {
      setDisabledPrev(true);
    } else if (disabledPrev === true) {
      setDisabledPrev(false);
    }
    if (current.id === last.id) {
      setDisabledNext(true);
    } else if (disabledNext === true) {
      setDisabledNext(false);
    }
  });

  useEffect(() => {
    if (!name || !!emailHelper || !!phoneHelper || !message || !!loading) {
      setFormDisabled(true);
    } else {
      setFormDisabled(false);
    }
  }, [name, email, phone, message, emailHelper, phoneHelper, loading]);

  const prevQuestions = () => {
    const qs = cloneDeep(questions);
    const currentIndex = qs.findIndex(q => q.active);
    const prevIndex = currentIndex - 1;
    qs[currentIndex] = { ...qs[currentIndex], active: false };
    qs[prevIndex] = {
      ...qs[prevIndex],
      active: true
    };
    setQuestions(qs);
  };

  const nextQuestion = () => {
    const qs = cloneDeep(questions);
    const currentIndex = qs.findIndex(q => q.active);
    const nextIndex = currentIndex + 1;
    qs[currentIndex] = { ...qs[currentIndex], active: false };
    qs[nextIndex] = {
      ...qs[nextIndex],
      active: true
    };
    setQuestions(qs);
  };

  const handleSelect = id => {
    const qs = cloneDeep(questions);
    const currentIndex = qs.findIndex(q => q.active);
    const current = qs.find(q => q.active);
    const selected = current.options.find(option => option.id === id);
    const updatedOptions = current.options.map(option =>
      option.id === id ||
      (current.subtitle === "Select one." && option.selected)
        ? { ...option, selected: !option.selected }
        : option
    );
    qs[currentIndex].options = updatedOptions;

    switch (selected.title) {
      case "Custom Software Development":
        setSelections([selected]);
        setQuestions(softwareQuestions);
        break;
      case "iOS/Andriod App Development":
        setSelections([selected]);
        setQuestions(softwareQuestions);
        break;
      case "Website Development":
        setSelections([selected]);
        setQuestions(websiteQuestions);
        break;
      default:
        setQuestions(qs);
    }
  };

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

  const getTotal = () => {
    let cost = 0;
    let selected = [...selections.filter(s => s.category === "service")];
    questions.forEach(q => {
      q.options.forEach(option => {
        if (option.selected) {
          selected.push(option);
          switch (q.title) {
            case "How many users do you expect?":
              cost *= option.cost;
              break;
            default:
              cost += option.cost;
              break;
          }
        }
      });
    });
    setTotal(cost);
    setSelections(selected);
  };

  return (
    <Grid container direction="row">
      <Head>
        <title key="title">
          Free Custom Software Estimate | Arc Development
        </title>
        <meta
          name="description"
          key="description"
          content="Use our free online estimate calculator to instantly check the cost of your custom software, mobile app, or website design and development project!"
        />
        <meta
          property="og:title"
          content="Bringing West Coast Technology to the Midwest | Free Estimate"
          key="og:title"
        />
        <meta property="og:url" content="arc.com/estimate" key="og:url" />
        <link rel="canonical" key="canonical" href="https://arc.com/estimate" />
      </Head>
      <Grid
        item
        container
        direction="column"
        lg
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          container
          style={{ margin: matchesMD ? "2em 0 0 0" : "2em 0 0 5em" }}
        >
          <Typography variant="h1" align={matchesMD ? "center" : undefined}>
            Estimate
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            margin: matchesMD ? "7.5em 0 0" : "7.5em 10em 0 0",
            maxWidth: "50em"
          }}
        >
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        lg
        style={{ margin: matchesMD ? "0 0 25em" : "0 2em 25em 0" }}
      >
        {questions
          .filter(q => q.active)
          .map(q => (
            <React.Fragment key={q.id}>
              <Grid item>
                <Typography
                  variant="h1"
                  align="center"
                  style={{
                    fontWeight: 500,
                    marginTop: "5em",
                    fontSize: "2.5rem",
                    lineHeight: 1.25,
                    margin: matchesSM ? "0 1em" : 0
                  }}
                  gutterBottom
                >
                  {q.title}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  style={{ marginBottom: "2.5em" }}
                  gutterBottom
                >
                  {q.subtitle}
                </Typography>
              </Grid>
              <Grid item container>
                {q.options.map(option => (
                  <Grid
                    key={option.id}
                    item
                    container
                    direction="column"
                    md
                    component={Button}
                    onClick={() => handleSelect(option.id)}
                    style={{
                      display: "grid",
                      textTransform: "none",
                      borderRadius: 0,
                      padding: matchesSM ? "1.25em 0" : 0,
                      backgroundColor: option.selected
                        ? theme.palette.common.orange
                        : null
                    }}
                  >
                    <Grid item style={{ maxWidth: "14em" }}>
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ marginBottom: "1em" }}
                      >
                        {option.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        align="center"
                        style={{ marginBottom: "1em" }}
                      >
                        {option.subtitle}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img
                        src={option.icon}
                        alt={option.iconAlt}
                        className={classes.icon}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          ))}

        <Grid
          item
          container
          justify="space-between"
          style={{ width: "18em", marginTop: "3em" }}
        >
          <Grid item>
            <IconButton disabled={disabledPrev} onClick={prevQuestions}>
              <img
                src={
                  !!disabledPrev
                    ? "/assets/backArrowDisabled.svg"
                    : "/assets/backArrow.svg"
                }
                alt="Previous question"
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton disabled={disabledNext} onClick={nextQuestion}>
              <img
                src={
                  !!disabledNext
                    ? "/assets/forwardArrowDisabled.svg"
                    : "/assets/forwardArrow.svg"
                }
                alt="Next question"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.estimateButton}
            onClick={() => {
              setDialogOpen(true);
              getTotal();
            }}
          >
            Get Estimate
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        style={{ zIndex: 1302 }}
        fullScreen={matchesSM}
        fullWidth
        maxWidth="lg"
      >
        <Grid container justify="center">
          <Grid item style={{ marginTop: "1.25em" }}>
            <Typography variant="h1" align="center">
              Estimate
            </Typography>
          </Grid>
        </Grid>
        <DialogContent>
          <Grid
            container
            justify="space-around"
            direction={matchesSM ? "column" : "row"}
            alignItems={matchesSM ? "center" : undefined}
          >
            <Grid
              item
              container
              direction="column"
              md={7}
              style={{ maxWidth: "20em" }}
            >
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
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify={matchesSM ? undefined : "center"}
              className="hihihihihi"
              alignItems={matchesSM ? "center" : undefined}
              md={5}
              style={{ maxWidth: "30em" }}
            >
              <Hidden smDown>
                <Grid item>
                  <Grid container direction="column">
                    {texts.map((text, i) => (
                      <Grid
                        key={i}
                        item
                        container
                        alignItems="flex-start"
                        style={{ marginBottom: "1.25em" }}
                      >
                        <Grid item xs={2}>
                          <img src="/assets/check.svg" alt="checkmark" />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="body1">{text}</Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Hidden>
              <Grid
                item
                container
                direction="column"
                style={{ marginTop: "1em" }}
                justify={matchesSM ? "center" : undefined}
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    paragraph
                    align={matchesSM ? "center" : undefined}
                  >
                    We can create this digital solution for an estimated{" "}
                    <span className={classes.specialText}>
                      ${total.toFixed(2)}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    align={matchesSM ? "center" : undefined}
                  >
                    Fill out your name, phone, number, and email, place your
                    request, and we'll get back to you with details moving
                    forward and a final price.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container direction="column" alignItems="center">
              <Button variant="contained" className={classes.estimateButton}>
                Place Request
                <img
                  src="/assets/send.svg"
                  alt="paper airplane"
                  style={{ marginLeft: "0.5em" }}
                />
              </Button>
            </Grid>
            <Grid
              item
              style={{ margin: matchesSM ? "5m 0" : "0 0 1.25em" }}
              align="center"
            >
              <Button
                style={{ fontWeight: 300 }}
                color="primary"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Estimate;
