import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import '../../styles/StudentProfile.css';

const StudentProfile = () => {
    const [showForm, setShowForm] = useState(false); // Controls form visibility
    const [studentData, setStudentData] = useState(null); // Store fetched student data

    const [formData, setFormData] = useState({
        regno: "",
        name: "",
        batch: "",
        degree:"",
        dept:"",
        gender:"",
        dob:"",
        hsc_percentage: "",
        sslc_percentage: "",
        sslcSchoolName:"",
        sslcBoard:"",
        sslcYear:"",
        hscSchoolName: "",
        hscBoard: "",
        hscYear: "",
        hsccutoff: "",
        sem1_cgpa: "",
        sem2_cgpa: "",
        sem3_cgpa: "",
        sem4_cgpa: "",
        sem5_cgpa: "",
        sem6_cgpa: "",
        sem7_cgpa: "",
        sem8_cgpa: "",
        cgpaOverall: "",
        history_of_arrear: "No",
        standing_arrear: "No",
        address: "",
        student_mobile: "",
        secondary_mobile: "",
        college_email: "",
        personal_email: "",
        aadhar_number: "",
        pancard_number: "",
        passport: "No",
        placementWilling: "Yes"
    });

    // 🔹 Fetch Student Profile Data on Component Mount (Using `regno` from `localStorage`)
    useEffect(() => {
        const fetchStudentData = async () => {
            const regno = localStorage.getItem("regno"); // Get stored regno
            if (!regno) return; // Prevent fetching if no regno is found

            try {
                const response = await axios.get(`http://localhost:5000/api/student-profile/${regno}`);
                setStudentData(response.data); // Store fetched data
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const aadharRegex = /^\d{12}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (!phoneRegex.test(formData.student_mobile)) {
            alert("Invalid Student Mobile Number");
            return false;
        }
        if (formData.secondary_mobile && !phoneRegex.test(formData.secondary_mobile)) {
            alert("Invalid Secondary Mobile Number");
            return false;
        }
        if (!emailRegex.test(formData.college_email) || !emailRegex.test(formData.personal_email)) {
            alert("Invalid Email Format");
            return false;
        }
        if (!aadharRegex.test(formData.aadhar_number)) {
            alert("Invalid Aadhar Number (12 digits required)");
            return false;
        }
        if (!panRegex.test(formData.pancard_number)) {
            alert("Invalid PAN Card Number");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/student-profile", formData);
            alert(response.data.message);

            // Fetch updated profile data after saving
            const regno = localStorage.getItem("regno");
            const updatedData = await axios.get(`http://localhost:5000/api/student-profile/${regno}`);
            setStudentData(updatedData.data);
            
            setShowForm(false); // Hide form after submission
        } catch (error) {
            alert(error.response?.data?.message || "Error submitting form");
        }
    };

    return (
        <>
        <Navbar/>
          <div className="profile-container">
            <h2>Student Profile</h2>

            {/* Create Profile Button */}
            {!showForm && (
                <button onClick={() => setShowForm(true)} className="create-profile-btn">
                    Create Profile
                </button>
            )}

            {/* Profile Form - Visible only when showForm is true */}
            {showForm && (
                <form onSubmit={handleSubmit}>
                <input type="text" name="regno" placeholder="Register Number" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="batch" placeholder="Batch" onChange={handleChange} required />
            <input type="text" name="degree" placeholder="Degree" onChange={handleChange} required />
            <input type="text" name="dept" placeholder="Department" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
                 <option value="Male">Male</option>
               <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
           <input type="date" name="dob" onChange={handleChange} required />

            <input type="text" name="sslcSchoolName" placeholder="SSLC School Name" onChange={handleChange} required />
            <input type="text" name="sslcBoard" placeholder="SSLC Board" onChange={handleChange} required />
             <input type="number" name="sslcYear" placeholder="SSLC Year" onChange={handleChange} required />

             <input type="text" name="hscSchoolName" placeholder="HSC School Name" onChange={handleChange} required />                 <input type="text" name="hscBoard" placeholder="HSC Board" onChange={handleChange} required />
          <input type="number" name="hscYear" placeholder="HSC Year" onChange={handleChange} required />
            <input type="number" name="hsccutoff" placeholder="HSC Cutoff" onChange={handleChange} required />

            <input type="number" step="0.01" name="hsc_percentage" placeholder="HSC Percentage" onChange={handleChange} required />
           <input type="number" step="0.01" name="sslc_percentage" placeholder="SSLC Percentage" onChange={handleChange} required />
            
           <input type="number" step="0.01" name="sem1_cgpa" placeholder="1st Sem CGPA" onChange={handleChange} required />
           <input type="number" step="0.01" name="sem2_cgpa" placeholder="2nd Sem CGPA" onChange={handleChange} required />
           <input type="number" step="0.01" name="sem3_cgpa" placeholder="3rd Sem CGPA" onChange={handleChange} required />
           <input type="number" step="0.01" name="sem4_cgpa" placeholder="4th Sem CGPA" onChange={handleChange} required />
           <input type="number" step="0.01" name="sem5_cgpa" placeholder="5th Sem CGPA" onChange={handleChange} />
           <input type="number" step="0.01" name="sem6_cgpa" placeholder="6th Sem CGPA" onChange={handleChange} />
           <input type="number" step="0.01" name="sem7_cgpa" placeholder="7th Sem CGPA" onChange={handleChange} />
             <input type="number" step="0.01" name="sem8_cgpa" placeholder="8th Sem CGPA" onChange={handleChange} />
            <input type="number" step="0.01" name="cgpaOverall" placeholder="Overall CGPA" onChange={handleChange} />

            <label>History of Arrears:</label>
            <select name="history_of_arrear" onChange={handleChange}>
                <option value="No">No</option>
              <option value="Yes">Yes</option>
           </select>
             <label>Standing Arrears:</label>
           <select name="standing_arrear" onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
           </select>

           <textarea name="address" placeholder="Address" onChange={handleChange} required />

         <input type="text" name="student_mobile" placeholder="Student Mobile" onChange={handleChange} required />
          <input type="text" name="secondary_mobile" placeholder="Secondary Mobile" onChange={handleChange} />

          <input type="email" name="college_email" placeholder="College Email" onChange={handleChange} required />
            <input type="email" name="personal_email" placeholder="Personal Email" onChange={handleChange} required />

            <input type="text" name="aadhar_number" placeholder="Aadhar Number" onChange={handleChange} required />
<input type="text" name="pancard_number" placeholder="PAN Card Number" onChange={handleChange} required />

            <label>Passport Available:</label>
            <select name="passport" onChange={handleChange}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
             </select>

           <label>Placement Willing:</label>
         <select name="placementWilling" onChange={handleChange}>
             <option value="Yes">Yes</option>                    <option value="No">No</option>
            </select>

            <button type="submit">Save Profile</button>
            </form>
            )}

            {/* 🔹 Display the fetched Student Profile Data */}
            {studentData && (
                <div className="profile-details">
                    <h3>Saved Profile Details</h3>
                    <p><strong>Register Number:</strong> {studentData.regno}</p>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Batch:</strong> {studentData.batch}</p>
                    <p><strong>Degree:</strong> {studentData.degree}</p>
                    <p><strong>Department:</strong> {studentData.dept}</p>
                    <p><strong>Gender:</strong> {studentData.gender}</p>
                    <p><strong>DOB:</strong> {studentData.dob}</p>
                    <p><strong>College Email:</strong> {studentData.college_email}</p>
                    <p><strong>Personal Email:</strong> {studentData.personal_email}</p>
                    <p><strong>Student Mobile:</strong> {studentData.student_mobile}</p>
                    <p><strong>Secondary Mobile:</strong> {studentData.secondary_mobile || "N/A"}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default StudentProfile;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./navbar";
// import '../../styles/StudentProfile.css';

// const StudentProfile = () => {
//     const [showForm, setShowForm] = useState(false); // Controls form visibility
//     const [studentData, setStudentData] = useState(null); // Store fetched student data

//     const [formData, setFormData] = useState({
//         regno: "",
//         name: "",
//         batch: "",
//         degree:"",
//         dept:"",
//         gender:"",
//         dob:"",
//         hsc_percentage: "",
//         sslc_percentage: "",
//         sslcSchoolName:"",
//         sslcBoard:"",
//         sslcYear:"",
//         hscSchoolName: "",
//         hscBoard: "",
//         hscYear: "",
//         hsccutoff: "",
//         sem1_cgpa: "",
//         sem2_cgpa: "",
//         sem3_cgpa: "",
//         sem4_cgpa: "",
//         sem5_cgpa: "",
//         sem6_cgpa: "",
//         sem7_cgpa: "",
//         sem8_cgpa: "",
//         cgpaOverall: "",
//         history_of_arrear: "No",
//         standing_arrear: "No",
//         address: "",
//         student_mobile: "",
//         secondary_mobile: "",
//         college_email: "",
//         personal_email: "",
//         aadhar_number: "",
//         pancard_number: "",
//         passport: "No",
//         placementWilling: "Yes"
//     });

//     // 🔹 Fetch student profile data on component mount
//     useEffect(() => {
//         const fetchStudentData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/student-profile"); // Replace with correct API
//                 setStudentData(response.data); // Store fetched data
//             } catch (error) {
//                 console.error("Error fetching student data:", error);
//             }
//         };
//         fetchStudentData();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         const phoneRegex = /^[6-9]\d{9}$/;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const aadharRegex = /^\d{12}$/;
//         const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

//         if (!phoneRegex.test(formData.student_mobile)) {
//             alert("Invalid Student Mobile Number");
//             return false;
//         }
//         if (formData.secondary_mobile && !phoneRegex.test(formData.secondary_mobile)) {
//             alert("Invalid Secondary Mobile Number");
//             return false;
//         }
//         if (!emailRegex.test(formData.college_email) || !emailRegex.test(formData.personal_email)) {
//             alert("Invalid Email Format");
//             return false;
//         }
//         if (!aadharRegex.test(formData.aadhar_number)) {
//             alert("Invalid Aadhar Number (12 digits required)");
//             return false;
//         }
//         if (!panRegex.test(formData.pancard_number)) {
//             alert("Invalid PAN Card Number");
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await axios.post("http://localhost:5000/api/student-profile", formData);
//             alert(response.data.message);
//             setStudentData(formData); // Update the displayed data after saving
//             setShowForm(false); // Hide form after submission
//         } catch (error) {
//             alert(error.response?.data?.message || "Error submitting form");
//         }
//     };

//     return (
//         <>
//         <Navbar/>
//           <div className="profile-container">
//             <h2>Student Profile</h2>

//             {/* Create Profile Button */}
//             {!showForm && (
//                 <button onClick={() => setShowForm(true)} className="create-profile-btn">
//                     Create Profile
//                 </button>
//             )}

//             {/* Profile Form - Visible only when showForm is true */}
//             {showForm && (
//                 <form onSubmit={handleSubmit}>
//                     <input type="text" name="regno" placeholder="Register Number" onChange={handleChange} required />
//                 <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//                 <input type="text" name="batch" placeholder="Batch" onChange={handleChange} required />
//                 <input type="text" name="degree" placeholder="Degree" onChange={handleChange} required />
//                 <input type="text" name="dept" placeholder="Department" onChange={handleChange} required />
//                 <select name="gender" onChange={handleChange} required>
//                   <option value="">Select Gender</option>
//                      <option value="Male">Male</option>
//                    <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                 </select>
//                <input type="date" name="dob" onChange={handleChange} required />

//                 <input type="text" name="sslcSchoolName" placeholder="SSLC School Name" onChange={handleChange} required />
//                 <input type="text" name="sslcBoard" placeholder="SSLC Board" onChange={handleChange} required />
//                  <input type="number" name="sslcYear" placeholder="SSLC Year" onChange={handleChange} required />

//                  <input type="text" name="hscSchoolName" placeholder="HSC School Name" onChange={handleChange} required />                 <input type="text" name="hscBoard" placeholder="HSC Board" onChange={handleChange} required />
//               <input type="number" name="hscYear" placeholder="HSC Year" onChange={handleChange} required />
//                 <input type="number" name="hsccutoff" placeholder="HSC Cutoff" onChange={handleChange} required />

//                 <input type="number" step="0.01" name="hsc_percentage" placeholder="HSC Percentage" onChange={handleChange} required />
//                <input type="number" step="0.01" name="sslc_percentage" placeholder="SSLC Percentage" onChange={handleChange} required />
                
//                <input type="number" step="0.01" name="sem1_cgpa" placeholder="1st Sem CGPA" onChange={handleChange} required />
//                <input type="number" step="0.01" name="sem2_cgpa" placeholder="2nd Sem CGPA" onChange={handleChange} required />
//                <input type="number" step="0.01" name="sem3_cgpa" placeholder="3rd Sem CGPA" onChange={handleChange} required />
//                <input type="number" step="0.01" name="sem4_cgpa" placeholder="4th Sem CGPA" onChange={handleChange} required />
//                <input type="number" step="0.01" name="sem5_cgpa" placeholder="5th Sem CGPA" onChange={handleChange} />
//                <input type="number" step="0.01" name="sem6_cgpa" placeholder="6th Sem CGPA" onChange={handleChange} />
//                <input type="number" step="0.01" name="sem7_cgpa" placeholder="7th Sem CGPA" onChange={handleChange} />
//                  <input type="number" step="0.01" name="sem8_cgpa" placeholder="8th Sem CGPA" onChange={handleChange} />
//                 <input type="number" step="0.01" name="cgpaOverall" placeholder="Overall CGPA" onChange={handleChange} />

//                 <label>History of Arrears:</label>
//                 <select name="history_of_arrear" onChange={handleChange}>
//                     <option value="No">No</option>
//                   <option value="Yes">Yes</option>
//                </select>
//                  <label>Standing Arrears:</label>
//                <select name="standing_arrear" onChange={handleChange}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                </select>

//                <textarea name="address" placeholder="Address" onChange={handleChange} required />

//              <input type="text" name="student_mobile" placeholder="Student Mobile" onChange={handleChange} required />
//               <input type="text" name="secondary_mobile" placeholder="Secondary Mobile" onChange={handleChange} />

//               <input type="email" name="college_email" placeholder="College Email" onChange={handleChange} required />
//                 <input type="email" name="personal_email" placeholder="Personal Email" onChange={handleChange} required />

//                 <input type="text" name="aadhar_number" placeholder="Aadhar Number" onChange={handleChange} required />
// <input type="text" name="pancard_number" placeholder="PAN Card Number" onChange={handleChange} required />

//                 <label>Passport Available:</label>
//                 <select name="passport" onChange={handleChange}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                  </select>

//                <label>Placement Willing:</label>
//              <select name="placementWilling" onChange={handleChange}>
//                  <option value="Yes">Yes</option>                    <option value="No">No</option>
//                 </select>

//                 <button type="submit">Save Profile</button>
//                 </form>
//             )}

//             {/* 🔹 Display the fetched Student Profile Data */}
//             {studentData && (
//                 <div className="profile-details">
//                     <h3>Saved Profile Details</h3>
//                     <p><strong>Register Number:</strong> {studentData.regno}</p>
//                     <p><strong>Name:</strong> {studentData.name}</p>
//                     <p><strong>Batch:</strong> {studentData.batch}</p>
//                     <p><strong>Degree:</strong> {studentData.degree}</p>
//                     <p><strong>Department:</strong> {studentData.dept}</p>
//                     <p><strong>Gender:</strong> {studentData.gender}</p>
//                     <p><strong>DOB:</strong> {studentData.dob}</p>
//                     <p><strong>College Email:</strong> {studentData.college_email}</p>
//                     <p><strong>Personal Email:</strong> {studentData.personal_email}</p>
//                     <p><strong>Student Mobile:</strong> {studentData.student_mobile}</p>
//                     <p><strong>Secondary Mobile:</strong> {studentData.secondary_mobile || "N/A"}</p>
//                 </div>
//             )}
//         </div>
//         </>
//     );
// };

// export default StudentProfile;





// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "./navbar";
// import '../../styles/StudentProfile.css';

// const StudentProfile = () => {
//     const [showForm, setShowForm] = useState(false); // Controls form visibility
//     const [formData, setFormData] = useState({
//         regno: "",
//         name: "",
//         batch: "",
//         degree:"",
//         dept:"",
//         gender:"",
//         dob:"",
//         hsc_percentage: "",
//         sslc_percentage: "",
//         sslcSchoolName:"",
//         sslcBoard:"",
//         sslcYear:"",
//         hscSchoolName: "",
//         hscBoard: "",
//         hscYear: "",
//         hsccutoff: "",
//         sem1_cgpa: "",
//         sem2_cgpa: "",
//         sem3_cgpa: "",
//         sem4_cgpa: "",
//         sem5_cgpa: "",
//         sem6_cgpa: "",
//         sem7_cgpa: "",
//         sem8_cgpa: "",
//         cgpaOverall: "",
//         history_of_arrear: "No",
//         standing_arrear: "No",
//         address: "",
//         student_mobile: "",
//         secondary_mobile: "",
//         college_email: "",
//         personal_email: "",
//         aadhar_number: "",
//         pancard_number: "",
//         passport: "No",
//         placementWilling: "Yes"
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const validateForm = () => {
//         const phoneRegex = /^[6-9]\d{9}$/;
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         const aadharRegex = /^\d{12}$/;
//         const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

//         if (!phoneRegex.test(formData.student_mobile)) {
//             alert("Invalid Student Mobile Number");
//             return false;
//         }
//         if (formData.secondary_mobile && !phoneRegex.test(formData.secondary_mobile)) {
//             alert("Invalid Secondary Mobile Number");
//             return false;
//         }
//         if (!emailRegex.test(formData.college_email) || !emailRegex.test(formData.personal_email)) {
//             alert("Invalid Email Format");
//             return false;
//         }
//         if (!aadharRegex.test(formData.aadhar_number)) {
//             alert("Invalid Aadhar Number (12 digits required)");
//             return false;
//         }
//         if (!panRegex.test(formData.pancard_number)) {
//             alert("Invalid PAN Card Number");
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await axios.post("http://localhost:5000/api/student-profile", formData);
//             alert(response.data.message);
//         } catch (error) {
//             alert(error.response?.data?.message || "Error submitting form");
//         }
//     };

//     return (
//         <>
//         <Navbar/>
//           <div className="profile-container">
//             <h2>Student Profile</h2>
//             {/* Create Profile Button */}
//             {!showForm && (
//                     <button onClick={() => setShowForm(true)} className="create-profile-btn">
//                         Create Profile
//                     </button>
//                 )}

//             {/* Profile Form - Visible only when showForm is true */}
//             {showForm && (
//             <form onSubmit={handleSubmit}>
//             <input type="text" name="regno" placeholder="Register Number" onChange={handleChange} required />
//                 <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//                 <input type="text" name="batch" placeholder="Batch" onChange={handleChange} required />
//                 <input type="text" name="degree" placeholder="Degree" onChange={handleChange} required />
//                 <input type="text" name="dept" placeholder="Department" onChange={handleChange} required />
//                 <select name="gender" onChange={handleChange} required>
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Other">Other</option>
//                 </select>
//                 <input type="date" name="dob" onChange={handleChange} required />

//                 <input type="text" name="sslcSchoolName" placeholder="SSLC School Name" onChange={handleChange} required />
//                 <input type="text" name="sslcBoard" placeholder="SSLC Board" onChange={handleChange} required />
//                 <input type="number" name="sslcYear" placeholder="SSLC Year" onChange={handleChange} required />

//                 <input type="text" name="hscSchoolName" placeholder="HSC School Name" onChange={handleChange} required />
//                 <input type="text" name="hscBoard" placeholder="HSC Board" onChange={handleChange} required />
//                 <input type="number" name="hscYear" placeholder="HSC Year" onChange={handleChange} required />
//                 <input type="number" name="hsccutoff" placeholder="HSC Cutoff" onChange={handleChange} required />

//                 <input type="number" step="0.01" name="hsc_percentage" placeholder="HSC Percentage" onChange={handleChange} required />
//                 <input type="number" step="0.01" name="sslc_percentage" placeholder="SSLC Percentage" onChange={handleChange} required />
                
//                 <input type="number" step="0.01" name="sem1_cgpa" placeholder="1st Sem CGPA" onChange={handleChange} required />
//                 <input type="number" step="0.01" name="sem2_cgpa" placeholder="2nd Sem CGPA" onChange={handleChange} required />
//                 <input type="number" step="0.01" name="sem3_cgpa" placeholder="3rd Sem CGPA" onChange={handleChange} required />
//                 <input type="number" step="0.01" name="sem4_cgpa" placeholder="4th Sem CGPA" onChange={handleChange} required />
//                 <input type="number" step="0.01" name="sem5_cgpa" placeholder="5th Sem CGPA" onChange={handleChange} />
//                 <input type="number" step="0.01" name="sem6_cgpa" placeholder="6th Sem CGPA" onChange={handleChange} />
//                 <input type="number" step="0.01" name="sem7_cgpa" placeholder="7th Sem CGPA" onChange={handleChange} />
//                 <input type="number" step="0.01" name="sem8_cgpa" placeholder="8th Sem CGPA" onChange={handleChange} />
//                 <input type="number" step="0.01" name="cgpaOverall" placeholder="Overall CGPA" onChange={handleChange} />

//                 <label>History of Arrears:</label>
//                 <select name="history_of_arrear" onChange={handleChange}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                 </select>

//                 <label>Standing Arrears:</label>
//                 <select name="standing_arrear" onChange={handleChange}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                 </select>

//                 <textarea name="address" placeholder="Address" onChange={handleChange} required />

//                 <input type="text" name="student_mobile" placeholder="Student Mobile" onChange={handleChange} required />
//                 <input type="text" name="secondary_mobile" placeholder="Secondary Mobile" onChange={handleChange} />

//                 <input type="email" name="college_email" placeholder="College Email" onChange={handleChange} required />
//                 <input type="email" name="personal_email" placeholder="Personal Email" onChange={handleChange} required />

//                 <input type="text" name="aadhar_number" placeholder="Aadhar Number" onChange={handleChange} required />
//                 <input type="text" name="pancard_number" placeholder="PAN Card Number" onChange={handleChange} required />

//                 <label>Passport Available:</label>
//                 <select name="passport" onChange={handleChange}>
//                     <option value="No">No</option>
//                     <option value="Yes">Yes</option>
//                 </select>

//                 <label>Placement Willing:</label>
//                 <select name="placementWilling" onChange={handleChange}>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                 </select>

//                 <button type="submit">Save Profile</button>
//             </form>
//             )}
//         </div>
//         </>
//     );
// };

// export default StudentProfile;

