import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useSelector } from "react-redux";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import styles from "./transactions.module.css";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Transaction = ({data}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const values = Object.values(data.count)
  const keys = Object.keys(data.count)
  let label = keys.map((item)=>new Date(item).getDate() + " " + months[new Date(item).getMonth()]);

  const chartDat = {
    labels: label,
    datasets: [
      {
        label: "",
        data: values,
        borderWidth: 2,
        pointRadius: 7,
        pointHoverRadius: 7,
      },
    ],
  };

  function createGradient(ctx) {
    // const colorStart = colors[0]

    const gradient = ctx.createLinearGradient(500, 0, 100, 0);

    gradient.addColorStop(0, "rgba(233, 4, 4, 0.70)");
    gradient.addColorStop(0.5, "rgba(233, 4, 4, 0.70)");
    gradient.addColorStop(1, "rgba(233, 4, 4, 0.70)");
    return gradient;
  }

  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...chartDat,
      datasets: chartDat.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx),
        pointBorderColor: "rgba(255, 255, 255, 0)",
        pointBackgroundColor: "rgba(255, 255, 255, 0)",
        pointHoverBackgroundColor: createGradient(chart.ctx),
        pointHoverBorderColor: createGradient(chart.ctx),
      })),
    };

    setChartData(chartData);
  }, []);

  const { dark } = useSelector(
    (state) => state.mode
); 
  return (
    <div className={`${styles.card} ${dark ? styles.dark : ""}`}>
      <div> 
        <h4>Transaction Count</h4>
        <p>30 days</p>
        </div>


      <Chart
        ref={chartRef}
        height={150}
        width={300}
        type="line"
        data={chartData}
        options={{

          tension: 0.5,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (toolTipItem) => {
                  return "Tx: " + toolTipItem.formattedValue;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(229, 231, 232, 0)",
                suggestedMin: Math.min.apply(null, chartDat.datasets[0].data) / 1.3,
                suggestedMax:
                  Math.max.apply(null, chartDat.datasets[0].data) * 1.3,
              },
            },
            y: {
              grid: {
                color: "rgba(229, 231, 232, 0.70)",
              },
              suggestedMin: Math.min.apply(null, chartDat.datasets[0].data) / 1.3,
              suggestedMax:
                Math.max.apply(null, chartDat.datasets[0].data) * 1.3,
            },
          },
        }}
      />
    </div>
  );
};

export default Transaction;
Transaction.propTypes = {
  data: PropTypes.object,
};