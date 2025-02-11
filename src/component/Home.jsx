import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Add CSS for styling

const companies = [
  { name: "tcs", img: "https://nec.edu.in/wp-content/uploads/2019/05/tcs-copy.webp" },
  { name: "cognizant", img: "https://nec.edu.in/wp-content/uploads/2019/05/cognizent.webp" },
  { name: "wipro", img: "https://nec.edu.in/wp-content/uploads/2019/05/wipro-copy.webp" },
  { name: "infosys", img: "https://nec.edu.in/wp-content/uploads/2019/05/infosys.webp" },
  { name: "accenture", img: "https://nec.edu.in/wp-content/uploads/2019/05/accenture-copy-1.webp" },
  { name: "ibm", img: "https://nec.edu.in/wp-content/uploads/2019/05/ibm-copy.webp" },
  { name: "infoview", img: "https://nec.edu.in/wp-content/uploads/2019/05/infoview-copy.webp" },
  { name: "solartis", img: "https://nec.edu.in/wp-content/uploads/2019/05/Solartis-copy.webp" },
  { name: "hcl", img: "https://nec.edu.in/wp-content/uploads/2019/05/hcl-copy.webp" },
  { name: "hexaware", img: "https://nec.edu.in/wp-content/uploads/2019/05/hexaware-copy.webp" },
  { name: "atosyntel", img: "https://nec.edu.in/wp-content/uploads/2019/05/AtosSyntel-copy.webp" },
  { name: "techm", img: "https://nec.edu.in/wp-content/uploads/2019/05/techmahendra-copy.webp" },
  { name: "tessolve", img: "https://nec.edu.in/wp-content/uploads/2019/05/tessolve-copy.webp" },
  { name: "astrazeneca", img: "https://nec.edu.in/wp-content/uploads/2019/05/astrazeneca-copy.webp" },
  { name: "mbit", img: "https://nec.edu.in/wp-content/uploads/2019/05/MBit-copy.webp" },
  { name: "brakesindia", img: "https://nec.edu.in/wp-content/uploads/2019/05/brakesindia-copy.webp" },
  { name: "cadence", img: "https://nec.edu.in/wp-content/uploads/2019/05/cadence-copy.webp" },
  { name: "h_adn", img: "https://nec.edu.in/wp-content/uploads/2019/05/h_adn_r-1-copy.webp" },
  { name: "econ", img: "https://nec.edu.in/wp-content/uploads/2019/05/Econ-copy.webp" }
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleCompanyClick = (companyName) => {
    navigate(`/company/${companyName}`);
  };

  return (
    <div id="list-box">
      {companies.map((company, index) => (
        <img
          key={index}
          src={company.img}
          alt={company.name}
          id="com"
          onClick={() => handleCompanyClick(company.name)}
          style={{ cursor: "pointer", margin: "10px", width: "100px", height: "100px" }}
        />
      ))}
    </div>
  );
};

export default HomePage;
