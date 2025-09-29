import './CTA.css';

function CTA() {
  return (
    <div className="cta-section">
      <div className="container py-5">
        <div className="row">
          {/* Left Section */}
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h2 className="cta-title mb-3">
              Enjoy 10% off your next order on NET-A-PORTER
            </h2>
            <p className="cta-description mb-3">
              Claim your exclusive NET-A-PORTER discount code when you subscribe to
              NET-A-PORTER and other LuxExperience B.V. brands content.{' '}
              <a href="#" className="cta-link">T&Cs</a> and{' '}
              <a href="#" className="cta-link">exclusions</a> apply.
            </p>
            <button className="cta-info-btn mb-4">
              What will I receive?
            </button>
            
            {/* Email Form */}
            <div className="d-flex gap-2 mb-4">
              <input
                type="email"
                className="form-control cta-input"
                placeholder="your@address.com"
              />
              <button className="btn btn-dark cta-signup-btn">
                Sign Up
              </button>
            </div>
            
            {/* Social Media Icons */}
            <div className="d-flex gap-3 cta-social">
              <a href="#" className="cta-social-link">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="cta-social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="cta-social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="cta-social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="col-lg-8">
            <div className="cta-help-section">
              <h3 className="cta-help-title mb-3">NEED HELP?</h3>
              <p className="cta-help-text mb-4">
                For any enquiries please visit NET-A-PORTER{' '}
                <a href="#" className="cta-link">Customer Care</a>.
              </p>
              
              <h3 className="cta-location-title mb-3">LOCATION & LANGUAGE</h3>
              <div className="cta-flag">
                <span>🇮🇳</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;