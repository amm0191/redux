import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3" style={{ borderBottom: "2px solid #444" }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "2px" }}>
        VideoJuegos Moya
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={navLinkStyle}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/games" className="nav-link" style={navLinkStyle}>
                Juegos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/publishers" className="nav-link" style={navLinkStyle}>
                Creadores
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tags" className="nav-link" style={navLinkStyle}>
                Etiquetas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  fontSize: "1.1rem",
  fontWeight: "500",
  letterSpacing: "1px",
  transition: "color 0.3s ease",
};

export default Header;
