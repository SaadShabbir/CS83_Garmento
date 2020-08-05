import React from 'react';
import ChartistGraph from 'react-chartist';

const MainChart = props => {
  const biPolarLineChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
      [1, 2, 3, 1, -2, 0, 1, 0],
      [-2, -1, -2, -1, -2.5, -1, -2, -1],
      [0, 0, 0, 1, 2, 2.5, 2, 1],
      [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
    ]
  };
  const biPolarLineChartOptions = {
    high: 5,
    low: -3,
    showArea: true,
    showLine: false,
    showPoint: false,
    fullWidth: true,
    axisX: {
      showLabel: true,
      showGrid: false
    }
  };
  return (
    <ChartistGraph
      data={biPolarLineChartData}
      options={biPolarLineChartOptions}
      type={'Line'}
      {...props}
    />
  );
};

export default MainChart;
