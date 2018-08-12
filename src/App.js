import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchContributors } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchContributors();
  }
  render() {
    return <div>{this.props.isLoading && "Loading..."}</div>;
  }
}

const mapStateToProps = state => ({ isLoading: state.contributors.isLoading });

const mapDispatchToProps = dispatch => ({
  fetchContributors: () => dispatch(fetchContributors())
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
