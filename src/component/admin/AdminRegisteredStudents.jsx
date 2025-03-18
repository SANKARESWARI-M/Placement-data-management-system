import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/adminStudentsregistered.css";
import { saveAs } from "file-saver";

const AdminRegisteredStudents = () => {
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [selectedRound, setSelectedRound] = useState("Round 1");
  const [selectedStudents, setSelectedStudents] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [placementData, setPlacementData] = useState(null); // Set null initially

  useEffect(() => {
    fetchRegisteredStudents();
  }, []);

  const fetchRegisteredStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin-registered-students");
      setRegisteredStudents(response.data);
      console.log("Fetched Students:", response.data); // Debugging log
    } catch (error) {
      console.error("Error fetching registered students:", error);
    }
  };

  const handleCheckboxChange = (regno) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [regno]: !prev[regno],
    }));
  };

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handlePostRounds = () => {
    const shortlistedStudents = registeredStudents
      .filter((student) => selectedStudents[student.regno])
      .map((student) => ({
        regno: student.regno,
        name: student.name,
        company_name: student.company_name,
        cleared_round: selectedRound,
      }));

    console.log("Posting students:", shortlistedStudents);
    localStorage.setItem("studentStatus", JSON.stringify(shortlistedStudents));
    alert("Shortlisted students posted successfully!");
  };

  const generateReport = () => {
    const shortlistedStudents = registeredStudents.filter((student) => selectedStudents[student.regno]);

    if (shortlistedStudents.length === 0) {
      alert("No students selected for the report.");
      return;
    }

    let csvContent =
      "Reg No,Name,College Email,Company Name,Batch,HSC %,SSLC %,CGPA,History of Arrears,Standing Arrears,Address,Student Mobile,Secondary Mobile,Personal Email,Aadhar Number,PAN Card Number,Passport\n";

    shortlistedStudents.forEach((student) => {
      csvContent += `${student.regno},${student.name},${student.college_email},${student.company_name},${student.batch},${student.hsc_percentage},${student.sslc_percentage},${student.cgpa},${student.history_of_arrear},${student.standing_arrear},"${student.address}",${student.student_mobile},${student.secondary_mobile},${student.personal_email},${student.aadhar_number},${student.pancard_number},${student.passport}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Shortlisted_Students_Report.csv");
  };

  const sendEmails = async () => {
    const shortlistedStudents = registeredStudents.filter((student) => selectedStudents[student.regno]);

    if (shortlistedStudents.length === 0) {
      alert("No students selected for email.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/send-emails", {
        students: shortlistedStudents,
        round: selectedRound,
      });

      alert("Emails sent successfully!");
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Failed to send emails.");
    }
  };

  const handlePlacedClick = (student) => {
    setPlacementData({ ...student, role: "", salarypackage: "", year: "" });
  };

  const handlePlacementInputChange = (e) => {
    const { name, value } = e.target;
    setPlacementData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlacementSubmit = async () => {
    if (!placementData.role || !placementData.salarypackage || !placementData.year) {
      alert("Please enter Role, Package, and Year before submitting.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/placed-students", {
        ...placementData,
      });

      alert("Placement details submitted successfully!");
      setPlacementData(null); // Reset after submission
      fetchRegisteredStudents(); // Refresh data
    } catch (error) {
      console.error("Error submitting placement details:", error);
      alert("Failed to submit placement details.");
    }
  };

  const handleDeleteUnselectedStudents = async () => {
    const selectedRegnos = Object.keys(selectedStudents).filter((regno) => selectedStudents[regno]);

    if (selectedRegnos.length === 0) {
      alert("No students selected. Please select at least one student before deleting unselected ones.");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/delete-unselected-students", {
        data: { selectedRegnos },
      });

      alert("Unselected students deleted successfully!");
      fetchRegisteredStudents();
    } catch (error) {
      console.error("Error deleting unselected students:", error);
      alert("Failed to delete unselected students.");
    }
  };

  const filteredStudents = registeredStudents.filter((student) =>
    student.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Registered Students</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Company Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-controls">
        <label>Select Round: </label>
        <select value={selectedRound} onChange={handleRoundChange}>
          {["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"].map((round) => (
            <option key={round} value={round}>
              {round}
            </option>
          ))}
        </select>
        <button className="post-btn" onClick={handlePostRounds}>
          Post
        </button>
        <button className="generate-report-btn" onClick={generateReport}>
          Generate Report
        </button>
        <button className="sendmail-btn" onClick={sendEmails}>
          Send Emails
        </button>
        <button className="delete-btn" onClick={handleDeleteUnselectedStudents}>
          Delete
        </button>
      </div>

      <table className="display-register-students">
        <thead>
          <tr>
            <th>Select</th>
            <th>Reg No</th>
            <th>Name</th>
            <th>College Email</th>
            <th>Company</th>
            <th>Batch</th>
            <th>HSC %</th>
            <th>SSLC %</th>
            <th>CGPA</th>
            <th>History of Arrears</th>
            <th>Standing Arrears</th>
            <th>Placed</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.regno}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents[student.regno] || false}
                  onChange={() => handleCheckboxChange(student.regno)}
                />
              </td>
              <td>{student.regno}</td>
              <td>{student.name}</td>
              <td>{student.college_email}</td>
              <td>{student.company_name}</td>
              <td>{student.batch}</td>
              <td>{student.hsc_percentage}</td>
              <td>{student.sslc_percentage}</td>
              <td>{student.cgpa}</td>
              <td>{student.history_of_arrear}</td>
              <td>{student.standing_arrear}</td>
              <td>
                <button onClick={() => handlePlacedClick(student)}>Placed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegisteredStudents;
