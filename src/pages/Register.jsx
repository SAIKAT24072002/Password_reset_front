import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setSuccess('Account created successfully! Redirecting to Home Dashboard...');
      setTimeout(() => {
        navigate('/home');
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-grow-1 py-5">
      <div className="col-12 col-md-8 col-lg-5 animate-fade-in">
        <div className="glass-card">
          <div className="icon-badge">
            <i className="bi bi-person-plus-fill"></i>
          </div>

          <h2 className="text-center mb-2 font-weight-bold">Create Account</h2>
          <p className="text-center text-muted mb-4">
            Join SecurePass to manage your secure authentication
          </p>

          {error && (
            <div className="alert alert-glass d-flex align-items-center mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div className="alert alert-glass-success d-flex align-items-center mb-4" role="alert">
              <i className="bi bi-check-circle-fill me-2 fs-5"></i>
              <div>{success}</div>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="regName"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="regName">Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="regEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="regEmail">Email Address</label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="regPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="regPassword">Password (min 6 chars)</label>
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 text-decoration-none text-muted"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>

            <div className="form-floating mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="regConfirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor="regConfirmPassword">Confirm Password</label>
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  Register Now
                  <i className="bi bi-person-check-fill ms-2 fs-5"></i>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-10">
            <span className="text-muted me-2">Already have an account?</span>
            <Link to="/login" className="text-primary text-decoration-none fw-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
