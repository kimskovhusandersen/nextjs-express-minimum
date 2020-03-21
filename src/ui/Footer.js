import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Link from "../Link";

const routes = [
  { name: "Home", link: "/", routeIndex: 0 },
  {
    name: "Services",
    link: "/services",
    routeIndex: 1,
    menuOptions: [
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        menuIndex: 1
      },
      {
        name: "iOS/Android Development",
        link: "/mobileapps",
        menuIndex: 2
      },
      {
        name: "Website Development",
        link: "/websites",
        menuIndex: 3
      }
    ]
  },
  {
    name: "The Revolution",
    link: "/revolution",
    routeIndex: 2,
    menuOptions: [
      {
        name: "Technology",
        link: "/revolution",
        menuIndex: 1
      },
      {
        name: "Process",
        link: "/revolution",
        menuIndex: 2
      }
    ]
  },
  {
    name: "About Us",
    link: "/about",
    routeIndex: 3,
    menuOptions: [
      {
        name: "History",
        link: "/about",
        menuIndex: 1
      },
      {
        name: "Team",
        link: "/about",
        menuIndex: 2
      }
    ]
  },
  { name: "Contact Us", link: "/contact", routeIndex: 4 }
];

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative"
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "22em"
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em"
    }
  },
  mainContainer: {
    position: "absolute"
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: 700,
    textDecoration: "none",
    opacity: 0.7,
    "&:hover": { opacity: 1 }
  },
  linkSelected: {
    opacity: 1
  },
  gridItem: {
    margin: "3em"
  },
  icon: {
    height: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em"
    }
  },
  socialContainer: {
    position: "absolute",
    marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      right: "0.6em"
    }
  }
}));

const Footer = props => {
  const classes = useStyles();
  const { routeIndex, setRouteIndex, menuIndex, setMenuIndex } = props;

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid className={classes.mainContainer} container justify="center">
          {routes.map(route => {
            let menu = null;
            let routeOptionClasses = [classes.link];

            if (route.routeIndex === routeIndex && menuIndex < 1) {
              routeOptionClasses.push(classes.linkSelected);
            }
            if (route.menuOptions) {
              menu = route.menuOptions.map(menu => {
                let menuOptionClasses = [classes.link];
                if (
                  route.routeIndex === routeIndex &&
                  menu.menuIndex === menuIndex
                ) {
                  menuOptionClasses.push(classes.linkSelected);
                }
                return (
                  <Grid
                    className={[...menuOptionClasses].join(" ")}
                    component={Link}
                    item
                    key={route.routeIndex + menu.menuIndex}
                    onClick={() => {
                      setRouteIndex(route.routeIndex);
                      setMenuIndex(menu.menuIndex);
                    }}
                    href={menu.link}
                  >
                    {menu.name}
                  </Grid>
                );
              });
            }
            return (
              <Grid
                item
                className={classes.gridItem}
                key={route.link + route.routeIndex}
              >
                <Grid container direction="column" spacing={2}>
                  <Grid
                    component={Link}
                    onClick={() => {
                      setRouteIndex(route.routeIndex);
                      setMenuIndex(0);
                    }}
                    href={route.link}
                    item
                    className={[...routeOptionClasses].join(" ")}
                  >
                    {route.name}
                  </Grid>
                  {menu}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Hidden>
      <img
        src="/assets/footerAdornment.svg"
        alt="black decorative slash"
        className={classes.adornment}
      />
      <Grid
        container
        justify="flex-end"
        spacing={2}
        className={classes.socialContainer}
      >
        <Grid
          item
          component={"a"}
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="facebook logo"
            src="/assets/facebook.svg"
            className={classes.icon}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="twitter logo"
            src="/assets/twitter.svg"
            className={classes.icon}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="instagram logo"
            src="/assets/instagram.svg"
            className={classes.icon}
          />
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
