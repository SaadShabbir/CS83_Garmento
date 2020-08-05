import React from 'react';
import ChartistGraph from 'react-chartist';

const NewVendorsChart = props => {
  const halfDoughnatChartData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };
  const halfDoughnatChartOptions = {
    labelInterpolationFnc: function(value) {
      return value[0];
    }
  };
  return (
    <ChartistGraph
      data={halfDoughnatChartData}
      options={halfDoughnatChartOptions}
      type={'Pie'}
      {...props}
    />
  );
};

export default NewVendorsChart;
