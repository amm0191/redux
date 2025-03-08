import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto" style={{
      background: "linear-gradient(45deg, #f64f59, #c471ed, #12c2e9)",
      boxShadow: "0 -15px 30px rgba(0,0,0,0.2)"
    }}>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="mb-0" style={{
              fontSize: "1rem",
              letterSpacing: "1px",
              color: "#f1f1f1"
            }}>
              &copy; 2023 <span style={{ fontWeight: "bold" }}>GameExplorer</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
