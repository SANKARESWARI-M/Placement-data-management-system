import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ZohoPage = () => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recruiters/Zoho"); // Change 'Zoho' to dynamic if needed
        if (!response.ok) {
          throw new Error("Company not found");
        }
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  // Prepare the chart data (Year vs Students Placed)
  const chartData = {
    labels: companyData ? [companyData.year] : [],  // Only displaying one bar for simplicity, can be expanded for multiple years
    datasets: [
      {
        label: "Students Placed",
        data: companyData ? [companyData.studentsPlaced] : [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Handle bar click to show more details
  const handleBarClick = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      setSelectedYear(companyData.year);  // Display year of selected bar
    }
  };

  return (
    <div>
      {companyData ? (
        <div>
          <h2>{companyData.companyName} Placement Data</h2>

          {/* Bar Chart */}
          <Bar data={chartData} options={{ onClick: handleBarClick }} />

          {selectedYear && (
            <div>
              <h3>Details for {selectedYear}</h3>
              <p><strong>Year:</strong> {companyData.year}</p>
              <p><strong>Students Placed:</strong> {companyData.studentsPlaced}</p>
              <h3>Question Bank</h3>
              <p>{companyData.questionBank}</p>
              <h3>Feedback Form</h3>
              <p>{companyData.feedbackForm}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ZohoPage;
