import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import "../../ styles/StudentRecruiters.css";
import '../../styles/StudentRecruiter.css'
import Navbar from './navbar';

const StudentRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  // Fetch recruiters when the component mounts
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recruiters'); // Make sure this API exists
        console.log(response.data);
        setRecruiters(response.data.recruiters);
      } catch (error) {
        console.error('Error fetching recruiters:', error.response ? error.response.data : error.message);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div>
      <Navbar/>
      <h2>Top Recruiters</h2>
      <div className="recruiters-container">
        {Array.isArray(recruiters) && recruiters.length > 0 ? (
          recruiters.map((company, index) => 
            company && company.companyName && company.logo ? ( 
              <div key={index} className="recruiter-card">
                <Link to={`student/company/${company.companyName}`} state={{ company }}>
                  <img 
                    src={`http://localhost:5000/uploads/${company.logo}`} 
                    alt={company.companyName} 
                    className="recruiter-logo"
                  />
                </Link>
                <p className="company-name">{company.companyName}</p>
              </div>
            ) : null
          )
        ) : (
          <p>No recruiters available</p>
        )}
      </div>
    </div>
  );
};

export default StudentRecruiters;
