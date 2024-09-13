"use client";

import { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import LoadingErrorComponent from "./LoadingErrorComponent"; // Import the new component

type BarChartData = [string, number][]; // Define specific type for BarChart data

const BarChart = () => {
  const [chartData, setChartData] = useState<BarChartData>([]);
  const [apiFailed, setApiFailed] = useState(false); // State to track API failure
  const [loading, setLoading] = useState(true); // State for loading
  const [timeoutError, setTimeoutError] = useState(false); // State to track timeout error
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the timeout ID

  // Function to fetch data
  const fetchData = async () => {
    const controller = new AbortController();

    // Set timeout to abort the request after 3 seconds
    timeoutIdRef.current = setTimeout(() => {
      controller.abort();
      setTimeoutError(true);
      setLoading(false);
    }, 3000);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bar-chart-data/", {
        signal: controller.signal, // Attach the abort controller signal
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const formattedData: BarChartData = [
        ["Product", "Sales"],
        ...data.labels.map((label: string, idx: number) => [label, data.data[idx]]),
      ];

      setChartData(formattedData);
      setApiFailed(false); // Reset the error state in case of success
      setTimeoutError(false); // Reset timeout error in case of success
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Fetch request timed out");
      } else {
        setApiFailed(true); // Set error state if API fails
      }
    } finally {
      // Clear timeout if the request succeeds or fails
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();

    // Cleanup: clear timeout if component unmounts
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  // Retry button to fetch data again
  const handleRetry = () => {
    setLoading(true); // Set loading to true while retrying
    setTimeoutError(false); // Reset timeout error state
    setApiFailed(false); // Reset API failure state
    fetchData(); // Retry fetching data
  };

  if (loading) {
    return <LoadingErrorComponent message="Loading data..." />;
  }

  if (timeoutError) {
    return <LoadingErrorComponent message="Request timed out. Please try again later." handleRetry={handleRetry} />;
  }

  if (apiFailed) {
    return <LoadingErrorComponent message="Failed to fetch data. Please try again later." handleRetry={handleRetry} />;
  }

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: "Bar Chart",
        hAxis: { title: "Sales" },
        vAxis: { title: "Product" },
      }}
    />
  );
};

export default BarChart;
