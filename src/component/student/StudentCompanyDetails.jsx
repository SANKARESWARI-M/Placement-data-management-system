import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import '../../styles/companyDetails.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentCompanyDetails = () => {
  // const location = useLocation();
  // const { companyName } = useParams();
  // const navigate = useNavigate(); // ✅ Use navigate for back button
  // const [company, setCompany] = useState(location.state?.company || null);
  // const [loading, setLoading] = useState(!company);

  // useEffect(() => {
  //   if (!company && companyName) {
  //     const fetchCompanyData = async () => {
  //       try {
  //         const encodedCompanyName = encodeURIComponent(companyName);
  //         const response = await axios.get(`http://localhost:5000/company/${encodedCompanyName}`);
  //         console.log("Fetched Company Data:", response.data);

  //         if (response.data && Object.keys(response.data).length > 0) {
  //           setCompany(response.data);
  //         } else {
  //           console.error("No data found for company:", companyName);
  //         }
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching company details:", error.message);
  //         setLoading(false);
  //       }
  //     };
  //     fetchCompanyData();
  //   }
  // }, [company, companyName]);

  // if (loading) {
  //   return <p className="loading-message">Loading company details...</p>;
  // }

  // if (!company) {
  //   return <p className="error-message">Company not found</p>;
  // }

  // const roles = company.roles || [];
  // const skillSets = company.skillSets || [];
  // const localBranches = company.localBranches || [];

  // const [chartData, setChartData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Students Placed",
  //       data: [],
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // });

  // const [selectedYear, setSelectedYear] = useState(null);
  // const [studentDetails, setStudentDetails] = useState([]);

  // useEffect(() => {
  //   const fetchPlacementData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/placed-student?companyName=${company.companyName}`);
  //       const fetchedData = response.data || [];

  //       const years = [...new Set(fetchedData.map((item) => item.year))];
  //       const studentsPlaced = years.map((year) =>
  //         fetchedData.filter((item) => item.year === year).reduce((sum, item) => sum + item.student_count, 0)
  //       );

  //       setChartData({
  //         labels: years,
  //         datasets: [
  //           {
  //             label: "Students Placed",
  //             data: studentsPlaced,
  //             backgroundColor: "rgba(75, 192, 192, 0.6)",
  //             borderColor: "rgba(75, 192, 192, 1)",
  //             borderWidth: 1,
  //           },
  //         ],
  //       });
  //     } catch (error) {
  //       console.error("Error fetching placement data:", error.message);
  //     }
  //   };

  //   fetchPlacementData();
  // }, [company.companyName]);

  // const handleBarClick = async (event, elements) => {
  //   if (!elements.length) return;
  //   const clickedIndex = elements[0].index;
  //   const year = chartData.labels[clickedIndex];

  //   setSelectedYear(year);
  //   setStudentDetails([]);

  //   try {
  //     const response = await axios.get(`http://localhost:5000/student-details?companyName=${company.companyName}&year=${year}`);
  //     setStudentDetails(response.data || []);
  //   } catch (error) {
  //     console.error("Error fetching student details:", error.message);
  //   }
  // };

  // return (
  //   <>
      

  //     <div className="company-details-container">
  //       <div className="company-header">
  //         <h2>{company.companyName}</h2>
  //         <div className="company-logo-header">
  //           {company.logo ? (
  //             <img src={`http://localhost:5000/uploads/${company.logo}`} alt={company.companyName} />
  //           ) : (
  //             <p>No logo available</p>
  //           )}
  //         </div>
  //       </div>

  //       {/* <div className="company-info">
         
  //         <p><strong>Description:</strong> {company.description || "N/A"}</p>
  //         <p><strong>Objective:</strong> {company.objective || "N/A"}</p>
  //         <p><strong>CEO:</strong> {company.ceo || "N/A"}</p>
  //         <p><strong>Location:</strong> {company.location || "N/A"}</p>
  //         <p><strong>Skill Sets:</strong> {skillSets.length > 0 ? <ul>{skillSets.map((skill, i) => <li key={i}>{skill}</li>)}</ul> : "N/A"}</p>
  //         <p><strong>Local Branches:</strong> {localBranches.length > 0 ? <ul>{localBranches.map((branch, i) => <li key={i}>{branch}</li>)}</ul> : "N/A"}</p>
  //         <p><strong>Roles:</strong> {roles.length > 0 ? <ul>{roles.map((role, i) => <li key={i}>{role}</li>)}</ul> : "N/A"}</p>
  //         <p><strong>Package:</strong> {company.package || "N/A"}</p>
  //       </div> */}

  //       {/* <div className="chart-container">
  //         <Bar data={chartData} options={{ responsive: true, onClick: handleBarClick }} />
  //       </div> */}

  //       {/* {selectedYear && studentDetails.length > 0 && (
  //         <div className="student-details">
  //           <h3>Student Details for {selectedYear}</h3>
  //           <table>
  //             <thead>
  //               <tr><th>Name</th><th>Reg No</th><th>Role</th><th>Package</th></tr>
  //             </thead>
  //             <tbody>
  //               {studentDetails.map((s, i) => (
  //                 <tr key={i}><td>{s.name}</td><td>{s.regno}</td><td>{s.role}</td><td>{s.package} LPA</td></tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       )} */}
  //     </div>
  //   </>
  // );
};

