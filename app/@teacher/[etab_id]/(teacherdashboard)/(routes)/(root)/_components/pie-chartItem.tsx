import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { PropsWithChildren } from 'react';

interface PieChartItemProps {
  series: number[];
  colors: string[];
  numberOfStudent: number | "-";
}

const PieChartItem: React.FC<PropsWithChildren<PieChartItemProps>> = ({
  series,
  colors,
  numberOfStudent,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    colors: colors,
    tooltip: {
      enabled: false, // Disable tooltip
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            // show: true,
          },
        },
      },
    },
    annotations: {
      points: [
        {
          x: '50%',
          y: '50%',
          label: {
            text: `${numberOfStudent} Étudiant`,
            textAnchor: 'middle',
            style: {
              fontSize: '30px',
              color: '#000000',
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="chart-wrap relative">
        <div id="chart">
          <ReactApexChart
            key={series.join(',')}
            options={options}
            series={series}
            type="donut"
            width={230}
          />
        </div>
        <div className="text-center absolute left-[76px] top-[62px] duration-500 ">
          <span className=" text-[#4C4C4D] text-[32.17px] font-medium  leading-[18.56px]">
            {numberOfStudent}
            <br />
          </span>
          <span className="text-[#727272] text-[10.81px] font-medium  leading-[18.56px]">
            Total{' '}
          </span>

          <span className="text-[#727272] text-[10.81px] font-medium  capitalize leading-[18.56px]">
            étudiants
          </span>
        </div>
      </div>
    </div
