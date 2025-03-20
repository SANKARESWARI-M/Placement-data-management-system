import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "../../../styles/adminrecruiters.css";
import "../../styles/companyDetails.css";
import StudentNavbar from './navbar'; // ✅ Use Student Navbar

const StudentRecruiters = () => {
  const [companyLogos, setCompanyLogos] = useState([]);

  // Fetch company logos when the component mounts
  useEffect(() => {
    const fetchCompanyLogos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/companies');
        console.log(response.data);
        setCompanyLogos(response.data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error.response ? error.response.data : error.message);
      }
    };

    fetchCompanyLogos();
  }, []);

  return (
    <div>
      <StudentNavbar /> {/* ✅ Student Navbar */}

      <h3>Recruiters</h3>
      <div className="company-logo-matrix">
        {Array.isArray(companyLogos) && companyLogos.length > 0 ? (
          companyLogos.map((company, index) =>
            company && company.companyName && company.logo ? (
              <div key={index} className="company-logo">
                <Link to={`/company/${company.companyName}`} state={{ company }}>
                  <img
                    src={`http://localhost:5000/uploads/${company.logo}`}
                    alt={company.companyName}
                    style={{ width: "100px", height: "auto", margin: "10px", cursor: "pointer" }}
                  />
                </Link>
              </div>
            ) : null
          )
        ) : (
          <p>No company logos available</p>
        )}
      </div>
    </div>
  );
};

export default StudentRecruiters;
