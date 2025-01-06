import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-column">
          <p className="footer-name">ISC. Roberto Carlos Guzmán Cortés</p>
          <a
            href="https://www.linkedin.com/in/rcguzmanc/"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <p className="footer-name">Tecnológico Nacional de México</p>
        </div>
        <div className="footer-column">
          <p className="footer-email">roberto140298@gmail.com</p>
          <a
            href="https://github.com/rcgc"
            className="footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <p className="footer-name">Instituto Tecnológico Superior de Misantla</p>
        </div>
      </footer>
      {/* Stripe section at the bottom of the footer */}
      <div className="footer-stripe">
        <p className="footer-stripe-text">© 2025 Books</p>
      </div>
    </>
  );
};

export default Footer;
