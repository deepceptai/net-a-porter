
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section pt-5">
      <div className="container">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold">
              Enjoy 10% off your next order on NET-A-PORTER
            </h5>
            <p className="text-muted small">
              Claim your exclusive NET-A-PORTER discount code when you subscribe
              to NET-A-PORTER and other LuxExperience B.V. brands content.{" "}
              <a href="#terms" className="footer-link">
                T&Cs
              </a>{" "}
              and exclusions apply.
            </p>
            <a href="#receive" className="footer-link d-block mb-2">
              What will I receive?
            </a>

            {/* Email Signup */}
            <div className="d-flex">
              <input
                type="email "
                className="form-control me-2"
                placeholder="your@address.com"
              />
              <button className="btn signUp btn-outline-dark">Sign Up</button>
            </div>

            {/* Social Icons */}
            <div className="mt-4">
              <a href="#yt" className="me-3 social-icon">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#fb" className="me-3 social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#tw" className="me-3 social-icon">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#ig" className="social-icon">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6">
            <h6 className="fw-bold">NEED HELP?</h6>
            <p className="small text-muted">
              For any enquiries please visit NET-A-PORTER{" "}
              <a href="#customer-care" className="footer-link">
                Customer Care
              </a>
              .
            </p>

            <h6 className="fw-bold mt-4">LOCATION & LANGUAGE</h6>
            <div className="d-flex align-items-center">
              <span className="flag-icon me-2">🇮🇹</span>
              <span>English</span>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* Customer Care & About Us */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">CUSTOMER CARE</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">Track an Order</a></li>
              <li><a href="#">Create a Return</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Exchanges & Returns</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">NET-A-PORTER Premier</a></li>
              <li><a href="#">Payment</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Center</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">ABOUT US</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#">About NET-A-PORTER</a></li>
              <li><a href="#">People & Planet</a></li>
              <li><a href="#">NET-A-PORTER Rewards</a></li>
              <li><a href="#">Advertising</a></li>
              <li><a href="#">Affiliates</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">NET-A-PORTER Apps</a></li>
              <li><a href="#">Modern Slavery Statement</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Press & Events</a></li>
            </ul>
          </div>

          {/* Payments */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">NET-A-PORTER ACCEPTS</h6>
            <div className="d-flex flex-wrap gap-2 mt-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg" alt="PayPal" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="AmEx" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/JCB_logo.svg" alt="JCB" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/UnionPay_logo.svg" alt="UnionPay" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Apple_Pay_logo.svg" alt="Apple Pay" className="payment-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Klarna_Logo.svg" alt="Klarna" className="payment-icon" />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* MR PORTER Section */}
        <div className="mb-4">
          <h6 className="fw-bold">MR PORTER</h6>
          <p className="small text-muted">
            Shop from over 500 of the world's finest luxury designer brands & be
            dressed for any occasion
          </p>
          <a href="#" className="footer-link">Visit MRPORTER.COM</a>
        </div>

        <hr />

        {/* Bottom Copyright */}
        <div className="text-center py-3 small text-muted">
          © 2025 NET-A-PORTER
        </div>
      </div>
    </footer>
  );
}
