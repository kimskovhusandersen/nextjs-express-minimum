import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "next/router";
import theme from "../src/ui/theme";
import Header from "../src/ui/Header";
import Footer from "../src/ui/Footer";

class App extends NextApp {
  constructor(props) {
    super(props);
    this.state = {
      menuIndex: 0,
      routeIndex: 0,
      anchorEl: null,
      openMenu: false
    };
    this.routes = [
      { name: "Home", link: "/", routeIndex: 0 },
      {
        name: "Services",
        link: "/services",
        routeIndex: 1,
        ariaOwns: this.state.anchorEl ? "simple-menu1" : null,
        ariaHaspopup: this.state.anchorEl ? "true" : null,
        onMouseOver: e => this.handleClick(e, 1),
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
      {
        name: "The Revolution",
        link: "/revolution",
        routeIndex: 2,
        menuOptions: [
          { name: "The Revolution", link: "/revolution", menuIndex: 0 },
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
      { name: "About Us", link: "/about", routeIndex: 3 },
      { name: "Contact Us", link: "/contact", routeIndex: 4 },
      { name: "Free Estimate", link: "/estimate", routeIndex: false }
    ];
  }

  setMenuIndex = i => {
    this.setState({
      menuIndex: i
    });
  };

  setRouteIndex = i => {
    this.setState({
      routeIndex: i
    });
  };
  setAnchorEl = el => {
    this.setState({
      anchorEl: el
    });
  };

  handleClick = (e, routeIndex) => {
    this.setAnchorEl(e.currentTarget);
    this.setOpenMenu(routeIndex);
  };

  setOpenMenu = i => {
    this.setState({
      openMenu: i
    });
  };

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  componentDidUpdate(prevState) {
    const { router } = this.props;
    const { routeIndex, menuIndex } = this.state;
    if (
      prevState.routeIndex !== routeIndex ||
      prevState.menuIndex !== menuIndex
    ) {
      this.routes.forEach(route => {
        switch (router.pathname) {
          case `${route.link}`:
            if (routeIndex !== route.routeIndex || menuIndex !== 0) {
              this.setRouteIndex(route.routeIndex);
              this.setMenuIndex(0);
            }
            break;
          default:
            break;
        }

        if (route.menuOptions) {
          route.menuOptions.forEach((menu, i) => {
            switch (router.pathname) {
              case "/revolution":
                break;
              case `${menu.link}`:
                if (
                  routeIndex !== route.routeIndex ||
                  menuIndex !== menu.menuIndex
                ) {
                  this.setRouteIndex(route.routeIndex);
                  this.setMenuIndex(menu.menuIndex);
                }
                break;
              default:
                break;
            }
          });
        }
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Header
            routeIndex={this.state.routeIndex}
            setRouteIndex={this.setRouteIndex}
            menuIndex={this.state.menuIndex}
            setMenuIndex={this.setMenuIndex}
            anchorEl={this.state.anchorEl}
            setAnchorEl={this.setAnchorEl}
            openMenu={this.state.openMenu}
            setOpenMenu={this.setOpenMenu}
            routes={this.routes}
          />
          <Component
            {...pageProps}
            routeIndex={this.state.routeIndex}
            setRouteIndex={this.setRouteIndex}
            menuIndex={this.state.menuIndex}
            setMenuIndex={this.setMenuIndex}
          />
          <Footer
            routeIndex={this.state.routeIndex}
            setRouteIndex={this.setRouteIndex}
            menuIndex={this.state.menuIndex}
            setMenuIndex={this.setMenuIndex}
            routes={this.routes}
          />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
