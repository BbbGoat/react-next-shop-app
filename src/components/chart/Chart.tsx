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
import { useSelector } from 'react-redux'
import { selectOrderHistory } from '@/redux/slice/orderSlice'
import { LuBarChart4 } from "react-icons/lu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {

  // 주문내역 가져오기
  const orders = useSelector(selectOrderHistory);

  // => 배송상태만 새 배열에 담기
  const array: string[] = [];
  orders.map((order)=>{
    const {orderStatus} = order;
    array.push(orderStatus);
  })

  const getOrderStatusCount = (arr: string[], value: string) => {
    return arr.filter((n) => n === value).length;
  }

  const [x1, x2, x3, x4] = ["주문수락", "주문처리중", "배송중", "배송완료"]

  const placed = getOrderStatusCount(array, x1);
  const processing = getOrderStatusCount(array, x2);
  const shipped = getOrderStatusCount(array, x3);
  const deliverd = getOrderStatusCount(array, x4);

  const data = {
    labels: ["주문수락", "주문처리중", "배송중", "배송완료"],
    datasets: [
      {
        label: '주문건수',
        data: [placed, processing, shipped, deliverd],
        backgroundColor: 'rgb(0, 153, 255, 0.5)',
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
        text: 'Delivery Status'
      }
    }
  }

  
  
  
  
  return (
    <div className={styles.charts}>
      <div className={styles.card}>
        <LuBarChart4 size={18} color={'#777'} style={{marginTop: '3px'}} />
        <h3>주문 상태 차트</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default Chart