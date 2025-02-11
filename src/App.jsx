import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import HomePage from "./component/Home";
import AdminRecruiters from "./component/AdminRecruiters";
import PostDrive from "./component/Drive";
import UpdateShortlist from "./component/Shortlist";
import StudentRecruiters from "./component/StudentRecruiters";
import Zoho from "./component/company/Zoho";
import CompanyPage from "./component/company/companyPage";  // Ensure this is correctly imported

const App = () => {
    return (
        <Router>
            <div>
                <h1>Recruitment Management System</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/admin">Admin Recruiters</Link></li>
                        <li><Link to="/students">Student Recruiters</Link></li>
                        <li><Link to="/drive">Post Drive</Link></li>
                        <li><Link to="/shortlist">Update Shortlist</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<AdminRecruiters />} />
                    <Route path="/students" element={<StudentRecruiters />} />
                    <Route path="/drive" element={<PostDrive />} />
                    <Route path="/shortlist" element={<UpdateShortlist />} />
                    
                    {/* Direct Route for Zoho */}
                    <Route path="/company/zoho" element={<Zoho />} />

                    {/* Dynamic Route for any company */}
                    <Route path="/company/:companyName" element={<CompanyPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
