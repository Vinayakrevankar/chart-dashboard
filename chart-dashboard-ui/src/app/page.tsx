'use client';

import React from 'react';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

// Dynamically load chart components
const CandlestickChart = dynamic(() => import('./component/CandlestickChart'), { ssr: false });
const LineChart = dynamic(() => import('./component/LineChart'), { ssr: false });
const BarChart = dynamic(() => import('./component/BarChart'), { ssr: false });
const PieChart = dynamic(() => import('./component/PieChart'), { ssr: false });

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardGrid}>
          <div className={styles.widget}>
            <h2>Candlestick Chart</h2>
            <CandlestickChart />
          </div>
          <div className={styles.widget}>
            <h2>Line Chart</h2>
            <LineChart />
          </div>
          <div className={styles.widget}>
            <h2>Bar Chart</h2>
            <BarChart />
          </div>
          <div className={styles.widget}>
            <h2>Pie Chart</h2>
            <PieChart />
          </div>
        </div>
      </main>
    </div>
  );
}
