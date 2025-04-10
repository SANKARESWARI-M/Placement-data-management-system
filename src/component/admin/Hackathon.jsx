import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/adminhackathon.css";
import Navbar from "./AdminNavbar";

const AdminHackathon = () => {
  const [hackathonText, setHackathonText] = useState('');
  const [hackathonLink, setHackathonLink] = useState('');
  const [hackathons, setHackathons] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch hackathons from the server
  const fetchHackathons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hackathons');
      setHackathons(response.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching hackathons');
    }
  };

  // Load hackathons when the component mounts
  useEffect(() => {
    fetchHackathons();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hackathonText.trim()) {
      alert('Please enter hackathon details.');
      return;
    }
    if (!hackathonLink.trim()) {
      alert('Please enter a registration link.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/hackathons', {
        content: hackathonText,
        link: hackathonLink,
      });
      alert('Hackathon posted successfully!');
      setHackathonText('');
      setHackathonLink('');
      setHackathons([...hackathons, response.data]); // Update UI instantly
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Error posting hackathon');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hackathon?")) return;

    try {
      console.log(`Deleting hackathon with ID: ${id}`); // Debugging log
      await axios.delete(`http://localhost:5000/api/hackathons/${id}`);

      // Ensure UI is updated
      setHackathons(prevHackathons => prevHackathons.filter(hackathon => hackathon.id !== id));

      alert("Hackathon deleted successfully!");
    } catch (err) {
      console.error("Error deleting hackathon:", err.response ? err.response.data : err);
      alert("Error deleting hackathon");
    }
};


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <button
          onClick={() => setShowForm(!showForm)}
          id="hack-btn"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
        >
          {showForm ? "Hide Form" : "Post a Hackathon"}
        </button>

        {showForm && (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-4">
            <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
              Post a Hackathon
            </h2>
            <form onSubmit={handleSubmit} className="form">
              <textarea
                placeholder="Paste Hackathon details here..."
                value={hackathonText}
                onChange={(e) => setHackathonText(e.target.value)}
                rows="4"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="url"
                placeholder="Enter registration link..."
                value={hackathonLink}
                onChange={(e) => setHackathonLink(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-3 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold mt-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                id="hack-btn"
              >
                Post Hackathon
              </button>
            </form>
          </div>
        )}

        {/* Display posted hackathons */}
        <div className="hackathon-list-container">
          <h2 className="hackathon-title">Posted Hackathons</h2>
          {hackathons.length === 0 ? (
            <p className="no-hackathons">No hackathons posted yet.</p>
          ) : (
            <ul className="hackathon-list">
              {hackathons.map((hackathon) => (
                <li key={hackathon.id} className="hackathon-item">
                  <p className="hackathon-content">{hackathon.content}</p>
                  <a
                    href={hackathon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hackathon-link"
                  >
                    {hackathon.link}
                  </a>
                  <span className="hackathon-timestamp">
                    Posted on: {new Date(hackathon.created_at).toLocaleString()}
                  </span>
                  {/* Delete Button */}
                  <button
                    id="del-button"
                    onClick={() => handleDelete(hackathon.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminHackathon;
