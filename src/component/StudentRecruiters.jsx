import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

const RecruiterGraph = () => {
  const [recruiterData, setRecruiterData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/recruiters")
      .then(response => {
        setRecruiterData(response.data);
      })
      .catch(error => {
        console.error("Error fetching recruiter data:", error);
      });
  }, []);

  const years = recruiterData.map(item => item.year);
  const studentsPlaced = recruiterData.map(item => parseInt(item.no_of_students)); // Ensure numeric values

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Students Placed",
        data: studentsPlaced,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,  // Adjust interval as needed
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const year = years[index];
        const data = recruiterData.find(item => item.year === year);
        
        setSelectedYear(year);
        setSelectedData(data);
      }
    },
  };

  return (
    <div style={{ width: "60%", height: "300px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Student Placement Over the Years</h2>
      <Bar data={chartData} options={chartOptions} />

      {/* Display Details Below Graph on Bar Click */}
      {selectedData && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h3>📊 Placement Details for {selectedYear}</h3>
          <p><strong>Year:</strong> {selectedData.year}</p>
          <p><strong>Number of Students Placed:</strong> {selectedData.no_of_students}</p>

          {/* Links to PDFs */}
          <p>
  📄 <a href={selectedData.question_bank_pdf} target="_blank" rel="noopener noreferrer">
    Question Bank PDF
  </a>
</p>
<p>
  📝 <a href={selectedData.feedback_form_pdf} target="_blank" rel="noopener noreferrer">
    Feedback Form PDF
  </a>
</p>

          {/* <p>
            📄 <a href={selectedData.question_bank_pdf} target="_blank" rel="noopener noreferrer">
              Question Bank PDF
            </a>
          </p>
          <p>
            📝 <a href={selectedData.feedback_form_pdf} target="_blank" rel="noopener noreferrer">
              Feedback Form PDF
            </a>
          </p> */}
        </div>
      )}
    </div>
  );
};

export default RecruiterGraph;
