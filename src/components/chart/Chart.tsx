'use client'
import React from 'react'
import styles from './Chart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Chart = () => {

  const data = {
    labels: ["주문수락", "주문처리중", "배송중", "배송완료"],
    datasets: [
      {
        label: '주문건수',
        data: [1, 2, 3, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Delivery Service Bar Chart'
      }
    }
  }

  const getOrderStatusCount = (arr: string[], value: string) => {
    return arr.filter((n) => n === value).length;
  }
  const [x1, x2, x3, x4] = ["주문수락", "주문처리중", "배송중", "배송완료"]

  
  return (
    <div className={styles.charts}>
      <div className={styles.card}>
        <h3>주문 상태 차트</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default Chart