import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../../styles/adminrecruiters.css";
// import '../../../styles/companyDetails.css';
import Navbar from '../AdminNavbar';

const AdminRecruiters = () => {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    description: '',
    ceo: '',
    location: '',
    logo: null,
    skillSets: [],
    localBranches: [],
    roles: [],
    package: '',
    objective: ''
  });

  const navigate = useNavigate();
  const [companyLogos, setCompanyLogos] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  // Handle file input change for the logo
  const handleFileChange = (e) => {
    setCompanyData({ ...companyData, logo: e.target.files[0] });
  };

  // Handle adding items to arrays (Skill Sets, Local Branches, Roles)
  const handleArrayChange = (field, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const newValue = e.target.value.trim();

      if (newValue) {
        setCompanyData((prevState) => ({
          ...prevState,
          [field]: [...prevState[field].filter(Boolean), newValue], // Remove empty values and add new one
        }));
        console.log(`Updated ${field}:`, [...companyData[field], newValue]); // Debugging
        e.target.value = ""; // Clear input field after adding
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Ensure all fields are filled
    if (!companyData.companyName || !companyData.description || !companyData.ceo ||
      !companyData.location || !companyData.package || !companyData.objective ||
      !companyData.skillSets.length || !companyData.localBranches.length || !companyData.roles.length) {
      console.error("Error: All fields are required.");
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append('companyName', companyData.companyName);
    formData.append('description', companyData.description);
    formData.append('ceo', companyData.ceo);
    formData.append('location', companyData.location);
    formData.append('package', companyData.package);
    formData.append('objective', companyData.objective);

    if (companyData.logo) {
      formData.append('logo', companyData.logo);
    }

    formData.append('skillSets', JSON.stringify(companyData.skillSets));
    formData.append('localBranches', JSON.stringify(companyData.localBranches));
    formData.append('roles', JSON.stringify(companyData.roles));

    try {
      const response = await axios.post('http://localhost:5000/add-company', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Company added successfully:", response.data);

      setCompanyLogos((prevLogos) => [...prevLogos, response.data.company]);

      setCompanyData({
        companyName: '',
        description: '',
        ceo: '',
        location: '',
        package: '',
        objective: '',
        logo: null,
        skillSets: [],
        localBranches: [],
        roles: []
      });

    } catch (error) {
      console.error("Error adding company:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Error adding company.");
    }
  };


  // Toggle the form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };


  // Edit company: populate form with selected company data
  const handleEdit = (company) => {
    setCompanyData({
      companyName: company.companyName || '',
      description: company.description || '',
      ceo: company.ceo || '',
      location: company.location || '',
      package: company.package || '',
      objective: company.objective || '',
      logo: null, // New file needs to be uploaded
      skillSets: company.skillSets || [],
      localBranches: company.localBranches || [],
      roles: company.roles || [],
      _id: company._id // Include ID for update reference
    });
    setShowForm(true);
  };

  // Delete company
  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/delete-company/${companyId}`);
      setCompanyLogos(prev => prev.filter(company => company._id !== companyId));
      alert("Company deleted successfully.");
    } catch (error) {
      console.error("Error deleting company:", error.response?.data || error.message);
      alert("Error deleting company.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="admin-recruiters-container">
        <button className='addcom-btn' onClick={toggleForm} style={{ marginBottom: '20px' }}>
          {showForm ? 'Hide' : 'Add Recruiters'}
        </button>

        {showForm && (
          <div>
            <h2>Add Recruiters</h2>
            <form onSubmit={handleSubmit} className="addd-recuriter">
              <input type="text" name="companyName" placeholder="Company Name" value={companyData.companyName} onChange={handleChange} />
              <input type="text" name="description" placeholder="Description" value={companyData.description} onChange={handleChange} />
              <input type="text" name="ceo" placeholder="CEO" value={companyData.ceo} onChange={handleChange} />
              <input type="text" name="location" placeholder="Location" value={companyData.location} onChange={handleChange} />
              <input type="text" name="package" placeholder="Package" value={companyData.package} onChange={handleChange} />
              <input type="text" name="objective" placeholder="Objective" value={companyData.objective} onChange={handleChange} />
              <input type="file" name="logo" onChange={handleFileChange} />

              {/* Array Inputs */}
              <input type="text" placeholder="Skill Set (Press Enter to add)" onKeyDown={(e) => handleArrayChange('skillSets', e)} />
              <input type="text" placeholder="Local Branch (Press Enter to add)" onKeyDown={(e) => handleArrayChange('localBranches', e)} />
              <input type="text" placeholder="Role (Press Enter to add)" onKeyDown={(e) => handleArrayChange('roles', e)} />

              <button type="submit" id="addcom">Add Company</button>
            </form>
          </div>
        )}

        <h3 id="recuriter-heading">Recruiters</h3>
        <div className="company-logo-matrix">
          {Array.isArray(companyLogos) && companyLogos.length > 0 ? (
            companyLogos.map((company, index) =>
              company && company.companyName && company.logo ? ( // Ensure company object is valid
                <div key={index} className="company-logo">
                  <Link to={`/company/${company.companyName}`} state={{ company }}>
                    <img
                      src={`http://localhost:5000/uploads/${company.logo}`}
                      alt={company.companyName}
                      style={{ width: '100px', height: 'auto', margin: '10px', cursor: 'pointer' }}
                    />
                  </Link>
                  <div className="company-buttons">
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/admin/edit-company/${company.companyName}`, { state: { company } })}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                    
                  </div>
                </div>
              ) : null
            )
          ) : (
            <p>No company logos available</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminRecruiters;
