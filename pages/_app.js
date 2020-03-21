import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/ui/theme";
import Header from "../src/ui/Header";
import Footer from "../src/ui/Footer";

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { menuIndex: 0, routeIndex: 0 };
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

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
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
          />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
