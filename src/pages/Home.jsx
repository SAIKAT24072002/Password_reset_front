import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (!storedToken || !storedUser) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  // Get user initials for avatar
  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    : 'US';

  return (
    <div className="container py-4 animate-fade-in">
      {/* Top Welcome Hero Banner */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="glass-card p-4 p-md-5 position-relative overflow-hidden">
            <div className="row align-items-center">
              <div className="col-12 col-md-8 text-center text-md-start">
                <div className="d-inline-flex align-items-center px-3 py-1 rounded-pill bg-success bg-opacity-25 text-success border border-success border-opacity-50 mb-3 small fw-semibold">
                  <i className="bi bi-circle-fill me-2 fs-6 animate-pulse"></i> Live Session Active
                </div>
                <h1 className="display-5 font-weight-bold text-white mb-2">
                  Welcome Back, <span className="text-primary">{user.name}</span>!
                </h1>
                <p className="text-muted fs-5 mb-4">
                  You are successfully logged into your SecurePass account dashboard.
                </p>

                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                  <Link to="/forgot-password" className="btn btn-gradient px-4 py-2">
                    <i className="bi bi-key-fill me-2"></i> Reset Password
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline-danger px-4 py-2">
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-4 text-center mt-4 mt-md-0">
                <div className="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-25 border border-primary text-primary fw-bold display-4"
                     style={{ width: '110px', height: '110px', boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)' }}>
                  {initials}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="row justify-content-center g-4 mb-4">
        <div className="col-12 col-md-5 col-lg-5">
          <div className="glass-card h-100 p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="icon-badge me-3 mb-0" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>
                <i className="bi bi-person-circle"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold">User Profile</h5>
                <small className="text-muted">Account Details</small>
              </div>
            </div>
            <ul className="list-group list-group-flush bg-transparent">
              <li className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between">
                <span className="text-muted">Full Name:</span>
                <strong className="text-end">{user.name}</strong>
              </li>
              <li className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between">
                <span className="text-muted">Email Address:</span>
                <strong className="text-end text-break ms-2">{user.email}</strong>
              </li>
              <li className="list-group-item bg-transparent text-white border-0 px-0 d-flex justify-content-between">
                <span className="text-muted">Account Status:</span>
                <span className="badge bg-success bg-opacity-25 text-success">Verified</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-5 col-lg-5">
          <div className="glass-card h-100 p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="icon-badge me-3 mb-0" style={{ width: '48px', height: '48px', fontSize: '1.4rem' }}>
                <i className="bi bi-shield-check"></i>
              </div>
              <div>
                <h5 className="mb-0 fw-bold">Security Info</h5>
                <small className="text-muted">Authentication Status</small>
              </div>
            </div>
            <ul className="list-group list-group-flush bg-transparent">
              <li className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between">
                <span className="text-muted">Auth Protocol:</span>
                <strong>JWT (JSON Web Token)</strong>
              </li>
              <li className="list-group-item bg-transparent text-white border-secondary border-opacity-25 px-0 d-flex justify-content-between">
                <span className="text-muted">Password State:</span>
                <span className="text-success fw-semibold">Encrypted (Bcrypt)</span>
              </li>
              <li className="list-group-item bg-transparent text-white border-0 px-0 d-flex justify-content-between">
                <span className="text-muted">Session Validity:</span>
                <span>30 Days</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Services Banner */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="glass-card p-4 text-center">
            <h5 className="fw-bold mb-2">Need Help or Want to Test Reset Flow?</h5>
            <p className="text-muted small mb-3">
              You can test the password reset flow anytime by submitting your registered email address ({user.email}).
            </p>
            <Link to="/forgot-password" className="btn btn-outline-primary px-4">
              Go to Forgot Password Page <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
