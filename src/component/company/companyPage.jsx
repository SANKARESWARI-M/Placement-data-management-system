import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CompanyPage = () => {
    const { companyName } = useParams();
    const [companyData, setCompanyData] = useState([]);
    const [selectedYearData, setSelectedYearData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/recruiters/${companyName}`)
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [companyName]);

    const handleBarClick = (data) => {
        setSelectedYearData(data);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Placement Data for {companyName}</h2>

            {/* Company Information */}
            {companyData.companyInfo && (
                <div style={styles.companyInfoContainer}>
                    <img
                        src={companyData.companyInfo.company_logo_url || 'default_logo.png'} // Use a fallback if no logo
                        alt={`${companyName} Logo`}
                        style={styles.companyLogo}
                    />
                    <h3>{companyData.companyInfo.company}</h3>
                    <p>{companyData.companyInfo.description}</p>
                    <p><strong>CEO:</strong> {companyData.companyInfo.ceo_name || "N/A"}</p>
                    <p><strong>Headquarters:</strong> {companyData.companyInfo.headquarters || "N/A"}</p>
                    <p><strong>Highest Salary Offered:</strong> ₹{companyData.companyInfo.highest_salary || "N/A"}</p>
                </div>
            )}

            {/* Bar Chart */}
            {companyData.yearSpecificData && (
                <div style={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={companyData.yearSpecificData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="no_of_students" fill="#007bff" onClick={(data) => handleBarClick(data)} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Display Table When a Bar is Clicked */}
            {selectedYearData && (
                <div style={styles.tableContainer}>
                    <h3>Details for {selectedYearData.year}</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>No. of Students Placed</th>
                                <th>Question Bank</th>
                                <th>Feedback Form</th>
                                <th>Company Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedYearData.year}</td>
                                <td>{selectedYearData.no_of_students}</td>
                                <td>
                                    {selectedYearData.question_bank_pdf ? (
                                        <a href={selectedYearData.question_bank_pdf} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                            Open Question Bank
                                        </a>
                                    ) : "Not Available"}
                                </td>
                                <td>
                                    {selectedYearData.feedback_form_pdf ? (
                                        <a href={selectedYearData.feedback_form_pdf} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                            Open Feedback Form
                                        </a>
                                    ) : "Not Available"}
                                </td>
                                <td>
                                    {selectedYearData.company_logo_url ? (
                                        <img
                                            src={selectedYearData.company_logo_url}
                                            alt="Company Logo"
                                            style={styles.logoImage}
                                        />
                                    ) : "Not Available"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// ✅ Inline CSS Styles
const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        color: "#333",
        marginBottom: "20px",
    },
    companyInfoContainer: {
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
    },
    companyLogo: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        marginBottom: "20px",
    },
    chartContainer: {
        width: "80%",
        margin: "auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    tableContainer: {
        marginTop: "20px",
    },
    table: {
        width: "80%",
        margin: "auto",
        borderCollapse: "collapse",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
    },
    th: {
        background: "#007bff",
        color: "#fff",
        padding: "10px",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
        fontWeight: "bold",
    },
    logoImage: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
    }
};

export default CompanyPage;
