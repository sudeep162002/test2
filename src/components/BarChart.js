import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function PieChart(props) {
  console.log("RRER", Object.entries(props.data));

  const [series] = useState([
    {
      name: "Students",
      data: getData(),
    },
  ]);

  function getData() {
    let data = [];
    const val = Object.entries(props.data).map((d) => parseInt(d[1]));
    console.log("Value", val);
    for (let i = 0; i < 10; ++i) {
      data.push(val[i] + val[i + 1]);
    }
    console.log("DATA", data);
    return data;
  }

  const [options] = useState({
    chart: {
      height: 350,
      width: 600,
      type: "bar",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      title: {
        text: "Percentage marks of students",
        floating: true,
        offsetY: 330,
        align: "center",
        style: {
          color: "#444",
        },
      },
      categories: [
        "0-10",
        "10-20",
        "20-30",
        "30-40",
        "40-50",
        "50-60",
        "60-70",
        "70-80",
        "80-90",
        "90-100",
      ],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function(val) {
          return val;
        },
      },
    },
  });
  return (
    <div style={{ backgroundColor: "white" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={600}
      />
    </div>
  );
}

export default PieChart;
