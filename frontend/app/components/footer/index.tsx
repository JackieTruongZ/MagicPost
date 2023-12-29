import React from 'react';
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>Liên Hệ</h4>
          <p>Email: contact@example.com</p>
          <p>Điện thoại: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Chăm sóc khách hàng</h4>
          <p>FAQs</p>
          <p>Điều khoản và điều kiện</p>
          <p>Chính sách bảo mật</p>
        </div>
        <div className="footer-section">
          <h4>Theo dõi chúng tôi</h4>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2023 MagicPost. ..................</p>
      </div>
    </footer>
  );
};

export default Footer;
