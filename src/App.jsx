import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
import HomePage from "./component/admin/AdminHome";
import AdminRecruiters from "./component/admin/company/AdminRecruiters";
import Drive from "./component/Drive";
import CompanyDetails from "./component/admin/company/CompanyDetails";
import Login from "./component/Login";
import Navbar from "./component/student/navbar";
import Home from "./component/student/home";
import AdminUpcomingDrives from "./component/admin/AdminUpcommingDrives";
import AdminNavbar from "./component/admin/AdminNavbar"
import Recruiters from "./component/student/Recruiter";
import StudentProfile from "./component/student/profile";
import UpcomingDrives from "./component/student/UpcomingDrive";
import RegisteredStudents from "./component/admin/AdminRegisteredStudents";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recruiters" element={<Recruiters />} />
          <Route path="recruiters/student/company/:companyName" element={<CompanyDetails />} />
          <Route path='/upcoming-drive' element={<UpcomingDrives/>}/>

          {/* Student Routes */}
          <Route path="/student" element={<Navbar />} /> {/* Consider wrapping in StudentDashboard */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminNavbar />} />
          <Route path="/admin-home" element={<HomePage />} />
          <Route path="/admin-recruiters" element={<AdminRecruiters />} />
          <Route path="/admin-drive" element={<Drive />} />
          <Route path="/admin-upcoming-drive" element={<AdminUpcomingDrives />} />
          <Route path="/company/:companyName" element={<CompanyDetails />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/admin-registered-students" element={<RegisteredStudents/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;




// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
// import HomePage from "./component/admin/AdminHome";
// import AdminRecruiters from "./component/admin/company/AdminRecruiters";
// import Drive from "./component/Drive";
// import CompanyDetails from "./component/admin/company/CompanyDetails";
// import Login from "./component/Login";
// import Navbar from "./component/student/navbar";
// import Home from "./component/student/home";
// import UpcomingDrives from "./component/admin/UpcommingDrives";
// import AdminNavbar from "./component/admin/AdminNavbar"
// import Recruiters from "./component/student/Recruiter";

// const App = () => {
//     // return (
//     //     <Router>
//     //         <div>
//     //             <Routes>
//     //             <Route path="/" element={<Login />}></Route>
//     //             <Route path="/student" element={<Navbar />}></Route>
//     //             <Route path="/home" element={<Home />}></Route>
//     //             <Route path="/recruiter" element={<Recruiters/>}></Route>
               
//     //            <Route path="/admin" element={<AdminNavbar />}/>
//     //       <Route path="/admin-home" element={<HomePage />} />
//     //       <Route path="/admin-recruiters" element={<AdminRecruiters />} />
//     //       <Route path="/admin-drive" element={<Drive />} /> 
//     //       <Route path="/company/:companyName" element={<CompanyDetails />} />
//     //       <Route path="/admin-upcoming-drive" element={<UpcomingDrives />}/>
          
//     //     </Routes>
               
      
//     //         </div>
//     //     </Router>
//     // );
// };

// export default App;
