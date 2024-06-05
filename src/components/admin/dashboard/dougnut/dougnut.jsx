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
import PropTypes from "prop-types"
import { useSelector } from "react-redux";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import styles from "./dougnut.module.css";
import { useEffect, useRef, useState } from "react";
import { numberToTwoDecimals } from "../../../../helpers/utils";
import numberWithCommas from "../../../../helpers/commaSeperator";


const Dougnut = ({ data }) => {

  const label = ["This Month", "Last Month"]
  const chartDat = {
    labels: label,
    datasets: [
      {
        label: "",
        data: [data.thistx.fee ? numberWithCommas(numberToTwoDecimals(data.thistx.fee * data.matic)) : 0, data.lasttx.fee ? numberWithCommas(numberToTwoDecimals(data.lasttx.fee * data.matic)) : 0],
        backgroundColor: ["#13DEB9", "#5D87FF"],
        borderColor: ["transparent", "transparent"],
        borderWidth: 2,
        pointRadius: 2,
        cutout: "90%",
        pointHoverRadius: 4,
        rotation: 270        
      },
    ],

  };



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
      })),
    };

    setChartData(chartData);
  }, []);
  const { dark } = useSelector(
    (state) => state.mode
  );
  return (
    <div className={`${styles.doughnut} ${dark ? styles.dark : ""}`}>
      <h4>Monthly Profit</h4>
      <Chart
        ref={chartRef}
        height={150}
        width={600}
        type="doughnut"
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          
          plugins: {
            aspectRatio: 2,
            tooltip: {
              callbacks: {
                label: (toolTipItem) => {
                  return "Profit " + "$" + toolTipItem.formattedValue;
                },
              },
            },
            legend: {
              position: "right",
              labels: {
                usePointStyle: true,
                generateLabels: (chart) => {
                  const datasets = chart.data.datasets;
                  return datasets[0]?.data.map((data, i) => ({
                    text: `${chart.data?.labels[i]}`,
                    fillStyle: datasets[0].backgroundColor[i],
                    fontColor: dark ? "white" : "black",
                    index: i
                  }))
                }
              }
            }

          },

        }}
      />
    </div>
  );
}

export default Dougnut;
Dougnut.propTypes = {
  data: PropTypes.object,
};