import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recruiters">Recruiters</Link></li>
        <li><Link to="/drive">Drive</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
