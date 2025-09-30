import './Footer.css';
import Qrcode from '/Images/qr-code.svg'
import Paypal from '/Images/paypal.svg';
import Visa from '/Images/Visa.svg';
import MasterCard from '/Images/mastercard.svg';
import MasterCard2 from '/Images/mastercard2.svg';
import Amex from '/Images/Amex.svg';
import Jcb from '/Images/jcb.svg';
import UnionPay from '/Images/UnionPay.svg';
import Delta from '/Images/delta.svg';
import Applepay from '/Images/applePay.svg';
import Kalma from '/Images/klarna.svg';
function Footer() {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row">
          {/* Customer Care Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h3 className="footer-heading">CUSTOMER CARE</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Track an Order</a></li>
              <li><a href="#" className="footer-link">Create a Return</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Exchanges & Returns</a></li>
              <li><a href="#" className="footer-link">Delivery</a></li>
              <li><a href="#" className="footer-link">Payment</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Cookie Policy</a></li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h3 className="footer-heading">ABOUT US</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About NET-A-PORTER</a></li>
              <li><a href="#" className="footer-link">People & Planet</a></li>
              <li><a href="#" className="footer-link">NET-A-PORTER Rewards</a></li>
              <li><a href="#" className="footer-link">Advertising</a></li>
              <li><a href="#" className="footer-link">Affiliates</a></li>
              <li><a href="#" className="footer-link">Careers</a></li>
              <li><a href="#" className="footer-link">NET-A-PORTER Apps</a></li>
              <li><a href="#" className="footer-link">Modern Slavery Statement</a></li>
              <li><a href="#" className="footer-link">Investor Relations</a></li>
              <li><a href="#" className="footer-link">Press & Events</a></li>
            </ul>
          </div>

          {/* Get The App Section */}
          <div className="col-lg-6 mb-4">
            <h3 className="footer-heading">GET THE NET-A-PORTER APP</h3>
            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="footer-qr">
                <img src={Qrcode} alt="Qr code" className='img-fluid h-100'/>
              </div>
              <p className="footer-app-text">
                Scan the QR code with your iOS or Android smartphone to download the app
              </p>
            </div>

            <h3 className="footer-heading mt-5">NET-A-PORTER ACCEPTS</h3>
            <div className="d-flex flex-wrap gap-2 footer-payment-icons">
              <div className="payment-icon">
                <img src={Paypal} alt="PayPal" />
              </div>
              <div className="payment-icon">
                <img src={Visa} alt="Visa" />
              </div>
              <div className="payment-icon">
                <img src={MasterCard} alt="Mastercard" />
              </div>
              <div className="payment-icon">
                <img src={MasterCard2} alt="Maestro" />
              </div>
              <div className="payment-icon">
                <img src={Amex} alt="American Express" />
              </div>
              <div className="payment-icon payment-icon-text">
                <img src={Jcb} alt="JCB" />
              </div>
              <div className="payment-icon payment-icon-text">
                <img src={UnionPay} alt="Union Pay" />
              </div>
              <div className="payment-icon payment-icon-text">
                <img src={Delta} alt="Delta" />
              </div>
              <div className="payment-icon">
                <img src={Applepay} alt="Apple Pay" />
              </div>
              <div className="payment-icon payment-icon-text">
                <img src={Kalma} alt="Kalma" />
              </div>
            </div>
          </div>
        </div>

        {/* MR PORTER Section */}
        <div className="footer-mr-porter mt-5 pt-4">
          <h2 className="footer-mr-porter-title">MR PORTER</h2>
          <p className="footer-mr-porter-text mb-2">
            Shop from over 500 of the world's finest luxury designer brands & be dressed for any occasion
          </p>
          <a href="#" className="footer-mr-porter-link">Visit MRPORTER.COM</a>
        </div>

        {/* Copyright */}
        <div className="footer-copyright mt-5 pt-4 text-center">
          <p className="mb-0">© 2025 NET-A-PORTER</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;