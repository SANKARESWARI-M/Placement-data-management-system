import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./AdminNavbar";
import '../../styles/UpcomingDrives.css';

const UpcomingDrives = () => {
    const [drives, setDrives] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        company_name: '',
        eligibility: '',
        date: '',
        time: '',
        venue: '',
        role: '',
        package: '',
    });
    const [postFile, setPostFile] = useState(null);

    useEffect(() => {
        fetchDrives();
    }, []);

    const fetchDrives = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/upcoming-drives');
            setDrives(response.data);
        } catch (error) {
            console.error('Error fetching drives:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPostFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        formPayload.append('post', postFile);
        Object.keys(formData).forEach((key) => formPayload.append(key, formData[key]));

        try {
            await axios.post('http://localhost:5000/api/upcoming-drives', formPayload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Drive added successfully!');
            setShowForm(false);
            fetchDrives(); 
        } catch (error) {
            alert('Error adding drive');
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="upcoming-drives-container">
                <h1 className="title">Upcoming Drives</h1>

                {/* Toggle Button */}
                <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Drive'}
                </button>

                {/* Add Drive Form */}
                {showForm && (
                    <div className="form-card">
                        <h3>Add New Drive</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Upload File (Image or PDF):</label>
                            <input type="file" name="post" onChange={handleFileChange} required />

                            <label>Company Name:</label>
                            <input type="text" name="company_name" onChange={handleChange} required />

                            <label>Eligibility:</label>
                            <input type="text" name="eligibility" onChange={handleChange} required />

                            <label>Date:</label>
                            <input type="date" name="date" onChange={handleChange} required />

                            <label>Time:</label>
                            <input type="time" name="time" onChange={handleChange} required />

                            <label>Venue:</label>
                            <input type="text" name="venue" onChange={handleChange} required />

                            <label>Role:</label>
                            <input type="text" name="role" onChange={handleChange} required />

                            <label>Package (LPA):</label>
                            <input type="text" name="package" onChange={handleChange} required />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

                {/* Display Upcoming Drives */}
                <div className="admin-drives-list">
                    {drives.map((drive, index) => (
                        <div key={index} className="admin-drive-card">
                            {drive.post && (
                                <img src={`http://localhost:5000/uploads/${drive.post}`} alt="Drive Post" className="admin-drive-img" />
                            )}
                            <p><strong>Company:</strong> {drive.company_name}</p>
                            <p><strong>Eligibility:</strong> {drive.eligibility}</p>
                            <p><strong>Date:</strong> {new Date(drive.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {drive.time}</p>
                            <p><strong>Venue:</strong> {drive.venue}</p>
                            <p><strong>Role:</strong> {drive.roles}</p>
                            <p><strong>Package:</strong> {drive.package}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UpcomingDrives;