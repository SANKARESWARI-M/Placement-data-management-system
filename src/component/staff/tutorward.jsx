import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffPage = () => {
    const [students, setStudents] = useState([]);
    const [startRegNo, setStartRegNo] = useState("");
    const [endRegNo, setEndRegNo] = useState("");
    const [expandedRows, setExpandedRows] = useState({});

    // Fetch student details based on filter
    const fetchStudents = async () => {
        try {
            let url = "http://localhost:5000/api/students";
            if (startRegNo && endRegNo) {
                url += `?startRegNo=${startRegNo}&endRegNo=${endRegNo}`;
            }
            const response = await axios.get(url);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching student details:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Toggle detailed view
    const toggleDetails = (regno) => {
        setExpandedRows((prev) => ({
            ...prev,
            [regno]: !prev[regno],
        }));
    };

    return (
        <div>
            <h2>Student Details</h2>

            {/* Filter Section */}
            <div>
                <label>Start Register Number: </label>
                <input 
                    type="text" 
                    value={startRegNo} 
                    onChange={(e) => setStartRegNo(e.target.value)} 
                />
                <label>End Register Number: </label>
                <input 
                    type="text" 
                    value={endRegNo} 
                    onChange={(e) => setEndRegNo(e.target.value)} 
                />
                <button onClick={fetchStudents}>Filter</button>
            </div>

            {/* Student Table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>Register No</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <React.Fragment key={student.regno}>
                            <tr>
                                <td>{student.regno}</td>
                                <td>{student.name}</td>
                                <td>
                                    <button onClick={() => toggleDetails(student.regno)}>
                                        {expandedRows[student.regno] ? "Hide Details" : "View More"}
                                    </button>
                                </td>
                            </tr>
                            {expandedRows[student.regno] && (
                                <tr>
                                    <td colSpan="3">
                                        <div>
                                            <strong>Batch:</strong> {student.batch} <br />
                                            <strong>SSLC Percentage:</strong> {student.sslc_percentage}% <br />
                                            <strong>HSC Percentage:</strong> {student.hsc_percentage}% <br />
                                            <strong>CGPA:</strong> {student.cgpaOverall} <br />
                                            <strong>Semester CGPAs:</strong> 
                                            {[
                                                student.sem1_cgpa, student.sem2_cgpa, student.sem3_cgpa, 
                                                student.sem4_cgpa, student.sem5_cgpa, student.sem6_cgpa, 
                                                student.sem7_cgpa, student.sem8_cgpa
                                            ].filter(Boolean).join(", ")} <br />
                                            <strong>History of Arrear:</strong> {student.history_of_arrear} <br />
                                            <strong>Standing Arrear:</strong> {student.standing_arrear} <br />
                                            <strong>Address:</strong> {student.address} <br />
                                            <strong>Student Mobile:</strong> {student.student_mobile} <br />
                                            <strong>Secondary Mobile:</strong> {student.secondary_mobile || "N/A"} <br />
                                            <strong>College Email:</strong> {student.college_email} <br />
                                            <strong>Personal Email:</strong> {student.personal_email} <br />
                                            <strong>Aadhar Number:</strong> {student.aadhar_number} <br />
                                            <strong>PAN Card:</strong> {student.pancard_number} <br />
                                            <strong>Passport:</strong> {student.passport} <br />
                                            <strong>Degree:</strong> {student.degree} <br />
                                            <strong>Department:</strong> {student.dept} <br />
                                            <strong>Gender:</strong> {student.gender} <br />
                                            <strong>Date of Birth:</strong> {student.dob} <br />
                                            <strong>Placement Willingness:</strong> {student.placementWilling} <br />
                                            <strong>SSLC School:</strong> {student.sslcSchoolName}, {student.sslcBoard} ({student.sslcYear}) <br />
                                            <strong>HSC School:</strong> {student.hscSchoolName}, {student.hscBoard} ({student.hscYear}) <br />
                                            <strong>HSC Cutoff:</strong> {student.hsccutoff} <br />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffPage;
