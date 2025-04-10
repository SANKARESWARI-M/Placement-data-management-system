import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./component/admin/AdminHome";
import AdminRecruiters from "./component/admin/company/AdminRecruiters";
import Drive from "./component/Drive";
import CompanyDetails from "./component/admin/company/CompanyDetails";
import Login from "./component/Login";
import StudentNavbar from "./component/student/navbar";
import StudentHome from "./component/student/home";
import AdminUpcomingDrives from "./component/admin/AdminUpcommingDrives";
import AdminNavbar from "./component/admin/AdminNavbar";

import StudentProfile from "./component/student/profile";
import UpcomingDrives from "./component/student/UpcomingDrive";
import RegisteredStudents from "./component/admin/AdminRegisteredStudents";
import Status from "./component/student/Status";

import StudentRecruiter from "./component/student/StudentRecruiter";
import PublicHome from "./component/publichome";
import StaffHome from "./component/staff/staffHome";
import StaffNavbar from "./component/staff/staffnavbar";
import StaffRecruiter from "./component/staff/staffRecruiters"
import StaffUpcommingDrive from "./component/staff/staffUpcommingDrive";
import Tutorward from "./component/staff/tutorward";
import AdminHackathon from "./component/admin/Hackathon";
import StudentHackathon from "./component/student/Hackathon";
import EditCompany from "./component/admin/company/EditCompanyDetails";
import StaffHackathon from "./component/staff/staffhackathon";

// Function to Get User Role (Stored in localStorage)
const getUserRole = () => {
  return localStorage.getItem("userRole"); // Values: "admin" or "student"
};

// Layouts to Apply Navbar Based on Role
const Layout = ({ children }) => {
  const role = getUserRole();
  return (
    <>
      {role === "admin" && <AdminNavbar />}
      {role === "student" && <StudentNavbar />}
      {role==="staff" && <StaffNavbar/>}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/staff-home" element={<StaffHome/>}/>
        <Route path="/staff-recruiters" element={<StaffRecruiter/>}/>
        <Route path="/staff-upcomingdrive" element={<StaffUpcommingDrive/>}/>
        <Route path="/staff-tutorward" element={<Tutorward/>}/>
        <Route path="/staff-hackathon" element={<StaffHackathon/>}/>
        
        {/* Student Routes - Wrapped with Student Navbar */}
        <Route path="/home" element={<Layout><StudentHome /></Layout>} />
        <Route path="/recruiters" element={<Layout><StudentRecruiter /></Layout>} />
        {/* <Route path="/recruiters/student/company/:companyName" element={<Layout><StudentCompanyDetails /></Layout>} /> */}
        <Route path='/upcoming-drive' element={<Layout><UpcomingDrives /></Layout>} />
        <Route path='/status' element={<Layout><Status /></Layout>} />
        <Route path="/studentprofile" element={<Layout><StudentProfile /></Layout>} />
        <Route path="/hackathon" element={<StudentHackathon/>}/>

        {/* Admin Routes - Wrapped with Admin Navbar */}
        <Route path="/admin-home" element={<Layout><HomePage /></Layout>} />
        <Route path="/admin-recruiters" element={<Layout><AdminRecruiters /></Layout>} />
        <Route path="/admin-drive" element={<Layout><Drive /></Layout>} />
        <Route path="/admin-upcoming-drive" element={<Layout><AdminUpcomingDrives /></Layout>} />
        <Route path="/company/:companyName" element={<Layout><CompanyDetails /></Layout>} />
        <Route path="/admin-registered-students" element={<Layout><RegisteredStudents /></Layout>} />
        <Route path="/admin-hackathon" element={<AdminHackathon/>}/>
        <Route path="/admin/edit-company/:companyName" element={<EditCompany />} />



        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
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
// import AdminUpcomingDrives from "./component/admin/AdminUpcommingDrives";
// import AdminNavbar from "./component/admin/AdminNavbar"
// import Recruiters from "./component/student/Recruiter";
// import StudentProfile from "./component/student/profile";
// import UpcomingDrives from "./component/student/UpcomingDrive";
// import RegisteredStudents from "./component/admin/AdminRegisteredStudents";
// import Status from "./component/student/Status";
// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/recruiters" element={<Recruiters />} />
//           <Route path="recruiters/student/company/:companyName" element={<CompanyDetails />} />
//           <Route path='/upcoming-drive' element={<UpcomingDrives/>}/>
//           <Route path='/status' element={<Status/>}/>

//           {/* Student Routes */}
//           <Route path="/student" element={<Navbar />} /> {/* Consider wrapping in StudentDashboard */}

//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminNavbar />} />
//           <Route path="/admin-home" element={<HomePage />} />
//           <Route path="/admin-recruiters" element={<AdminRecruiters />} />
//           <Route path="/admin-drive" element={<Drive />} />
//           <Route path="/admin-upcoming-drive" element={<AdminUpcomingDrives />} />
//           <Route path="/company/:companyName" element={<CompanyDetails />} />
//           <Route path="/studentprofile" element={<StudentProfile />} />
//           <Route path="/admin-registered-students" element={<RegisteredStudents/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;




// // import React from "react";
// // import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; 
// // import HomePage from "./component/admin/AdminHome";
// // import AdminRecruiters from "./component/admin/company/AdminRecruiters";
// // import Drive from "./component/Drive";
// // import CompanyDetails from "./component/admin/company/CompanyDetails";
// // import Login from "./component/Login";
// // import Navbar from "./component/student/navbar";
// // import Home from "./component/student/home";
// // import UpcomingDrives from "./component/admin/UpcommingDrives";
// // import AdminNavbar from "./component/admin/AdminNavbar"
// // import Recruiters from "./component/student/Recruiter";

// // const App = () => {
// //     // return (
// //     //     <Router>
// //     //         <div>
// //     //             <Routes>
// //     //             <Route path="/" element={<Login />}></Route>
// //     //             <Route path="/student" element={<Navbar />}></Route>
// //     //             <Route path="/home" element={<Home />}></Route>
// //     //             <Route path="/recruiter" element={<Recruiters/>}></Route>
               
// //     //            <Route path="/admin" element={<AdminNavbar />}/>
// //     //       <Route path="/admin-home" element={<HomePage />} />
// //     //       <Route path="/admin-recruiters" element={<AdminRecruiters />} />
// //     //       <Route path="/admin-drive" element={<Drive />} /> 
// //     //       <Route path="/company/:companyName" element={<CompanyDetails />} />
// //     //       <Route path="/admin-upcoming-drive" element={<UpcomingDrives />}/>
          
// //     //     </Routes>
               
      
// //     //         </div>
// //     //     </Router>
// //     // );
// // };

// // export default App;
