import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "../Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Logo from "./Logo";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired
};

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    whiteSpace: "nowrap",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": { opacity: 1 }
  },
  drawerIcon: {
    height: "40px",
    width: "40px",
    [theme.breakpoints.down("xs")]: {
      height: "35px",
      width: "35px"
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": { backgroundColor: "transparent" }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

const Header = props => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openMenu, setOpenMenu] = useState(false);
  const { routeIndex, setRouteIndex, menuIndex, setMenuIndex } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const routes = [
    { name: "Home", link: "/", routeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      routeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu1" : null,
      ariaHaspopup: anchorEl ? "true" : null,
      onMouseOver: e => handleClick(e, 1),
      menuOptions: [
        { name: "Services", link: "/services", menuIndex: 0 },
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
    { name: "The Revolution", link: "/revolution", routeIndex: 2 },
    { name: "About Us", link: "/about", routeIndex: 3 },
    { name: "Contact Us", link: "/contact", routeIndex: 4 },
    { name: "Free Estimate", link: "/estimate", routeIndex: false }
  ];

  useEffect(() => {
    routes.forEach(route => {
      switch (router.pathname) {
        case `${route.link}`:
          if (routeIndex !== route.routeIndex || menuIndex !== 0) {
            setRouteIndex(route.routeIndex);
            setMenuIndex(0);
          }
          break;
        default:
          break;
      }

      if (route.menuOptions) {
        route.menuOptions.forEach(menu => {
          switch (router.pathname) {
            case `${menu.link}`:
              if (
                routeIndex !== route.routeIndex ||
                (menu.menuIndex && menu.menuIndex !== menuIndex)
              ) {
                setRouteIndex(route.routeIndex);
                setMenuIndex(menu.menuIndex);
              }
              break;
            default:
              break;
          }
        });
      }
    });
  }, [
    routeIndex,
    setRouteIndex,
    routes,
    menuIndex,
    setMenuIndex,
    router.pathname
  ]);

  const handleClick = (e, routeIndex) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(routeIndex);
  };

  const handleChange = (e, newValue) => {
    setRouteIndex(newValue);
    setMenuIndex(0);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, menuIndex) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setMenuIndex(menuIndex);
  };

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        indicatorColor="primary"
        onChange={handleChange}
        value={routeIndex}
      >
        {routes.map(route => {
          if (route.link !== "/estimate") {
            return (
              <Tab
                aria-haspopup={route.ariaHaspopup}
                aria-owns={route.ariaOwns}
                className={classes.tab}
                component={Link}
                href={route.link}
                key={route.routeIndex + route.link}
                label={route.name}
                onMouseOver={route.onMouseOver}
              />
            );
          }
        })}
      </Tabs>
      <Button
        component={Link}
        href="/estimate"
        className={classes.button}
        color="secondary"
        variant="contained"
        onClick={() => setRouteIndex(false)}
      >
        Free Estimate
      </Button>
      {routes.map(route => {
        let menu = null;
        if (route.menuOptions) {
          menu = (
            <Menu
              anchorEl={anchorEl}
              classes={{ paper: classes.menu }}
              elevation={0}
              id={`simple-menu${route.routeIndex}`}
              keepMounted
              key={route.link + "menuOptions"}
              MenuListProps={{ onMouseLeave: handleClose }}
              open={openMenu === route.routeIndex}
              onClose={handleClose}
              style={{ zIndex: 1302 }}
            >
              {route.menuOptions.map(menu => {
                return (
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    component={Link}
                    href={menu.link}
                    key={menu.name}
                    onClick={e => {
                      handleMenuItemClick(e, menu.menuIndex);
                      setRouteIndex(route.routeIndex);
                      handleClose();
                    }}
                    selected={
                      menuIndex === menu.menuIndex &&
                      routeIndex === route.routeIndex
                    }
                  >
                    {menu.name}
                  </MenuItem>
                );
              })}
            </Menu>
          );
        }
        return menu;
      })}
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List>
          {routes.map(option => {
            const listItemClasses = [];
            const listItemTextClasses = [classes.drawerItem];

            if (option.link === "/estimate") {
              listItemClasses.push(classes.drawerItemEstimate);
            }
            if (routeIndex === option.routeIndex) {
              listItemTextClasses.push(classes.drawerItemSelected);
            }
            return (
              <ListItem
                key={option.routeIndex}
                onClick={() => {
                  setOpenDrawer(false);
                  setRouteIndex(option.routeIndex);
                }}
                divider
                button
                component={Link}
                href={option.link}
                className={[...listItemClasses].join(" ")}
                selected={routeIndex === option.routeIndex}
              >
                <ListItemText
                  className={[...listItemTextClasses].join(" ")}
                  disableTypography
                >
                  {option.name}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              href="/"
              disableRipple
              className={classes.logoContainer}
              style={{ textDecoration: "none" }}
              onClick={() => {
                setRouteIndex(0);
                setMenuIndex(0);
              }}
            >
              <Logo classes={classes.logo} />
            </Button>
            <Hidden mdDown>{tabs}</Hidden>
            <Hidden lgUp>{drawer}</Hidden>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
