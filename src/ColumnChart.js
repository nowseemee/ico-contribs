// @flow
import ReactHighcharts from "react-highcharts";
import { connect } from "react-redux";
import { getPhases, getSeries } from "./utils";
import type { Store } from "./reducers";

const normalColumn = {
  pointPadding: 0.2,
  borderWidth: 0
};

const stackedColumn = {
  stacking: "normal",
  dataLabels: {
    enabled: true
  }
};

const getConfig = (phases, series, mode = "Normal") => ({
  colors: ["#3866FF", "#6F3BFF", "#06CFC5"],
  chart: {
    type: "column"
  },

  title: {
    text: `${mode} column chart`
  },
  subtitle: {
    text: "split by phase and coin type"
  },
  legend: {
    align: "right",
    verticalAlign: "middle",
    layout: "vertical"
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: phases,
    labels: {
      x: -10
    }
  },
  yAxis: {
    allowDecimals: false,
    title: {
      text: "Amount"
    }
  },
  series,
  tooltip: {
    headerFormat: "<b>{point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
  },
  plotOptions: {
    column: mode === "Stacked" ? stackedColumn : normalColumn
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal"
          },
          yAxis: {
            labels: {
              align: "left",
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          }
        }
      }
    ]
  }
});

const mapStateToProps = (store: Store, ownProps) => ({
  config: getConfig(
    getPhases(store),
    getSeries(store),
    ownProps.match.params.mode
  )
});

export default connect(mapStateToProps)(ReactHighcharts);
