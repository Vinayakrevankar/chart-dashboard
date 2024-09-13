"use client"; // Mark it as a client component

import { useEffect, useState, useRef } from "react";
import { Chart } from "react-google-charts";
import LoadingErrorComponent from "./LoadingErrorComponent"; // Import the new component

// Define specific types for LineChart data
type LineChartData = [string, number][];

const LineChart = () => {
  const [chartData, setChartData] = useState<LineChartData>([]);
  const [apiFailed, setApiFailed] = useState(false); // State to track API failure
  const [loading, setLoading] = useState(true); // State to track loading
  const [timeoutError, setTimeoutError] = useState(false); // State to track timeout error
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Use ref to store the timeout ID

  // Function to fetch data from API
  const fetchData = async () => {
    const controller = new AbortController();

    // Set timeout to abort the request after 3 seconds
    timeoutIdRef.current = setTimeout(() => {
      controller.abort();
      setTimeoutError(true);
      setLoading(false);
    }, 3000);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/line-chart-data/", {
        signal: controller.signal, // Attach the abort controller signal
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const formattedData: LineChartData = [
        ["Month", "Sales"],
        ...data.labels.map((label: string, idx: number) => [label, data.data[idx]]),
      ];

      setChartData(formattedData);
      setApiFailed(false); // Reset error state on success
      setTimeoutError(false); // Reset timeout error on success
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
      setLoading(false); // End loading state
    }
  };

  // Fetch data on component mount
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

  // Display a loading message while data is being fetched
  if (loading) {
    return <LoadingErrorComponent message="Loading data..." />;
  }

  // Display an error message with a retry button if the request times out
  if (timeoutError) {
    return <LoadingErrorComponent message="Request timed out. Please try again later." handleRetry={handleRetry} />;
  }

  // Display an error message with a retry button if API request fails
  if (apiFailed) {
    return <LoadingErrorComponent message="Failed to fetch data. Please try again later." handleRetry={handleRetry} />;
  }

  // Render the line chart if data is successfully loaded
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={{
        title: "Line Chart",
        hAxis: { title: "Month" },
        vAxis: { title: "Sales" },
      }}
    />
  );
};

export default LineChart;
