import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./navbar";
import "../../styles/studenthackathon.css"; // Include the new CSS file

const StudentHackathon = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/hackathons');
        setHackathons(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch hackathons');
      }
    };
    fetchHackathons();
  }, []);

  return (
    <>
      <Navbar />
      <div className="hackathon-container">
        <div className="hackathon-box">
          <h2 className="hackathon-title">Hackathons</h2>
          {hackathons.length === 0 ? (
            <p className="text-gray-500 text-center">No hackathons available.</p>
          ) : (
            <ul className="hackathon-list">
              {hackathons.map((hack) => (
                <li key={hack.id} className="hackathon-item">
                  <p className="hackathon-content">{hack.content}</p>
                  <span className="hackathon-timestamp">
                    Posted on: {new Date(hack.created_at).toLocaleString()}
                  </span>
                  
                  {/* Register Button */}
                  {hack.link && (
                    <a
                      href={hack.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hackathon-button"
                    >
                      Register Now
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentHackathon;