export default StudentCompanyDetails;






// import React, { useState, useEffect } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// // import '../../../styles/companyDetails.css';
// import '../../styles/companyDetails.css';
// import StudentNavbar from "./navbar"; // ✅ Student Navbar

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const StudentCompanyDetails = () => {
//   const location = useLocation();
//   const { companyName } = useParams();
//   const [company, setCompany] = useState(location.state?.company || null);
//   const [loading, setLoading] = useState(!company);

//   useEffect(() => {
//     if (!company && companyName) {
//       const fetchCompanyData = async () => {
//         try {
//           const encodedCompanyName = encodeURIComponent(companyName);
//           const response = await axios.get(`http://localhost:5000/company/${encodedCompanyName}`);
//           console.log("Fetched Company Data:", response.data);

//           if (response.data && Object.keys(response.data).length > 0) {
//             setCompany(response.data);
//           } else {
//             console.error("No data found for company:", companyName);
//           }
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching company details:", error.message);
//           setLoading(false);
//         }
//       };
//       fetchCompanyData();
//     }
//   }, [company, companyName]);

//   if (loading) {
//     return <p className="loading-message">Loading company details...</p>;
//   }

//   if (!company) {
//     return <p className="error-message">Company not found</p>;
//   }

//   const roles = company.roles || [];
//   const skillSets = company.skillSets || [];
//   const localBranches = company.localBranches || [];

//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "Students Placed",
//         data: [],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   });

//   const [selectedYear, setSelectedYear] = useState(null);
//   const [studentDetails, setStudentDetails] = useState([]);

//   useEffect(() => {
//     const fetchPlacementData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/placed-student?companyName=${company.companyName}`);
//         const fetchedData = response.data || [];

//         const years = [...new Set(fetchedData.map((item) => item.year))];
//         const studentsPlaced = years.map((year) =>
//           fetchedData.filter((item) => item.year === year).reduce((sum, item) => sum + item.student_count, 0)
//         );

//         setChartData({
//           labels: years,
//           datasets: [
//             {
//               label: "Students Placed",
//               data: studentsPlaced,
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching placement data:", error.message);
//       }
//     };

//     fetchPlacementData();
//   }, [company.companyName]);

//   const handleBarClick = async (event, elements) => {
//     if (!elements.length) return;
//     const clickedIndex = elements[0].index;
//     const year = chartData.labels[clickedIndex];

//     setSelectedYear(year);
//     setStudentDetails([]);

//     try {
//       const response = await axios.get(`http://localhost:5000/student-details?companyName=${company.companyName}&year=${year}`);
//       setStudentDetails(response.data || []);
//     } catch (error) {
//       console.error("Error fetching student details:", error.message);
//     }
//   };

//   return (
//     <>
//       <StudentNavbar />
//       <div className="company-details-container">
//         <div className="company-header">
//           <h2>{company.companyName}</h2>
//           <div className="company-logo-header">
//             {company.logo ? (
//               <img src={`http://localhost:5000/uploads/${company.logo}`} alt={company.companyName} />
//             ) : (
//               <p>No logo available</p>
//             )}
//           </div>
//         </div>

//         <div className="company-info">
//           <p><strong>Description:</strong> {company.description || "N/A"}</p>
//           <p><strong>Objective:</strong> {company.objective || "N/A"}</p>
//           <p><strong>CEO:</strong> {company.ceo || "N/A"}</p>
//           <p><strong>Location:</strong> {company.location || "N/A"}</p>
//           <p><strong>Skill Sets:</strong> {skillSets.length > 0 ? <ul>{skillSets.map((skill, i) => <li key={i}>{skill}</li>)}</ul> : "N/A"}</p>
//           <p><strong>Local Branches:</strong> {localBranches.length > 0 ? <ul>{localBranches.map((branch, i) => <li key={i}>{branch}</li>)}</ul> : "N/A"}</p>
//           <p><strong>Roles:</strong> {roles.length > 0 ? <ul>{roles.map((role, i) => <li key={i}>{role}</li>)}</ul> : "N/A"}</p>
//           <p><strong>Package:</strong> {company.package || "N/A"}</p>
//         </div>

//         <div className="chart-container">
//           <Bar data={chartData} options={{ responsive: true, onClick: handleBarClick }} />
//         </div>

//         {selectedYear && studentDetails.length > 0 && (
//           <div className="student-details">
//             <h3>Student Details for {selectedYear}</h3>
//             <table>
//               <thead><tr><th>Name</th><th>Reg No</th><th>Role</th><th>Package</th></tr></thead>
//               <tbody>{studentDetails.map((s, i) => <tr key={i}><td>{s.name}</td><td>{s.regno}</td><td>{s.role}</td><td>{s.package} LPA</td></tr>)}</tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default StudentCompanyDetails;
