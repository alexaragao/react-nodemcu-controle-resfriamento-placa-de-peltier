import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip bg-white p-1">
        <p className="label">{`${payload[0].value} °C`}</p>
        {/* <p className="intro">{label}</p> */}
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }
  return null;
}

const Chart = (props) => {
  const {data} = props;

  return (<LineChart
    width={900}
    height={350}
    data={data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
    <Line
      type='monotone'
      dataKey='temp'
      name='Temperatura'
      stroke='#333'
      activeDot={{r: 8}}
      />
    <CartesianGrid strokeDasharray='3 3'/>
    <Tooltip content={CustomTooltip}/>
    <YAxis/>
    <XAxis dataKey='time' />
    <Legend />
  </LineChart>);
}

export default Chart;