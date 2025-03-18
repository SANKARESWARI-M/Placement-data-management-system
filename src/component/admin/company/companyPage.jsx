import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch all companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch company details when logo is clicked
  const handleLogoClick = async (companyId) => {
    try {
      const response = await axios.get(`http://localhost:5000/company/${companyId}`);
      setSelectedCompany(response.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  return (
    <div>
      <h2>Company Page</h2>

      {/* Display the logos of all companies */}
      <div className="company-logos">
        {companies.map((company) => (
          <div key={company.id} onClick={() => handleLogoClick(company.id)} className="company-logo">
            <img
              src={company.logo}  // Assuming logo field contains the logo URL
              alt={company.companyName}
              style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>

      {/* Display the selected company's details */}
      {selectedCompany && (
        <div className="company-details">
          <h3>{selectedCompany.companyName}</h3>
          <p>{selectedCompany.description}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
