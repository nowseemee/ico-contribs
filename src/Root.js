// @flow
import React from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import rootReducer from "./reducers";

import App from "./App";

const store = createStore(rootReducer, applyMiddleware(thunk));
const theme = createMuiTheme({
  typography: {
    fontFamily: "Rubik,Arial,Helvetica Neue,Helvetica,sans-serif"
  },
  palette: {
    primary: {
      main: "#061258"
    }
  }
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/:mode?" component={App} />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

export default Root;
