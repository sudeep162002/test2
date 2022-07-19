import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function StudentChart(props) {
  const [data, setData] = useState([...Array(4)].map((e) => 0));
  useEffect(() => {
    function getData(studentName) {
      const a = props.data.find((d) => d.username === studentName);
      const values = [a.totalQuestions, a.totalMarks, a.correctAns, a.wrongAns];
      // return values;

      setData(values);
      // setData(values);
    }
    getData(props.studentName);
  }, [props]);

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
        "Total Questions",
        "Total Marks",
        "Correct Answer",
        "Wrong Answers",
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
        enabled: false,
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
    <div>
      <>
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Students",
              data: data,
            },
          ]}
          type="bar"
          height={350}
          width={600}
        />
      </>
    </div>
  );
}

export default StudentChart;
