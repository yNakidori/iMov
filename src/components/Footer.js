import React from "react";
import "./Footer.css"; // Certifique-se de importar o arquivo CSS

const Footer = () => {
  return (
    <footer className="footer-gradient text-black p-2 text-center fixed bottom-0 left-0 w-full" style={{ fontFamily: 'PlaywriteUSTrad' }}>
      <p>&copy; Made with {"❤️"} by Naki </p>
    </footer>
  );
};

export default Footer;
