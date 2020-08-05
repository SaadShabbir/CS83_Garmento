import React from 'react';
import ChartistGraph from 'react-chartist';

const VisitorsChart = props => {
  const stachBarChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [500000, 1000000, 1200000, 1100000],
      [400000, 400000, 500000, 300000],
      [700000, 250000, 500000, 600000]
    ]
  };
  const stachBarChartOptions = {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return value / 1000 + 'k';
      }
    }
  };
  return (
    <ChartistGraph
      data={stachBarChartData}
      options={stachBarChartOptions}
      type={'Bar'}
      {...props}
    />
  );
};

export default VisitorsChart;
