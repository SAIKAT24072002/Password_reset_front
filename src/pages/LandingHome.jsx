import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LandingHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="container py-5 animate-fade-in">
      {/* Logged-in Banner Notice */}
      {user && (
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="alert alert-glass-success d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-person-check-fill fs-4 me-3 text-success"></i>
                <div>
                  <strong>Logged in as {user.name}</strong> ({user.email})
                </div>
              </div>
              <Link to="/home" className="btn btn-sm btn-success px-3">
                Go to Dashboard <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="row justify-content-center text-center py-4">
        <div className="col-12 col-lg-9">
          <div className="icon-badge mx-auto mb-4" style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h1 className="display-4 font-weight-bold mb-3 text-white">
            Secure Authentication & Password Management
          </h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '650px' }}>
            A fast, reliable, and modern platform for user registration, secure login, and instant email password resets.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            {!user ? (
              <>
                <Link to="/register" className="btn btn-gradient btn-lg px-4 py-3">
                  Get Started Free <i className="bi bi-rocket-takeoff-fill ms-2"></i>
                </Link>
                <Link to="/login" className="btn btn-outline-light btn-lg px-4 py-3">
                  Sign In <i className="bi bi-box-arrow-in-right ms-2"></i>
                </Link>
              </>
            ) : (
              <Link to="/home" className="btn btn-gradient btn-lg px-5 py-3">
                My Dashboard <i className="bi bi-speedometer2 ms-2"></i>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="row justify-content-center g-4 mt-2">
        <div className="col-12 col-md-4">
          <div className="glass-card h-100 p-4 text-center">
            <div className="text-primary mb-3">
              <i className="bi bi-person-badge-fill fs-1"></i>
            </div>
            <h4 className="fw-bold mb-2">User Registration</h4>
            <p className="text-muted small mb-0">
              Create an account instantly with secure salted password hashing using bcrypt.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="glass-card h-100 p-4 text-center">
            <div className="text-success mb-3">
              <i className="bi bi-key-fill fs-1"></i>
            </div>
            <h4 className="fw-bold mb-2">Password Reset</h4>
            <p className="text-muted small mb-0">
              Request a secure, single-use 15-minute token link directly to your email.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="glass-card h-100 p-4 text-center">
            <div className="text-info mb-3">
              <i className="bi bi-shield-check fs-1"></i>
            </div>
            <h4 className="fw-bold mb-2">JWT Security</h4>
            <p className="text-muted small mb-0">
              Protected authentication tokens ensure safe sessions for all users.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-lg-10">
          <div className="glass-card p-4 d-md-flex align-items-center justify-content-between text-center text-md-start">
            <div className="mb-3 mb-md-0">
              <h5 className="fw-bold mb-1">Forgot your account password?</h5>
              <p className="text-muted small mb-0">Enter your registered email to receive a password reset link.</p>
            </div>
            <Link to="/forgot-password" className="btn btn-outline-primary px-4 py-2">
              Reset Password Link <i className="bi bi-envelope-check ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingHome;
