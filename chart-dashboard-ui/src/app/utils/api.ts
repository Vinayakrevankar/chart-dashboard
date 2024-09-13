// src/utils/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';  // Adjust the URL if necessary

// Define interfaces for the API responses
export interface CandlestickData {
  data: { x: string; open: number; high: number; low: number; close: number }[];
}

export const getCandlestickData = async (): Promise<CandlestickData> => {
  const response = await axios.get(`${API_BASE_URL}/candlestick-data/`);
  return response.data;
};

export const getLineChartData = async () => {
  const response = await axios.get(`${API_BASE_URL}/line-chart-data/`);
  return response.data;
};

export const getBarChartData = async () => {
  const response = await axios.get(`${API_BASE_URL}/bar-chart-data/`);
  return response.data;
};

export const getPieChartData = async () => {
  const response = await axios.get(`${API_BASE_URL}/pie-chart-data/`);
  return response.data;
};
