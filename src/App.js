// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchContributors } from "./actions";

import AppBar from "./AppBar";
import ColumnChart from "./ColumnChart";

type Props = {
  match: {
    params: {
      mode: "Normal" | "Stacked"
    }
  },
  fetchContributors: () => void
};

class App extends Component<Props> {
  componentDidMount() {
    this.props.fetchContributors();
  }

  render() {
    return (
      <AppBar
        items={["Normal", "Stacked"]}
        mode={this.props.match.params.mode || "Normal"}
      >
        <Route path="/:mode?" component={ColumnChart} />
      </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  fetchContributors: () => dispatch(fetchContributors())
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(App);
