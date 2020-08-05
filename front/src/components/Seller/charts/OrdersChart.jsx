import React from 'react';
import ChartistGraph from 'react-chartist';

const OrdersChart = props => {
  const lineChartWithAreaData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [[5, 7, 3, 10, 15, 13, 11, 14]]
  };
  const lineChartWithAreaOptions = {
    low: 0,
    showArea: true
  };
  return (
    <ChartistGraph
      data={lineChartWithAreaData}
      options={lineChartWithAreaOptions}
      type={'Line'}
      {...props}
    />
  );
};

export default OrdersChart;
