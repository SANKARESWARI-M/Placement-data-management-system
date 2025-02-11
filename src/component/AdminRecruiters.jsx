import React, { useState } from 'react';
import axios from 'axios';

const AdminRecruiters = () => {
  const [year, setYear] = useState('');
  const [company, setCompany] = useState('');
  const [noOfStudentsPlaced, setNoOfStudentsPlaced] = useState('');
  const [feedbackPdf, setFeedbackPdf] = useState(null);
  const [questionBankPdf, setQuestionBankPdf] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);  // For logo image
  const [description, setDescription] = useState('');  // Company description
  const [ceoName, setCeoName] = useState('');  // CEO Name
  const [headquarters, setHeadquarters] = useState('');  // Headquarters location
  const [highestSalary, setHighestSalary] = useState('');  // Highest salary
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === 'feedbackPdf') {
      setFeedbackPdf(file);
    } else if (e.target.name === 'questionBankPdf') {
      setQuestionBankPdf(file);
    } else if (e.target.name === 'companyLogo') {
      setCompanyLogo(file);  // Handle company logo image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!year || !company || !noOfStudentsPlaced || !ceoName || !headquarters || !highestSalary) {
      setErrorMessage('All fields are required!');
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('year', year);
    formData.append('company', company);
    formData.append('noOfStudentsPlaced', noOfStudentsPlaced);
    formData.append('description', description);
    formData.append('ceoName', ceoName);
    formData.append('headquarters', headquarters);
    formData.append('highestSalary', highestSalary);
    if (feedbackPdf) formData.append('feedbackPdf', feedbackPdf);
    if (questionBankPdf) formData.append('questionBankPdf', questionBankPdf);
    if (companyLogo) formData.append('companyLogo', companyLogo);  // Add company logo file

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000/recruiters', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      alert('Data uploaded successfully!');

      // Reset form
      setYear('');
      setCompany('');
      setNoOfStudentsPlaced('');
      setDescription('');
      setCeoName('');
      setHeadquarters('');
      setHighestSalary('');
      setFeedbackPdf(null);
      setQuestionBankPdf(null);
      setCompanyLogo(null);  // Reset company logo
      setLoading(false);
    } catch (error) {
      console.error('Error uploading data:', error);
      setErrorMessage('Error uploading data: ' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin - Recruiter Data</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Year:</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>No of Students Placed:</label>
          <input
            type="number"
            value={noOfStudentsPlaced}
            onChange={(e) => setNoOfStudentsPlaced(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Logo:</label>
          <input
            type="file"
            name="companyLogo"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>CEO Name:</label>
          <input
            type="text"
            value={ceoName}
            onChange={(e) => setCeoName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Headquarters:</label>
          <input
            type="text"
            value={headquarters}
            onChange={(e) => setHeadquarters(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Highest Salary:</label>
          <input
            type="number"
            value={highestSalary}
            onChange={(e) => setHighestSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Feedback PDF:</label>
          <input
            type="file"
            name="feedbackPdf"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Question Bank PDF:</label>
          <input
            type="file"
            name="questionBankPdf"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AdminRecruiters;
