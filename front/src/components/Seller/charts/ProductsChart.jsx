import React from 'react';
import ChartistGraph from 'react-chartist';

const ProductsChart = props => {
  const barChartData = {
    labels: ['First', 'Second', 'Third', 'Fourth'],
    series: [
      [60000, 40000, 80000, 70000],
      [40000, 30000, 70000, 65000],
      [8000, 3000, 10000, 6000]
    ]
  };
  const barChartOptions = {
    seriesBarDistance: 15,
    axisX: {
      offset: 20
    },
    axisY: {
      offset: 30,
      labelInterpolationFnc: function(value) {
        return value / 1000;
      },
      scaleMinSpace: 15
    }
  };
  return (
    <ChartistGraph
      data={barChartData}
      options={barChartOptions}
      type={'Bar'}
      {...props}
    />
  );
};

export default ProductsChart;
