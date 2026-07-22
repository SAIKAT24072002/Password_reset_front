import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      setSuccess('Logged in successfully! Redirecting...');
      setTimeout(() => {
        // Clear success message or navigate
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
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
            <i className="bi bi-box-arrow-in-right"></i>
          </div>

          <h2 className="text-center mb-2 font-weight-bold">Welcome Back</h2>
          <p className="text-center text-muted mb-4">
            Sign in to access your secure account
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

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="loginEmail">Email Address</label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="loginPassword">Password</label>
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 text-decoration-none text-muted"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>

            <div className="d-flex justify-content-end mb-4">
              <Link to="/forgot-password" className="text-primary text-decoration-none small fw-semibold">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right-short ms-1 fs-4"></i>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-10">
            <span className="text-muted me-2">Don't have an account?</span>
            <Link to="/register" className="text-primary text-decoration-none fw-semibold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
